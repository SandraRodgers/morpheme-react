import React, { useEffect, useRef } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface WaveformVisualizerProps {
  audioPlayer: React.MutableRefObject<AudioPlayer | null>;
  isRecording: boolean;
  className?: string;
  color?: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  audioPlayer,
  isRecording,
  className = '',
  color,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRecording || !audioPlayer.current) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawWaveform = () => {
      // Get waveform data
      const waveformData = audioPlayer.current?.getWaveformData();
      if (!waveformData) return;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set up drawing parameters
      const width = canvas.width;
      const height = canvas.height;
      const sliceWidth = width / waveformData.length;

      // Draw the waveform
      context.lineWidth = 2;
      context.strokeStyle = color || '#000000';
      context.beginPath();

      let x = 0;
      for (let i = 0; i < waveformData.length; i++) {
        const v = waveformData[i] / 128.0; // Normalize data to range [0, 2]
        const y = (v * height) / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

      context.lineTo(width, height / 2);
      context.stroke();

      // Schedule the next frame
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };

    // Start drawing
    drawWaveform();

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, audioPlayer]);

  return (
    <div style={{ position: 'relative', width: 600, height: 200 }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <hr
        style={{
          width: 600,
          height: 200,
          borderTop: `1px solid ${color || '#000000'}`,
          position: 'absolute',
          top: 100,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default WaveformVisualizer;
