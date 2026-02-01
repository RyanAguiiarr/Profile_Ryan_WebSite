import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  { id: 1, img: 'https://images.unsplash.com/photo-1518005052304-a4b5708994d5?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, img: 'https://images.unsplash.com/photo-1502452213786-a5bc0a67e963?q=80&w=1000&auto=format&fit=crop' },
  
  // Duplicates to ensure full circle density (14 cards total for tight spacing)
  { id: 9, img: 'https://images.unsplash.com/photo-1518005052304-a4b5708994d5?q=80&w=1000&auto=format&fit=crop' },
  { id: 10, img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop' },
  { id: 11, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop' },
  { id: 12, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
  { id: 13, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop' },
  { id: 14, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
  { id: 15, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
  { id: 16, img: 'https://images.unsplash.com/photo-1502452213786-a5bc0a67e963?q=80&w=1000&auto=format&fit=crop' },
];

const ThreeDCarousel = () => {
  return (
    // Increased scale to ensure cards aren't cut off and fill the field
    // Added breakout styles: w-screen and negative margins to escape the max-w-[1600px] parent
    <section className="relative h-[800px] w-screen left-1/2 -ml-[50vw] overflow-hidden flex flex-col items-center justify-center">
      {/* Adjusted Masks - thinner to maximize visible area */}
      <div className="absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[5%] bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* 3D Carousel Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-0 h-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 180 }} // Inverted rotation direction to match "natural" flow with concave
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {cards.map((card, index) => {
             const count = cards.length;
             const rotation = index * (360 / count); 
             
             // CONCAVE GEOMETRY: 
             // Using Negative Radius puts the center of the card circle BEHIND the origin.
             // This creates an "Immersive/Inside" curve where edges come towards the viewer.
             const radius = -880; // Increased negative radius to add spacing between cards
             
             return (
              <div 
                key={card.id} 
                className="absolute top-1/2 left-1/2 w-[300px] h-[500px] -ml-[150px] -mt-[225px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-white/5"
                style={{
                  // Note: translateZ with negative radius puts it "inside" (concave).
                  // rotateY(180deg) might be needed if they face the wrong way, 
                  // but typically translateZ(-R) keeps them facing the center (camera).
                  // Let's verify: In CSS 3D, translateZ(-100) pushes it away. 
                  // So face 0 is at -750. Face 180 is at (rotate 180 -> translate -750) = +750?
                  // No. rotate(180) turns it around, then translateZ(-750) pushes it "forward" in its local space (which is backwards in world).
                  // Yes, so Face 180 is at Z=+750. 
                  // Ideally we want the cards FACING CENTER to be visible.
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden", 
                }}
              >
                <div className="w-full h-full relative group cursor-pointer">
                  <img 
                    src={card.img} 
                    alt={`Gallery ${card.id}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {/* Dark overlay that lightens on hover */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Subtle inner glow/border */}
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              </div>
             );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
