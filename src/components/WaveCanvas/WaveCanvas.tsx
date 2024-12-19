import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface WaveCanvasProps {
  audioPlayer: React.MutableRefObject<AudioPlayer | null>;
  isPlaying: boolean;
  barWidth?: number; // Width of each bar
  gap?: number; // Gap between bars
  color?: string; // Bar color
  scale?: number; // Add new scale prop
  showBeforeStart?: boolean;
}

const WaveCanvas: React.FC<WaveCanvasProps> = ({
  audioPlayer,
  isPlaying,
  barWidth = 4,
  gap = 2,
  color = '#13EF93',
  scale = 1,
  showBeforeStart = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  // Observe parent size changes
  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const updateCanvasSize = () => {
      setCalculatedWidth(parent.offsetWidth);
      setCalculatedHeight(parent.offsetHeight);
    };

    // Initialize canvas size
    updateCanvasSize();

    // Use ResizeObserver for dynamic resizing
    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawWaveform = () => {
      const numBars = Math.floor(calculatedWidth / (barWidth + gap));

      const waveformData =
        isPlaying || showBeforeStart
          ? audioPlayer.current?.getWaveformData() || new Uint8Array(numBars).fill(128)
          : null;

      if (!waveformData) {
        // Clear canvas if no data and `showBeforeStart` is false
        context.clearRect(0, 0, calculatedWidth, calculatedHeight);
        return;
      }

      const sliceSize = Math.floor(waveformData.length / numBars);
      context.clearRect(0, 0, calculatedWidth, calculatedHeight);

      // Draw the bars
      for (let i = 0; i < numBars; i++) {
        let sum = 0;
        for (let j = 0; j < sliceSize; j++) {
          const dataIndex = i * sliceSize + j;
          if (dataIndex < waveformData.length) {
            sum += Math.abs(waveformData[dataIndex] - 128) * 2;
          }
        }

        // Calculate bar properties
        const amplitude = sum / sliceSize / 255; // Normalize to [0, 1]
        const barHeight = amplitude * calculatedHeight * scale || calculatedHeight * 0.1; // Default bar height if no data

        const x = i * (barWidth + gap);
        const y = (calculatedHeight - barHeight) / 2;

        // Draw the bar
        context.fillStyle = color;
        context.fillRect(x, y, barWidth, barHeight);
      }

      // Schedule next frame
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };

    // Start drawing
    drawWaveform();

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, audioPlayer, barWidth, gap, calculatedHeight, calculatedWidth, color, scale]);

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        width={calculatedWidth}
        height={calculatedHeight}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default WaveCanvas;
