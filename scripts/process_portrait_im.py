import subprocess
import os
import math

print("1. Converting public/assets/portrait-original.png to 1100x1100 PPM...")
cmd = "convert public/assets/portrait-original.png -resize 1100x1100\\! ppm:-"
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
header = proc.stdout.readline().decode().strip()
while True:
    line = proc.stdout.readline().decode()
    if line.startswith('#'): continue
    break
dims = line.strip().split()
w, h = int(dims[0]), int(dims[1])
maxval = int(proc.stdout.readline().decode().strip())
raw = proc.stdout.read()
data = bytearray(raw)

print(f"Loaded image: {w}x{h}, total bytes: {len(data)}")

# Create alpha mask (0 = background to replace, 255 = keep Kamran)
# We will write PGM mask
mask = bytearray(w * h)

cx, cy = w / 2.0, h / 2.0
circle_radius = w * 0.493  # outer circular photo boundary

for y in range(h):
    for x in range(w):
        idx = (y * w + x) * 3
        m_idx = y * w + x
        r = data[idx]
        g = data[idx+1]
        b = data[idx+2]
        brightness = (r + g + b) / 3.0

        dx = x - cx
        dy = y - cy
        dist = math.sqrt(dx*dx + dy*dy)

        # 1. Any pixel outside the circular boundary is background
        if dist > circle_radius:
            mask[m_idx] = 0
            continue

        # 2. Check skin tones (warm: r > b + 20 and r > 110)
        is_skin = (r > b + 18) and (r > 105) and (r > g + 4)
        
        # 3. Check dark areas (hair, suit, beard, eyes)
        is_dark = (brightness < 118)

        # 4. Check collar/shirt
        is_shirt = (y > h * 0.55) and (x > w * 0.30) and (x < w * 0.70)

        # 5. Background detection inside circle:
        # The background in Kamran's photo is a studio beige/gray wall/gradient:
        # brightness > 135, r is close to g and b (or cool gray/beige where not skin)
        # Note: skin has distinct high redness compared to green and blue
        is_neutral_wall = (brightness > 125) and not is_skin and not is_dark and not is_shirt

        # Also corners inside circle that are part of the light background
        if is_neutral_wall:
            mask[m_idx] = 0
        else:
            mask[m_idx] = 255

print("Mask created. Saving mask and compositing with ImageMagick...")

# Save mask to /tmp/mask.pgm
with open('/tmp/mask.pgm', 'wb') as f:
    f.write(f"P5\n{w} {h}\n255\n".encode())
    f.write(mask)

# Blur the mask slightly in ImageMagick for smooth natural edges
subprocess.run("convert /tmp/mask.pgm -blur 0x2 /tmp/mask_smooth.png", shell=True, check=True)

# Generate theme background:
# Obsidian #07070a base with rich emerald #0F5C4A spotlight glow
# exactly matching the section's background and lighting!
subprocess.run("""
convert -size 1100x1100 xc:'#07070a' \
  \( -size 1100x1100 radial-gradient:'#0F5C4A'-'transparent' -geometry +0-150 \) -composite \
  /tmp/theme_bg.png
""", shell=True, check=True)

# Composite: image over theme_bg using mask_smooth
subprocess.run("""
convert /tmp/theme_bg.png \
  \( public/assets/portrait-original.png -resize 1100x1100\! \) \
  /tmp/mask_smooth.png -composite \
  /tmp/theme_composite.png
""", shell=True, check=True)

# Generate all required public assets
print("Generating final web assets...")
subprocess.run("convert /tmp/theme_composite.png -quality 94 public/assets/portrait.jpg", shell=True, check=True)
subprocess.run("convert /tmp/theme_composite.png -quality 92 public/assets/portrait-1100.webp", shell=True, check=True)
subprocess.run("convert /tmp/theme_composite.png -resize 720x720 -quality 92 public/assets/portrait-720.webp", shell=True, check=True)
subprocess.run("convert /tmp/theme_composite.png -resize 420x420 -quality 90 public/assets/portrait-420.webp", shell=True, check=True)
subprocess.run("convert /tmp/theme_composite.png -resize 720x720 -quality 92 public/portrait.webp", shell=True, check=True)

# Also create cutout transparent PNG version
subprocess.run("""
convert \( public/assets/portrait-original.png -resize 1100x1100\! \) \
  /tmp/mask_smooth.png -alpha off -compose CopyOpacity -composite \
  public/assets/portrait-cutout.png
""", shell=True, check=True)

subprocess.run("convert public/assets/portrait-cutout.png -resize 1100x1100 -quality 92 public/assets/portrait-cutout.webp", shell=True, check=True)

print("SUCCESS: All portrait images now match the section colors exactly!")
