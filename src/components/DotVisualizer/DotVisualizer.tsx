import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface DotVisualizerProps {
  audioPlayer: React.MutableRefObject<AudioPlayer | null>;
  isRecording: boolean;
  numDots?: number; // Number of dots
  baseRadius?: number; // Base size of the dots
  growthFactor?: number; // Growth factor for audio levels
  className?: string;
  color?: string;
  showBeforeStart?: boolean;
}

const DotVisualizer: React.FC<DotVisualizerProps> = ({
  audioPlayer,
  isRecording,
  numDots = 20, // Default to 20 dots
  baseRadius = 10, // Default base radius
  growthFactor = 20, // Default growth factor
  className = '',
  color = '#7C3AED',
  showBeforeStart = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Observe parent size changes
  useEffect(() => {
    const parent = parentRef.current;
    const canvas = canvasRef.current;

    if (!parent || !canvas) return;

    const updateCanvasSize = () => {
      // Update canvas dimensions to match the parent
      const { clientWidth, clientHeight } = parent;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    };

    // Initialize canvas size
    updateCanvasSize();

    // Use ResizeObserver for dynamic resizing
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const drawDots = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      const width = canvas.width;
      const height = canvas.height;

      const dotSpacing = width / numDots; // Spacing between dots
      const baseY = height / 2; // Middle of the canvas

      let audioLevels: Uint8Array | null = null;
      if (isRecording && audioPlayer.current) {
        audioLevels = audioPlayer.current.getWaveformData(); // Get waveform data
      } else if (showBeforeStart) {
        audioLevels = new Uint8Array(numDots).fill(128); // Placeholder data
      }

      if (!audioLevels) return; // Exit if no data and `showBeforeStart` is false

      for (let i = 0; i < numDots; i++) {
        // Calculate dot height and size
        const level = audioLevels ? audioLevels[i % audioLevels.length] : 128; // Default to center
        const normalizedLevel = (level - 128) / 128; // Normalize waveform [-1, 1]
        const dotGrowth = Math.abs(normalizedLevel) * growthFactor; // Growth factor

        const x = dotSpacing * i + dotSpacing / 2; // X position
        const radius = baseRadius + dotGrowth; // Adjust radius dynamically

        // Draw the dot
        context.beginPath();
        context.arc(x, baseY, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
      }

      animationFrameRef.current = requestAnimationFrame(drawDots);
    };

    // Start drawing
    drawDots();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, audioPlayer, numDots, baseRadius, growthFactor, color]);

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          display: 'block',
          width: '100%', // Stretch canvas visually to match parent
          height: '100%', // Stretch canvas visually to match parent
        }}
      />
    </div>
  );
};

export default DotVisualizer;
