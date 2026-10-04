// Vintage Analog Vinyl Audio Synthesizer for 30-Second Track Previews
// Completely self-contained via HTML5 Web Audio API - no external broken audio URLs!

class VinylAudioEngine {
  private ctx: AudioContext | null = null;
  private currentTrackId: number | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private elapsedSeconds: number = 0;
  private maxDuration: number = 30;
  private isUnlocked: boolean = false;
  private onTimeUpdate: ((seconds: number, max: number) => void) | null = null;
  private onStateChange: ((isPlaying: boolean, trackNumber: number | null) => void) | null = null;
  private nodes: Array<AudioNode> = [];
  private gainNode: GainNode | null = null;
  private volume: number = 0.7;

  public setUnlocked(unlocked: boolean) {
    this.isUnlocked = unlocked;
  }

  public setMaxDuration(seconds: number) {
    this.maxDuration = seconds;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCallbacks(
    onTimeUpdate: (seconds: number, max: number) => void,
    onStateChange: (isPlaying: boolean, trackNumber: number | null) => void
  ) {
    this.onTimeUpdate = onTimeUpdate;
    this.onStateChange = onStateChange;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx ? this.ctx.currentTime : 0);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public playTrack(trackNumber: number, startOffset: number = 0) {
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    this.currentTrackId = trackNumber;
    this.isPlaying = true;
    this.elapsedSeconds = startOffset;

    // Master volume gain
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    master.connect(this.ctx.destination);
    this.gainNode = master;
    this.nodes.push(master);

    // 1. Vinyl needle crackle & hiss layer
    this.startVinylHiss(master);

    // 2. Vintage psych-rock melodic groove generator specific to track
    this.startPsychGroove(trackNumber, master);

    // Start 30-second countdown timer
    this.onStateChange?.(true, trackNumber);
    this.onTimeUpdate?.(this.elapsedSeconds, this.maxDuration);

    this.timer = window.setInterval(() => {
      this.elapsedSeconds += 1;
      this.onTimeUpdate?.(this.elapsedSeconds, this.maxDuration);

      if (this.elapsedSeconds >= this.maxDuration) {
        this.stop();
      }
    }, 1000);
  }

  public pause() {
    this.stop();
  }

  public toggle(trackNumber: number) {
    if (this.isPlaying && this.currentTrackId === trackNumber) {
      this.stop();
    } else {
      this.playTrack(trackNumber);
    }
  }

  public seek(seconds: number) {
    if (this.currentTrackId !== null) {
      const wasPlaying = this.isPlaying;
      this.playTrack(this.currentTrackId, Math.min(seconds, this.maxDuration - 1));
      if (!wasPlaying) {
        this.pause();
      }
    }
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying = false;
    this.nodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    });
    this.nodes = [];
    this.gainNode = null;
    this.onStateChange?.(false, this.currentTrackId);
  }

  public getCurrentTrack(): number | null {
    return this.currentTrackId;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startVinylHiss(destination: AudioNode) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like 33 RPM dust and surface noise
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1400;
    bandpass.Q.value = 0.8;

    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.12;

    whiteNoise.connect(bandpass);
    bandpass.connect(hissGain);
    hissGain.connect(destination);

    whiteNoise.start();
    this.nodes.push(whiteNoise, bandpass, hissGain);
  }

  private startPsychGroove(trackNumber: number, destination: AudioNode) {
    if (!this.ctx) return;

    // Root frequencies for various psych-rock tracks (E, A, D, G blues pentatonics)
    const baseFreqs = [164.81, 196.0, 220.0, 146.83, 174.61, 246.94, 130.81, 164.81, 220.0, 196.0, 146.83, 174.61, 130.81];
    const root = baseFreqs[(trackNumber - 1) % baseFreqs.length];

    // Bass line pulse (analog sawtooth through warm lowpass)
    const bassOsc = this.ctx.createOscillator();
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(root / 2, this.ctx.currentTime);

    const bassFilter = this.ctx.createBiquadFilter();
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
    bassFilter.Q.setValueAtTime(4, this.ctx.currentTime);

    const bassGain = this.ctx.createGain();
    bassGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(destination);
    bassOsc.start();
    this.nodes.push(bassOsc, bassFilter, bassGain);

    // Fuzz guitar arpeggio / chord harmonics
    const leadOsc = this.ctx.createOscillator();
    leadOsc.type = 'triangle';
    leadOsc.frequency.setValueAtTime(root, this.ctx.currentTime);

    // Vibrato / tremolo LFO for 60s garage psych flavor
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5.5, this.ctx.currentTime); // 5.5 Hz vintage tremolo

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(7, this.ctx.currentTime); // vibrato depth

    lfo.connect(leadOsc.frequency);
    lfo.start();
    this.nodes.push(lfo, lfoGain);

    const leadFilter = this.ctx.createBiquadFilter();
    leadFilter.type = 'bandpass';
    leadFilter.frequency.setValueAtTime(root * 2, this.ctx.currentTime);
    leadFilter.Q.setValueAtTime(2, this.ctx.currentTime);

    const leadGain = this.ctx.createGain();
    leadGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    leadOsc.connect(leadFilter);
    leadFilter.connect(leadGain);
    leadGain.connect(destination);
    leadOsc.start();
    this.nodes.push(leadOsc, leadFilter, leadGain);
  }
}

export const vinylPlayer = new VinylAudioEngine();
