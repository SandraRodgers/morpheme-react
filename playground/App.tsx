import React from 'react';
import Button from '../src/components/Button/Button';
import MicrophoneButton from '../src/components/MicrophoneButton/MicrophoneButton';
import useDeepgramAgent from '../src/hooks/useDeepgramAgent';
import DotVisualizer from '../src/components/DotVisualizer/DotVisualizer';
import AudioPlayer from '../src/components/AudioPlayer/AudioPlayer';
import WaveCanvas from '../src/components/WaveCanvas/WaveCanvas';
import SimplePlayer from '../src/components/SimplePlayer/SimplePlayer';
import './index.css';

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
  const { isRecording, isConnected, toggleRecording, connect, disconnect, audioPlayer } =
    useDeepgramAgent(config, token);

  const [isPrimaryConnected, setIsPrimaryConnected] = React.useState(false);
  const [isMicrophoneConnected, setIsMicrophoneConnected] = React.useState(false);
  const [isSimplePlayerConnected, setIsSimplePlayerConnected] = React.useState(false);
  const microphoneAudioPlayerRef = React.useRef<AudioPlayer | null>(null);
  const primaryAudioPlayerRef = React.useRef<AudioPlayer | null>(null);
  const simplePlayerAudioPlayerRef = React.useRef<AudioPlayer | null>(null);
  const handlePrimaryButtonClick = async () => {
    if (isPrimaryConnected) {
      if (isRecording) {
        toggleRecording();
      }
      disconnect();
      setIsPrimaryConnected(false);
      primaryAudioPlayerRef.current = null;
    } else {
      await connect();
      toggleRecording();
      setIsPrimaryConnected(true);
      primaryAudioPlayerRef.current = audioPlayer.current;
    }
  };

  const handleMicrophoneButtonClick = async () => {
    console.log('isMicrophoneConnected', isMicrophoneConnected);
    if (isMicrophoneConnected) {
      if (isRecording) {
        toggleRecording();
      }
      disconnect();
      setIsMicrophoneConnected(false);
      microphoneAudioPlayerRef.current = null;
    } else {
      await connect();
      toggleRecording();
      setIsMicrophoneConnected(true);
      microphoneAudioPlayerRef.current = audioPlayer.current;
    }
  };

  const handleSimplePlayerClick = async () => {
    if (isSimplePlayerConnected) {
      toggleRecording();
      if (isRecording) {
        toggleRecording();
      }
      disconnect();
      setIsSimplePlayerConnected(false);
      simplePlayerAudioPlayerRef.current = null;
    } else {
      await connect();
      toggleRecording();
      setIsSimplePlayerConnected(true);
      simplePlayerAudioPlayerRef.current = audioPlayer.current;
    }
  };

  return (
    <div>
      <h2>Buttons</h2>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '150px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button size="lg" onClick={handlePrimaryButtonClick} isConnected={isPrimaryConnected}>
            {isPrimaryConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
        <div
          style={{
            width: '150px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MicrophoneButton
            size="xl"
            onClick={handleMicrophoneButtonClick}
            isConnected={isMicrophoneConnected}
          />
        </div>
      </div>
      <h2>Audio Visualizers</h2>
      <div
        style={{
          width: '50vw',
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WaveCanvas
          audioPlayer={primaryAudioPlayerRef}
          isPlaying={isPrimaryConnected}
          barWidth={2}
          gap={3}
          color={'#ee028c'}
          scale={3}
          showBeforeStart={true}
        />
      </div>
      <div
        style={{
          width: '50vw',
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DotVisualizer
          audioPlayer={microphoneAudioPlayerRef}
          isRecording={isMicrophoneConnected}
          numDots={30} // Increase the number of dots
          baseRadius={3} // Set the base dot size
          growthFactor={35} // Set how much the dots grow with audio
          color="#7C3AED" // Custom color
          showBeforeStart={true}
        />
      </div>

      <h2>Audio Players</h2>
      <div style={{ width: '30vw', height: '150px' }}>
        <SimplePlayer
          onClick={handleSimplePlayerClick}
          isConnected={isSimplePlayerConnected}
          audioPlayer={simplePlayerAudioPlayerRef}
          isPlaying={isSimplePlayerConnected}
          micIconColor="#0b0b0c"
          micButtonColor="white"
          waveCanvasColor="white"
          scale={2.5}
        />
      </div>
    </div>
  );
};

export default App;
