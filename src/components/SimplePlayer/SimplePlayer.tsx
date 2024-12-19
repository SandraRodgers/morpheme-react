import React, { useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import WaveCanvas from '../WaveCanvas/WaveCanvas';
import MicrophoneButton from '../MicrophoneButton/MicrophoneButton';

interface SimplePlayerProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isConnected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  audioPlayer: React.RefObject<AudioPlayer>;
  isPlaying: boolean;
  barWidth?: number;
  gap?: number;
  micIconColor: string;
  micButtonColor: string;
  waveCanvasColor: string;
  width?: number;
  height?: number;
  scale: number;
}

const SimplePlayer: React.FC<SimplePlayerProps> = ({
  onClick,
  isConnected,
  audioPlayer,
  isPlaying,
  barWidth,
  gap,
  micIconColor,
  micButtonColor,
  waveCanvasColor,
  height = 80, // Default height
  scale,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: `${height}px`, // Set the height dynamically
        width: '100%', // Allow full width
        maxWidth: '800px', // Optional: limit the max width
        backgroundColor: '#1A1A1F',
        borderRadius: '12px',
        border: '1px solid #2C2C33',
      }}
    >
      <div style={{ padding: '16px' }}>
        <MicrophoneButton
          size="lg"
          onClick={onClick}
          isConnected={isConnected}
          style={{ backgroundColor: micButtonColor, color: micIconColor }}
        />
      </div>
      <div style={{ flex: 1, height: '100%', padding: '16px' }}>
        <WaveCanvas
          audioPlayer={audioPlayer}
          isPlaying={isPlaying}
          barWidth={2}
          gap={3}
          color={waveCanvasColor}
          scale={scale}
        />
      </div>
    </div>
  );
};

export default SimplePlayer;
