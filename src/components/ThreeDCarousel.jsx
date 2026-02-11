import React from 'react';
import { motion } from 'framer-motion';
import ParallaxElement from './ui/ParallaxElement';

import img1 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_3nk7pd3nk7pd3nk7.jpg';
import img2 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_4smwzx4smwzx4smw.jpg';
import img3 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_4tp6ni4tp6ni4tp6.jpg';
import img4 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_7o5d7f7o5d7f7o5d.jpg';
import img5 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_8ngwj38ngwj38ngw.jpg';
import img6 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_bf47mrbf47mrbf47.jpg';
import img7 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_bmt6vsbmt6vsbmt6.jpg';
import img8 from '../assets/cardCarrossel/semac/Gemini_Generated_Image_tlgfc6tlgfc6tlgf.jpg';
import img1Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_3nk7pd3nk7pd3nk7-mobile.jpg';
import img2Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_4smwzx4smwzx4smw-mobile.jpg';
import img3Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_4tp6ni4tp6ni4tp6-mobile.jpg';
import img4Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_7o5d7f7o5d7f7o5d-mobile.jpg';
import img5Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_8ngwj38ngwj38ngw-mobile.jpg';
import img6Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_bf47mrbf47mrbf47-mobile.jpg';
import img7Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_bmt6vsbmt6vsbmt6-mobile.jpg';
import img8Mobile from '../assets/cardCarrossel/semac/Gemini_Generated_Image_tlgfc6tlgfc6tlgf-mobile.jpg';

const cards = [
  { id: 1, img: img1, imgMobile: img1Mobile },
  { id: 2, img: img2, imgMobile: img2Mobile },
  { id: 3, img: img3, imgMobile: img3Mobile },
  { id: 4, img: img4, imgMobile: img4Mobile },
  { id: 5, img: img5, imgMobile: img5Mobile },
  { id: 6, img: img6, imgMobile: img6Mobile },
  { id: 7, img: img7, imgMobile: img7Mobile },
  { id: 8, img: img8, imgMobile: img8Mobile },
  
  // Duplicates to ensure full circle density (16 cards total for tight spacing)
  { id: 9, img: img1, imgMobile: img1Mobile },
  { id: 10, img: img2, imgMobile: img2Mobile },
  { id: 11, img: img3, imgMobile: img3Mobile },
  { id: 12, img: img4, imgMobile: img4Mobile },
  { id: 13, img: img5, imgMobile: img5Mobile },
  { id: 14, img: img6, imgMobile: img6Mobile },
  { id: 15, img: img7, imgMobile: img7Mobile },
  { id: 16, img: img8, imgMobile: img8Mobile },
];


import AboutBackgroundShapes from './ui/AboutBackgroundShapes';

const ThreeDCarousel = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuration based on device
  const config = isMobile ? {
    radius: -800, // Smaller radius for mobile
    width: 300,
    height: 650,
    perspective: 300,
    // Center offsets
    ml: -100, // half of width
    mt: -450  // half of height
  } : {
    radius: -1050,
    width: 400,
    height: 700,
    perspective: 750,
    ml: -200, // half of width
    mt: -350  // half of height
  };

  return (
    // Increased scale to ensure cards aren't cut off and fill the field
    // Added breakout styles: w-screen and negative margins to escape the max-w-[1600px] parent
    <section className="relative h-[500px] md:h-[800px] -mb-32 md:mb-0 w-screen left-1/2 -ml-[50vw] overflow-hidden flex flex-col items-center justify-center bg-black">
      <AboutBackgroundShapes showShapes={false} />

      {/* Adjusted Masks - thinner to maximize visible area */}
      <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* 3D Carousel Container */}
      <ParallaxElement offset={50} className="w-full h-full flex items-center justify-center relative z-10">
        <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: `${config.perspective}px` }}
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
             
             return (
              <div 
                key={card.id} 
                className="absolute top-1/2 left-1/2 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-white/5"
                style={{
                  width: `${config.width}px`,
                  height: `${config.height}px`,
                  marginLeft: `${config.ml}px`,
                  marginTop: `${config.mt}px`,
                  transform: `rotateY(${rotation}deg) translateZ(${config.radius}px)`,
                  backfaceVisibility: "hidden", 
                }}
              >
                <div className="w-full h-full relative group cursor-pointer">
                  <img 
                    src={card.img} 
                    srcSet={`${card.imgMobile} 300w, ${card.img} 800w`}
                    sizes="(max-width: 768px) 280px, 400px"
                    alt={`Gallery ${card.id}`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-[300/650] md:aspect-[400/700]" 
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
      </ParallaxElement>
    </section>
  );
};

export default ThreeDCarousel;
