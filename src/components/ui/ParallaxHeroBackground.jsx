import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const frameCount = 196;

const ParallaxHeroBackground = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Smooth out the scroll value for smoother frame transitions
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
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
            loadedImages[i - 1] = img;
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages.filter(img => img !== null));
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Render loop
  useEffect(() => {
    if (!imagesLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = () => {
      if (!canvas || !canvasRef.current) return;
      
      const ctx = canvas.getContext('2d');
      if(!ctx) return;

      // Map scrollY to frame index
      const scrollMax = 1600; 
      const currentScroll = smoothScroll.get();
      
      let frameIndex = Math.floor((currentScroll / scrollMax) * (images.length - 1));
      
      // Clamp frame index
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= images.length) frameIndex = images.length - 1;

      const img = images[frameIndex];
      if (!img) return;

      // Draw 'cover' style
      // Note: canvas.width/height are now scaled by dpr, so we use those
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate scale to cover
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth / 2) - (img.width / 2) * scale;
      const y = (canvasHeight / 2) - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Subscribe to spring changes
    const unsubscribe = smoothScroll.on("change", render);
    
    // Resize handler
    const handleResize = () => {
       if(canvasRef.current) {
           const dpr = window.devicePixelRatio || 1;
           // Set internal resolution to match display size * pixel ratio for sharpness
           canvasRef.current.width = window.innerWidth * dpr;
           canvasRef.current.height = window.innerHeight * dpr;
           
           // Keep CSS size to window size
           // We don't strictly need to set style.width/height if using w-full h-full CSS classes,
           // but changing internal width/height clears context, so we must re-render.
           render();
       }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => {
        unsubscribe();
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
