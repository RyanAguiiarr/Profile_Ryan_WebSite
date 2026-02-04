
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 158;

const ParallaxScrollytelling = ({ children }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload Images
  useEffect(() => {
    let isMounted = true;
    
    const preloadImages = async () => {
      const promises = [];
      const loadedImages = new Array(FRAME_COUNT);

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise((resolve) => {
            const img = new Image();
            img.src = `/sequence/frame_${i}.jpg`;
            img.onload = () => {
                if (isMounted) {
                    setLoadProgress(prev => Math.min(100, Math.round(((i + 1) / FRAME_COUNT) * 100)));
                }
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${i}`);
                resolve(null); 
            };
            loadedImages[i] = img;
        });
        promises.push(promise);
      }

      await Promise.all(promises);

      if (isMounted) {
        setImages(loadedImages);
        setIsLoading(false);
      }
    };

    preloadImages();
    
    // Safety Force Load after 5 seconds
    const safetyTimer = setTimeout(() => {
        if (isMounted && isLoading) {
            console.warn("Parallax images took too long to load. Forcing render.");
            setIsLoading(false);
        }
    }, 5000);

    return () => { 
        isMounted = false; 
        clearTimeout(safetyTimer);
    };
  }, []);


  // Render Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const render = (index) => {
        if (!images[index] || !canvas) return;
        
        const img = images[index];
        if (!img) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Scale: Cover (Math.max) instead of Contain (Math.min)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
    };

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Force re-render of current frame after resize
        if (images.length > 0) {
            const currentProgress = smoothProgress.get();
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(currentProgress * FRAME_COUNT)
            );
            render(frameIndex);
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // 1. Subscribe to scroll changes
    const unsubscribe = smoothProgress.on("change", (latest) => {
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        requestAnimationFrame(() => render(frameIndex));
    });
    
    // 2. Initial Draw Loop (Force draw until it works)
    // Sometimes the first draw fails if images aren't fully 'ready' in the buffer
    const intervalId = setInterval(() => {
        if (images.length > 0 && !isLoading) {
             const currentProgress = smoothProgress.get();
             const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(currentProgress * FRAME_COUNT)
            );
            render(frameIndex);
        }
    }, 100);
    
    // Cleanup after 2 seconds (safe assumption init is done)
    setTimeout(() => clearInterval(intervalId), 2000);

    return () => {
        window.removeEventListener('resize', handleResize);
        unsubscribe();
        clearInterval(intervalId);
    }
  }, [images, isLoading, smoothProgress]);

// Extracted component to ensure hooks are always called if the component is mounted
// However, if the PARENT conditionally renders this, we still have issues if the count changes.
// But here the issue was likely `{!isLoading && <div style={{ opacity: useTransform(...) }} />}`
// `useTransform` creates a new MotionValue hook.

const TextOverlay = ({ smoothProgress, range, title, subtitle, visualNote, alignment = 'center' }) => {
    const [start, end] = range;
    
    const rangeDuration = end - start;
    const fadeDuration = rangeDuration * 0.1;
    
    // Hooks must be called unconditionally
    const opacity = useTransform(smoothProgress, 
        [start, start + fadeDuration, end - fadeDuration, end], 
        [0, 1, 1, 0]
    );
    
    const y = useTransform(smoothProgress,
        [start, start + fadeDuration, end - fadeDuration, end],
        [20, 0, 0, -20]
    );

    const alignClass = {
        'left': 'items-start text-left pl-[10%]',
        'right': 'items-end text-right pr-[10%]',
        'center': 'items-center text-center'
    }[alignment];

    return (
        <motion.div 
            style={{ opacity, y }}
            className={`fixed inset-0 pointer-events-none flex flex-col justify-center ${alignClass} z-20 transition-visibility`}
        >
            <h2 className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/60 mb-4 tracking-tighter">
                {title}
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl">
                {subtitle}
            </p>
            {visualNote && (
                <span className="mt-8 text-sm text-primary/80 uppercase tracking-widest font-mono">
                   [{visualNote}]
                </span>
            )}
        </motion.div>
    );
};


  return (
    <div ref={containerRef} className="relative h-[400vh] bg-transparent">
        {/* FALLBACK IMAGE: Visible if canvas fails to render */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            {images.length > 0 && (
                <img 
                    src={images[0].src} 
                    className="absolute inset-0 w-full h-full object-contain opacity-50 pointer-events-none"
                    alt="Background Fallback" 
                />
            )}
            
            <canvas 
                ref={canvasRef} 
                className="relative z-10 w-full h-full object-cover"
            />
            
            {/* Content Injection (Hero) */}
            <div className="absolute inset-0 z-30 flex flex-col pointer-events-none">
                {/* Enable pointer events for children */}
                <div className="pointer-events-auto w-full h-full">
                    {children}
                </div>
            </div>

            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <span className="text-white/40 font-mono text-xs mb-4">INITIALIZING SEQUENCE... {loadProgress}%</span>
                        
                        <button 
                            onClick={() => setIsLoading(false)}
                            className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded hover:bg-red-500/40 text-xs font-mono transition-colors"
                        >
                            DEBUG: FORCE SKIP LOADING
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Indicator - Always rendered, opacity controlled by prop/logic */}
            <motion.div 
                style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
                <span className="text-white/30 text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>


        </div>
    </div>
  );
};

export default ParallaxScrollytelling;
