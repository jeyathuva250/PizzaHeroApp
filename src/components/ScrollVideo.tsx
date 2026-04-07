'use client';

import { useEffect, useRef } from 'react';

interface ScrollVideoProps {
  folderName: string;
  frameCount: number;
  className?: string;
  scrollDistance?: number; // How many pixels to complete the video
}

export default function ScrollVideo({ folderName, frameCount, className = "", scrollDistance }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({ lastScroll: -1, animationFrame: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas sizes once
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const images: HTMLImageElement[] = [];
    let firstFrameDrawn = false;

    // Efficient image loading
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/${folderName}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        if (i === 1 && !firstFrameDrawn) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          firstFrameDrawn = true;
        }
        images[i - 1] = img;
      };
    }

    const renderFrame = () => {
      const scrollTop = window.scrollY;
      if (scrollTop !== scrollRef.current.lastScroll) {
        scrollRef.current.lastScroll = scrollTop;

        const maxScroll = scrollDistance || (document.body.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
        const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));

        if (images[frameIndex]) {
          ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
        }
      }
      scrollRef.current.animationFrame = requestAnimationFrame(renderFrame);
    };

    scrollRef.current.animationFrame = requestAnimationFrame(renderFrame);

    const handleResize = () => {
      setCanvasSize();
      scrollRef.current.lastScroll = -1; // Force re-render
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollRef.current.animationFrame !== -1) {
        cancelAnimationFrame(scrollRef.current.animationFrame);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [folderName, frameCount, scrollDistance]);

  return (
    <div className={`fixed top-0 left-0 w-full h-screen z-0 ${className}`}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
