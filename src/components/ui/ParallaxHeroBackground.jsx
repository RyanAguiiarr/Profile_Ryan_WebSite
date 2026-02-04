import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const frameCount = 196;

// Global cache to persist images across remounts
const cachedImages = [];
let globalImagesLoaded = false;

const ParallaxHeroBackground = () => {
  const canvasRef = useRef(null);
  // We can initialize with cachedImages if they exist
  const [images, setImages] = useState(cachedImages);
  const [imagesLoaded, setImagesLoaded] = useState(globalImagesLoaded);
  const { scrollY } = useScroll();
  
  // Smooth out the scroll value for smoother frame transitions
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Preload images
  useEffect(() => {
    // If we already have images globally, just ensure state is set and return
    if (globalImagesLoaded && cachedImages.length > 0) {
        setImages(cachedImages);
        setImagesLoaded(true);
        return;
    }

    const loadImages = async () => {
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        // Use standard Vite asset URL resolution
        const src = new URL(`../../assets/paralax/paralaxNovo/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`, import.meta.url).href;
        
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (e) => {
                console.error(`Failed to load image ${i}`, e);
                // Resolve with null to not break the chain, but handle it later
                resolve(null); 
            };
            // Store directly in global cache index
            cachedImages[i - 1] = img;
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      
      // cleanup nulls in global cache if any failed
      // Note: This mutation of global array is safe here as it's just filling empty slots
      const validImages = cachedImages.filter(img => img !== null);
      
      // Update local state
      setImages(validImages);
      setImagesLoaded(true);
      
      // Mark global flag
      globalImagesLoaded = true;
    };

    loadImages();
  }, []);

  // Render loop
  useEffect(() => {
    if (!imagesLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    let animationFrameId;

    const render = () => {
      // Robustness: ensure we request next frame even if canvas is missing temporarily
      // though 'canvas' var allows us to trust it exists if it existed at start.
      if (!canvas) {
          // Should not happen if effect started, but safety first
          animationFrameId = requestAnimationFrame(render);
          return;
      }
      
      const ctx = canvas.getContext('2d');
      if(!ctx) {
           animationFrameId = requestAnimationFrame(render);
           return;
      }

      // Check dimensions
      if (canvas.width === 0 || canvas.height === 0) {
           // Wait for resize
           animationFrameId = requestAnimationFrame(render);
           return;
      }

      const currentScroll = smoothScroll.get();
      
      // Map scrollY to frame index
      const scrollMax = 1600; 
      
      let frameIndex = Math.floor((currentScroll / scrollMax) * (images.length - 1));
      
      // Clamp frame index
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= images.length) frameIndex = images.length - 1;

      const img = images[frameIndex];
      if (!img) {
          // Keep trying
          animationFrameId = requestAnimationFrame(render);
          return;
      }

      // Draw 'cover' style
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth / 2) - (img.width / 2) * scale;
      const y = (canvasHeight / 2) - (img.height / 2) * scale;
      
      try {
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } catch (e) {
        console.error("Parallax draw error:", e);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    // Start loop
    console.log("Starting Parallax Loop. Images:", images.length);
    render();
    
    // Resize handler
    const handleResize = () => {
       if(canvasRef.current) {
           const dpr = window.devicePixelRatio || 1;
           canvasRef.current.width = window.innerWidth * dpr;
           canvasRef.current.height = window.innerHeight * dpr;
       }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, images, smoothScroll]);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }} 
    />
  );
};

export default ParallaxHeroBackground;
