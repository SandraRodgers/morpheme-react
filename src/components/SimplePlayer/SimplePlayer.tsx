import React, { useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import WaveCanvas from '../WaveCanvas/WaveCanvas';
import MicrophoneButton from '../MicrophoneButton/MicrophoneButton';
import './SimplePlayerStyles.css';

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
  scale,
}) => {
  return (
    <div className="simple-player-container">
      <div className="simple-player-button-container">
        <MicrophoneButton
          size="lg"
          onClick={onClick}
          isConnected={isConnected}
          style={{ backgroundColor: micButtonColor, color: micIconColor }}
        />
      </div>
      <div className="simple-player-wave-container">
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
