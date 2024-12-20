# Morpheme React Component Library

**Morpheme React** is a specialized component library for building voice agent applications using Deepgram's Voice API. It provides a suite of React components and hooks designed specifically for voice interaction interfaces.

## Features

- **Voice Agent Integration**: Seamless integration with Deepgram's Voice API
- **Audio Visualization**: Multiple components for visualizing audio input/output
- **TypeScript Support**: Fully typed for improved development experience
- **Customizable Styling**: CSS-based styling with easy overrides
- **Accessible Components**: Built with accessibility in mind

## Installation

The library is still under development and not yet published on npm. Stay tuned for updates!

## Quick Start

1. First, initialize the useDeepgramAgent hook with your configuration:

```tsx
import { useDeepgramAgent } from '@morpheme/react';

const config = {
  audio: {
    // Optional
    input: {
      encoding: 'linear16', // Defaults to 'linear16'
      sample_rate: 24000, // Defaults to 24k
    },
    output: {
      // Optional
      encoding: 'mp3',
      sample_rate: 24000, // Defaults to 24k
      bitrate: 128000,
      container: 'mp3',
    },
  },
  agent: {
    listen: {
      model: 'nova-2', // Optional, defaults to 'nova-2'
    },
    think: {
      provider: {
        type: 'open_ai', // LLM provider type
      },
      model: 'gpt-4', // LLM model to use
      instructions: 'You are a helpful voice assistant...', // LLM System prompt
      functions: [
        // Optional: Function calling configuration
        {
          name: 'check_weather',
          description: 'Get the current weather for a location',
          url: 'https://api.example.com/weather',
          headers: [
            // Optional: HTTP headers
            {
              key: 'authorization',
              value: 'Bearer token123',
            },
          ],
          method: 'post',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: "The city and state, e.g., 'San Francisco, CA'",
              },
            },
            required: ['location'],
          },
        },
      ],
    },
    // Add other Deepgram configuration options as needed
  },
};

function MyVoiceApp() {
  const { isRecording, isConnected, toggleRecording, connect, disconnect, audioPlayer, messages } =
    useDeepgramAgent(config, 'YOUR_DEEPGRAM_TOKEN');

  // Your app logic here
}
```

## Components

### Audio Input Controls

#### MicrophoneButton

A circular button specifically designed for voice input control:

```tsx
<MicrophoneButton
  onClick={toggleRecording}
  isConnected={isConnected}
  size="lg" // 'sm' | 'md' | 'lg' | 'xl'
/>
```

#### Button

A general-purpose button with voice interaction styling:

```tsx
<Button
  onClick={handleClick}
  isConnected={isConnected}
  size="md" // 'sm' | 'md' | 'lg'
>
  Start Recording
</Button>
```

### Audio Visualizers

#### DotVisualizer

Displays audio levels as animated dots:

```tsx
<DotVisualizer audioPlayer={audioPlayer} isRecording={isRecording} numDots={20} color="#7C3AED" />
```

#### WaveCanvas

Shows audio as a traditional waveform:

```tsx
<WaveCanvas
  audioPlayer={audioPlayer}
  isPlaying={isRecording}
  barWidth={4}
  gap={2}
  color="#13EF93"
/>
```

### Conversation Interface

#### Conversation

Displays the transcribed conversation between user and agent:

```tsx
<Conversation messages={messages} showCloseButton={true} onClose={handleClose} />
```

### Complete Players

#### SimplePlayer

A pre-built component combining a microphone button and wave visualization:

```tsx
<SimplePlayer
  onClick={toggleRecording}
  isConnected={isConnected}
  audioPlayer={audioPlayer}
  isPlaying={isRecording}
  micIconColor="#000000"
  micButtonColor="#13EF93"
  waveCanvasColor="#13EF93"
  scale={1}
/>
```

## Styling

Components can be styled using:

- className prop for custom CSS classes
- style prop for inline styles
- CSS custom properties (coming soon)

## Development

### Prerequisites

- Node.js 18+
- npm or Yarn

### Setup

```bash
git clone https://github.com/<your-username>/morpheme-react.git
cd morpheme-react
npm install
```

### Running the Development Environment

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
```

## License

MIT

---

For more detailed documentation and examples, please visit our [documentation site](https://docs.morpheme.dev) (coming soon).
