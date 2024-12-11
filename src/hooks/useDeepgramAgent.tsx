import { useEffect, useRef, useState, useCallback } from "react";
import { convertFloat32ToInt16, downsample } from "../utils/audioUtils";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

const useDeepgramAgent = (
    config: { audio: { output: { sample_rate: number } } },
    token: string
) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const audioPlayerRef = useRef<AudioPlayer | null>(null);

    /**
     * Starts recording audio from the user's microphone.
     */
    const startRecording = useCallback(async () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

        microphoneRef.current.connect(processorRef.current);
        processorRef.current.connect(audioContextRef.current.destination);

        processorRef.current.onaudioprocess = (event) => {
            const inputData = event.inputBuffer.getChannelData(0);
            const downsampledData = downsample(inputData, 48000, 16000);
            const audioDataToSend = convertFloat32ToInt16(downsampledData);

            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(audioDataToSend);
            }
        };
    }, []);

    /**
     * Stops the recording and disconnects the audio processor.
     */
    const stopRecording = useCallback(() => {
        if (processorRef.current) {
            processorRef.current.disconnect();
        }
        if (microphoneRef.current) {
            const mediaStream = microphoneRef.current.mediaStream;
            mediaStream.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
    }, []);

    /**
     * Connects to the Deepgram WebSocket server.
     */
    const connect = useCallback(() => {
        wsRef.current = new WebSocket("wss://agent.deepgram.com/agent", ["token", token]);

        wsRef.current.onopen = () => {
            setIsConnected(true);
            wsRef.current?.send(JSON.stringify(config));
            console.log("Connected to Deepgram WebSocket server");
        };

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                const arrayBuffer = await event.data.arrayBuffer();
                audioPlayerRef.current?.play(arrayBuffer);
            } else {
                console.log(`Received message: ${event.data}`);
            }
        };

        wsRef.current.onclose = () => {
            setIsConnected(false);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Initialize AudioPlayer when connecting
        audioPlayerRef.current = new AudioPlayer(config.audio.output.sample_rate);
    }, [config, token]);

    /**
     * Disconnects from the WebSocket server and stops recording.
     */
    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            console.log("Disconnected from Deepgram WebSocket server");
        }
        stopRecording();

        // Cleanup AudioPlayer when disconnecting
        audioPlayerRef.current?.destroy();
        audioPlayerRef.current = null;
    }, [stopRecording]);

    /**
     * Toggles the recording state between starting and stopping the recording.
     */
    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording((prev) => !prev);
    }, [isRecording, startRecording, stopRecording]);

    /**
     * Cleans up resources when the hook is unmounted.
     */
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    /**
     * Pauses audio playback.
     */
    const pausePlayback = useCallback(() => {
        audioPlayerRef.current?.stop();
    }, []);

    /**
     * Resumes audio playback.
     */
    const resumePlayback = useCallback(() => {
        audioPlayerRef.current?.resume();
    }, []);

    return {
        isRecording,
        isConnected,
        startRecording,
        stopRecording,
        toggleRecording,
        connect,
        disconnect,
        pausePlayback,
        resumePlayback,
    };
};

export default useDeepgramAgent;