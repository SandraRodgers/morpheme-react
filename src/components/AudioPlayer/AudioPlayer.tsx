'use client';

import { createAudioBuffer, playAudioBuffer } from '../../utils/audioUtils';

/**
 * AudioPlayer class for managing audio playback.
 */
export default class AudioPlayer {
  private audioContext: AudioContext;
  private startTimeRef: React.MutableRefObject<number>;
  private analyser: AnalyserNode | null;
  private isPlaying: boolean;
  private waveformData: Uint8Array; // Cache for waveform data
  private frequencyData: Uint8Array; // Cache for frequency data

  constructor(sampleRate: number) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      latencyHint: 'interactive',
      sampleRate: sampleRate,
    });
    this.startTimeRef = { current: -1 };
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.96;
    this.isPlaying = false;

    this.waveformData = new Uint8Array(this.analyser.fftSize);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  /**
   * Plays the provided audio data.
   * @param {ArrayBuffer} audioData - The audio data to be played.
   */
  async play(audioData: ArrayBuffer) {
    const audioBuffer = createAudioBuffer(this.audioContext, audioData);
    if (!audioBuffer) {
      console.error('Failed to create audio buffer');
      return;
    }
    this.isPlaying = true;
    playAudioBuffer(this.audioContext, audioBuffer, this.startTimeRef, this.analyser);
  }

  stop() {
    if (this.audioContext.state === 'running') {
      this.audioContext.suspend();
      this.isPlaying = false;
    }
  }

  resume() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      this.isPlaying = true;
    }
  }

  destroy() {
    this.audioContext.close();
    this.isPlaying = false;
  }

  get isAudioPlaying() {
    return this.isPlaying;
  }

  /**
   * Updates and gets the audio data (frequency, volume, waveform).
   * @returns {{ dataArray: Uint8Array; volume: number; waveformData: Uint8Array }}
   */
  updateAudioData(): { dataArray: Uint8Array; volume: number; waveformData: Uint8Array } {
    if (!this.analyser)
      return { dataArray: new Uint8Array(128), volume: 0, waveformData: new Uint8Array(128) };

    // Update frequency data
    this.analyser.getByteFrequencyData(this.frequencyData);

    // Calculate volume
    const average = this.frequencyData.reduce((a, b) => a + b, 0) / this.frequencyData.length;
    const volume = average / 255;

    // Update waveform data
    this.analyser.getByteTimeDomainData(this.waveformData);

    return { dataArray: this.frequencyData, volume, waveformData: this.waveformData };
  }

  /**
   * Gets the current volume level (0-1).
   * @returns {number} - Current volume level
   */
  getVolumeLevel(): number {
    return this.updateAudioData().volume;
  }

  /**
   * Gets the current waveform data for visualization.
   * @returns {Uint8Array} - Array of waveform data (amplitude values).
   */
  getWaveformData(): Uint8Array {
    return this.updateAudioData().waveformData;
  }

  /**
   * Gets the current frequency data for visualization.
   * @returns {Uint8Array} - Array of frequency data
   */
  getAudioData(): Uint8Array {
    return this.updateAudioData().dataArray;
  }
}
