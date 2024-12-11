"use client";

import { createAudioBuffer, playAudioBuffer } from "../../utils/audioUtils";

/**
 * AudioPlayer class for managing audio playback.
 */
export default class AudioPlayer {
    private audioContext: AudioContext;
    private startTimeRef: React.MutableRefObject<number>;
    private analyser: AnalyserNode | null;
    private isPlaying: boolean;

    /**
     * Creates an instance of AudioPlayer.
     * @param {number} sampleRate - The sample rate for the audio context.
     */
    constructor(sampleRate: number) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
            latencyHint: "interactive",
            sampleRate: sampleRate,
        });
        this.startTimeRef = { current: -1 };
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.96;
        this.isPlaying = false;
    }

    /**
     * Plays the provided audio data.
     * @param {ArrayBuffer} audioData - The audio data to be played.
     */
    async play(audioData: ArrayBuffer) {
        const audioBuffer = createAudioBuffer(this.audioContext, audioData);
        if (!audioBuffer) {
            console.error("Failed to create audio buffer");
            return;
        }
        this.isPlaying = true;
        playAudioBuffer(this.audioContext, audioBuffer, this.startTimeRef, this.analyser);
    }

    /**
     * Stops the audio playback.
     */
    stop() {
        if (this.audioContext.state === "running") {
            this.audioContext.suspend();
            this.isPlaying = false;
        }
    }

    /**
     * Resumes the audio playback if it was previously suspended.
     */
    resume() {
        if (this.audioContext.state === "suspended") {
            this.audioContext.resume();
            this.isPlaying = true;
        }
    }

    /**
     * Closes the audio context and cleans up resources.
     */
    destroy() {
        this.audioContext.close();
        this.isPlaying = false;
    }

    /**
     * Gets the current playing state of the audio.
     * @returns {boolean} - True if audio is playing, false otherwise.
     */
    get isAudioPlaying() {
        return this.isPlaying;
    }
}
