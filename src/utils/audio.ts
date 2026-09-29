/**
 * Procedural Web Audio synthesizer for tactile architectural ambience.
 * 100% self-contained, zero external audio asset loading.
 */

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      // Master filter (warm low-pass)
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2, this.ctx.currentTime);
      this.filter.connect(this.ctx.destination);

      // Ambient corridor drone
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.droneGain.connect(this.filter);

      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      this.droneOsc.connect(this.droneGain);
      this.droneOsc.start();
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx) {
      if (!muted) this.init();
      else return;
    }
    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    if (this.droneGain && this.ctx) {
      const targetGain = muted ? 0 : 0.04;
      this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Modulate drone frequency slightly based on scroll progress through corridor
   */
  public updateProgress(progress: number) {
    if (!this.ctx || this.isMuted || !this.droneOsc || !this.filter) return;
    const baseFreq = 55 + progress * 25; // 55Hz -> 80Hz
    this.droneOsc.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.2);
    const filterFreq = 220 + progress * 180;
    this.filter.frequency.setTargetAtTime(filterFreq, this.ctx.currentTime, 0.2);
  }

  /**
   * Play subtle spatial portal threshold crossing chime
   */
  public playThresholdChime(frequencyMultiplier = 1) {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const baseFreq = 220 * frequencyMultiplier;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio error ignored
    }
  }
}

export const audioEngine = new SpatialAudioEngine();
