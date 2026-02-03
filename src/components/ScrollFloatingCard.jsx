import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ProfileCard from "./ProfileCard";


// Greeting Badge Component
const GreetingBadge = () => {
    const [isWave, setIsWave] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsWave((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-black/50">
           <motion.div
             key={isWave ? "wave" : "text"}
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0, opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="text-2xl font-bold text-black"
           >
               {isWave ? "👋" : "Olá"}
           </motion.div>
        </div>
    );
};

const ScrollFloatingCard = () => {
  const [positions, setPositions] = useState({
    start: { x: 0, y: 0, width: 350, height: 500 }, // Updated default size
    end: { x: 0, y: 0, width: 300, height: 400 },
    ready: false,
  });

  const { scrollY } = useScroll();

  useEffect(() => {
    const updatePositions = () => {
      const startEl = document.getElementById("hero-card-pos");
      const endEl = document.getElementById("about-card-pos");

      if (startEl && endEl) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const docScroll = window.scrollY;

        setPositions({
          start: {
            x: startRect.left,
            y: startRect.top + docScroll, // Absolute Y
            width: startRect.width,
            height: startRect.height,
          },
          end: {
            x: endRect.left,
            y: endRect.top + docScroll, // Absolute Y
            width: endRect.width,
            height: endRect.height,
          },
          ready: true,
        });
      }
    };

    // Initial check
    updatePositions();
    
    // Check again after a delay to ensure layout stability (Updated for spacing adjustments)
    setTimeout(updatePositions, 500);

    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // Calculate scroll range
  const startScroll = 0;
  
  // Transition ends when scrollY reaches (endAbsY - windowHeight/2).
  const endScroll = positions.end.y - window.innerHeight / 2;

  const scrollRange = [startScroll, endScroll > startScroll ? endScroll : 1000];

  const rawProgress = useTransform(scrollY, scrollRange, [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 100, damping: 20 });

  // Interpolate Position
  const absoluteY = useTransform(progress, [0, 1], [positions.start.y, positions.end.y]);
  const currentFixedY = useTransform([absoluteY, scrollY], ([absY, currScroll]) => absY - currScroll);

  const currentFixedX = useTransform(progress, [0, 1], [positions.start.x, positions.end.x]);
  const currentWidth = useTransform(progress, [0, 1], [positions.start.width, positions.end.width]);
  const currentHeight = useTransform(progress, [0, 1], [positions.start.height, positions.end.height]);
  
  // 3D Rotation
  const rotateY = useTransform(progress, [0, 1], [0, 360]);

  // Tilt & Floating Opacity
  // We fade out the floating/tilt effect as it moves to position B
  const tilt = useTransform(progress, [0, 0.2], [6, 0]); 
  const floatingOpacity = useTransform(progress, [0, 0.1], [1, 0]); // Stop floating animation visually when scrolling starts

  if (!positions.ready) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: currentFixedY,
        left: currentFixedX,
        width: currentWidth,
        height: currentHeight,
        rotateY: rotateY,
        zIndex: 50,
        perspective: 1000,
      }}
      className="pointer-events-none hidden lg:block"
    >
        {/* Inner container for Floating Animation (Bobbing) + Tilt */}
        {/* We only want this animation active when at the top (hero) */}
        <motion.div 
            className="w-full h-full relative"
            style={{ 
                rotateZ: tilt,
                transformStyle: "preserve-3d" 
            }}
            animate={{ 
                y: [0, -15, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Card Content - Inner container preserves 3D aspect */}
            <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Greeting Badge - Only visible at start */}
                <motion.div 
                    style={{ opacity: floatingOpacity }}
                    className="absolute -top-6 -right-6 z-30"
                >
                    <GreetingBadge />
                </motion.div>

                {/* Front Face */}
                <div className="absolute inset-0">
                    <ProfileCard />
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
};

export default ScrollFloatingCard;
