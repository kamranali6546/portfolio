import os
from PIL import Image, ImageFilter
import numpy as np

def process_portrait(input_path, output_dir):
    print(f"Processing {input_path}...")
    orig = Image.open(input_path).convert('RGB')
    arr = np.array(orig)
    h, w, _ = arr.shape

    yy, xx = np.mgrid[:h, :w]
    # Circle center and radius
    cx, cy = 627.0, 627.0
    dist = np.sqrt((xx - cx)**2 + (yy - cy)**2)
    
    # Colors
    r = arr[:,:,0].astype(float)
    g = arr[:,:,1].astype(float)
    b = arr[:,:,2].astype(float)
    brightness = (r + g + b) / 3.0

    # Human skin vs background identification
    # Skin has warm tint: r > b + 25 and r > 115
    is_skin = (r - b > 25) & (r > 115) & (r - g > 8)
    # Dark hair/suit/beard
    is_dark = (brightness < 120)
    # White shirt in chest/collar
    is_torso_shirt = (yy > 700) & (xx > 380) & (xx < 870)

    # Background pixels:
    # 1. Any pixel outside circle (dist > 619)
    # 2. Inside circle: light blue/gray background where brightness > 155, cool tint (b >= r - 15), not skin, not dark, not shirt
    is_bg = (dist > 619) | ((brightness > 155) & (b >= r - 15) & ~is_skin & ~is_dark & ~is_torso_shirt)

    # Foreground mask: 1.0 for Kamran, 0.0 for background
    is_fg = ~is_bg
    
    # Smooth the mask for a soft, natural edge
    fg_mask_img = Image.fromarray((is_fg.astype(np.uint8) * 255)).filter(ImageFilter.GaussianBlur(radius=2.5))
    alpha = np.array(fg_mask_img).astype(float) / 255.0

    # 1. Dark Cinematic Theme Background:
    # Obsidian #07070a canvas with atmospheric emerald #0F5C4A lighting behind head
    bg_arr = np.zeros((h, w, 3), dtype=float)
    head_dist = np.sqrt((xx - 627.0)**2 + (yy - 400.0)**2)
    glow = np.clip(1.0 - (head_dist / 650.0), 0.0, 1.0)**1.8

    # Base obsidian (#07070a -> 7, 7, 10), subtle emerald (#0F5C4A -> 15, 92, 74)
    bg_arr[:,:,0] = 7.0 + glow * (15.0 - 7.0) * 0.9
    bg_arr[:,:,1] = 7.0 + glow * (85.0 - 7.0) * 0.9
    bg_arr[:,:,2] = 10.0 + glow * (70.0 - 10.0) * 0.9

    # Edge decontamination for hair: slightly dim bright fringing on edge pixels
    decontam_arr = arr.copy().astype(float)
    edge_zone = (alpha > 0.05) & (alpha < 0.95)
    # If edge zone pixel is bright, pull it towards dark foreground tone
    bright_edges = edge_zone & (brightness > 130)
    decontam_arr[bright_edges] *= 0.65

    # Composite with theme background
    comp = np.zeros_like(arr)
    for c in range(3):
        comp[:,:,c] = np.clip(decontam_arr[:,:,c] * alpha + bg_arr[:,:,c] * (1.0 - alpha), 0, 255).astype(np.uint8)

    # Also build transparent RGBA version
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:,:,:3] = np.clip(decontam_arr, 0, 255).astype(np.uint8)
    rgba[:,:,3] = (alpha * 255).astype(np.uint8)

    theme_img = Image.fromarray(comp)
    rgba_img = Image.fromarray(rgba)

    os.makedirs(output_dir, exist_ok=True)
    
    # Save theme-matched JPG and WebP images at full and responsive sizes
    theme_img.save(os.path.join(output_dir, 'portrait.jpg'), quality=94)
    theme_img.save(os.path.join(output_dir, 'portrait-original.png'))
    
    # Generate responsive WebP versions
    for size, name in [(1100, 'portrait-1100.webp'), (720, 'portrait-720.webp'), (420, 'portrait-420.webp')]:
        resized = theme_img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, name), quality=92)
    
    # Save public/portrait.webp as well
    theme_img.resize((720, 720), Image.Resampling.LANCZOS).save('public/portrait.webp', quality=92)
    
    # Also save transparent cutout for optional use
    rgba_img.save(os.path.join(output_dir, 'portrait-cutout.png'))
    rgba_img.resize((1100, 1100), Image.Resampling.LANCZOS).save(os.path.join(output_dir, 'portrait-cutout.webp'), quality=92)

    print("Successfully generated all theme portrait assets!")

if __name__ == '__main__':
    process_portrait('public/assets/portrait-original.png', 'public/assets')
