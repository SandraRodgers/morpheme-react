import React from 'react';
import Button from '../src/components/Button/Button';
import MicrophoneButton from '../src/components/MicrophoneButton/MicrophoneButton';
import useDeepgramAgent from '../src/hooks/useDeepgramAgent';
import './index.css';
import { useTheme } from '../src/context/ThemeContext';

const token = import.meta.env.VITE_DEEPGRAM_TOKEN;
const config = {
  type: 'SettingsConfiguration',
  audio: {
    input: {
      encoding: 'linear16',
      sample_rate: 16000,
    },
    output: {
      encoding: 'linear16',
      sample_rate: 24000,
      container: 'none',
    },
  },
  agent: {
    listen: {
      model: 'nova-2',
    },
    speak: {
      model: 'aura-asteria-en',
    },
    think: {
      model: 'gpt-4o-mini',
      provider: {
        type: 'open_ai',
      },
      instructions:
        "You are a helpful voice assistant created by Deepgram. Your responses should be friendly, human-like, and conversational. Always keep your answers concise, limited to 1-2 sentences and no more than 120 characters.\n\nWhen responding to a user's message, follow these guidelines:\n- If the user's message is empty, respond with an empty message.\n- Ask follow-up questions to engage the user, but only one question at a time.\n- Keep your responses unique and avoid repetition.\n- If a question is unclear or ambiguous, ask for clarification before answering.\n- If asked about your well-being, provide a brief response about how you're feeling.\n\nRemember that you have a voice interface. You can listen and speak, and all your responses will be spoken aloud.",
    },
  },
  context: {
    messages: [
      {
        content: 'Hello, how can I help you today?',
        role: 'assistant',
      },
    ],
    replay: true,
  },
};

const App: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    isRecording,
    isConnected,
    toggleRecording,
    connect,
    disconnect,
    pausePlayback,
    resumePlayback,
  } = useDeepgramAgent(config, token);

  const [isPrimaryConnected, setIsPrimaryConnected] = React.useState(false);
  const [isMicrophoneConnected, setIsMicrophoneConnected] = React.useState(false);

  const handlePrimaryButtonClick = async () => {
    if (isPrimaryConnected) {
      if (isRecording) {
        toggleRecording();
      }
      disconnect();
      setIsPrimaryConnected(false);
    } else {
      await connect();
      toggleRecording();
      setIsPrimaryConnected(true);
    }
  };

  const handleMicrophoneButtonClick = async () => {
    if (isMicrophoneConnected) {
      if (isRecording) {
        toggleRecording();
      }
      disconnect();
      setIsMicrophoneConnected(false);
    } else {
      await connect();
      toggleRecording();
      setIsMicrophoneConnected(true);
    }
  };

  return (
    <div>
      <div className="p-4">
        <Button
          variant="primary"
          onClick={handlePrimaryButtonClick}
          isConnected={isPrimaryConnected}
        >
          {isPrimaryConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
      <div className="p-4">
        <MicrophoneButton
          variant="primary"
          size="lg"
          onClick={handleMicrophoneButtonClick}
          isConnected={isMicrophoneConnected}
        />
      </div>
    </div>
  );
};

export default App;
