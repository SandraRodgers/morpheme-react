import React from "react";
import  Button from "../src/components/Button/Button";
import useDeepgramAgent from "../src/hooks/useDeepgramAgent";

const token = "";
const config = {
    type: "SettingsConfiguration",
    audio: {
        input: {
            encoding: "linear16",
            sample_rate: 16000
        },
        output: {
            encoding: "linear16",
            sample_rate: 24000,
            container: "none",
        }
    },
    agent: {
        listen: {
            model: "nova-2"
        },
        think: {
            provider: {
                type: "open_ai"
            },
            model: "gpt-3.5-turbo",
            instructions: "You are a helpful assistant."
        },
        speak: {
            model: "aura-asteria-en"
        }
    }
};

const App: React.FC = () => {
  const {
    isRecording,
    isConnected,
    toggleRecording,
    connect,
    disconnect,
    pausePlayback,
    resumePlayback,
} = useDeepgramAgent(config, token);

return (
    <div>
        <Button className="bg-red-500" onClick={connect}>
            Connect
        </Button>
        <Button className="bg-orange-500" onClick={disconnect} disabled={!isConnected}>
            Disconnect
        </Button>
        <Button className="bg-yellow-500" onClick={toggleRecording} disabled={!isConnected}>
            {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button className="bg-green-500" onClick={pausePlayback} disabled={!isConnected}>
            Pause Playback
        </Button>
        <Button className="bg-blue-500" onClick={resumePlayback} disabled={!isConnected}>
            Resume Playback
        </Button>
    </div>
);
};

export default App;
