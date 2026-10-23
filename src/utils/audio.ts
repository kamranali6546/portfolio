/**
 * Web Audio API synthesizer for the iconic cinematic trailer "Ta-dum" / cinema chord.
 * Pure synthetic Web Audio — no external audio files or network latency required.
 */

let audioCtx: AudioContext | null = null;

export function playCinematicChord(volume = 0.3) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master gain
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
    masterGain.connect(audioCtx.destination);

    // Deep sub-bass thud (55 Hz -> 40 Hz)
    const subOsc = audioCtx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(42, now + 1.2);
    const subGain = audioCtx.createGain();
    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 2.2);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc.stop(now + 2.5);

    // Cinema strike mid tone (130 Hz & 165 Hz)
    const midOsc = audioCtx.createOscillator();
    midOsc.type = 'triangle';
    midOsc.frequency.setValueAtTime(130, now);
    midOsc.frequency.exponentialRampToValueAtTime(110, now + 0.8);
    const midGain = audioCtx.createGain();
    midGain.gain.setValueAtTime(0.6, now);
    midGain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
    midOsc.connect(midGain);
    midGain.connect(masterGain);
    midOsc.start(now);
    midOsc.stop(now + 2.0);

    // Resonant chime harmonic (260 Hz)
    const chimeOsc = audioCtx.createOscillator();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(260, now);
    const chimeGain = audioCtx.createGain();
    chimeGain.gain.setValueAtTime(0.3, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(masterGain);
    chimeOsc.start(now);
    chimeOsc.stop(now + 2.5);
  } catch (err) {
    console.debug('Web audio unavailable:', err);
  }
}
