import React from 'react';
import { useTheme } from '../src/context/ThemeContext';
import Button from '../src/components/Button/Button';
import useDeepgramAgent from '../src/hooks/useDeepgramAgent';
import './index.css';

const token = '';
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
    think: {
      provider: {
        type: 'open_ai',
      },
      model: 'gpt-3.5-turbo',
      instructions: 'You are a helpful assistant.',
    },
    speak: {
      model: 'aura-asteria-en',
    },
  },
};

const App: React.FC = () => {
  const { setTheme } = useTheme();
  const {
    isRecording,
    isConnected,
    toggleRecording,
    connect,
    disconnect,
    pausePlayback,
    resumePlayback,
  } = useDeepgramAgent(config, token);

  const handleConnect = async () => {
    await connect();
    toggleRecording();
  };

  const handleDisconnect = async () => {
    if (isRecording) {
      toggleRecording();
    }
    disconnect();
  };

  React.useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={handleConnect} disabled={isConnected}>
        Connect
      </Button>
      <Button variant="secondary" onClick={handleDisconnect} disabled={!isConnected}>
        Disconnect
      </Button>
    </div>
  );
};

export default App;
