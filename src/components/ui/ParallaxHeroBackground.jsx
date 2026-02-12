import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import fundoParalax from '../../assets/paralax/paralaxNovo/fundoParalax.webp';
import pessoaParalax from '../../assets/paralax/paralaxNovo/pessoaParalax.webp';
import logoDemo from '../../assets/logoDemo.png';
import logoDemoMobile from '../../assets/logoDemo-mobile.webp';

const ParallaxHeroBackground = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax movement values
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const personY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]); 

    // Hero scrolling logic
    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const yPersonLayer = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yLogo = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Layer 1: Background */}
            <motion.div 
                style={{ y: yBackground }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <img 
                    src={fundoParalax} 
                    alt="Background" 
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover opacity-60" 
                />
            </motion.div>

            {/* Layer 1.5: Content (Behind Person) */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                 <div className="w-full h-full pointer-events-auto">
                    {children}
                 </div>
            </div>

            {/* Layer 2: Person (Middle) */}
            <motion.div 
                style={{ y: yPersonLayer }}
                className="absolute inset-0 w-full h-full z-20 flex items-end max-[800px]:items-center justify-center pointer-events-none"
            >
                <img 
                    src={pessoaParalax} 
                    alt="Ryan" 
                    fetchPriority="high"
                    decoding="async"
                    className="h-[90%] max-[800px]:h-[85%] max-[800px]:mb-0 w-auto object-contain object-bottom max-[800px]:object-center" 
                />
            </motion.div>

            {/* Layer 3: Logo (Front) */}
            <motion.div 
                style={{ y: yLogo }}
                className="absolute inset-0 w-full h-full z-30 flex items-center justify-center pt-20 pointer-events-none"
            >
                <picture className="w-[300px] md:w-[500px] drop-shadow-2xl opacity-0">
                    <source media="(max-width: 768px)" srcSet={logoDemoMobile} />
                    <img 
                        src={logoDemo} 
                        alt="Logo" 
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-contain" 
                    />
                </picture>
            </motion.div>
            
            {/* Mobile Bottom Mask Gradient to hide body cutoff */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-25 pointer-events-none hidden max-[800px]:block" />
            
            {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 z-40 pointer-events-none" />
        </div>
    );
};

export default ParallaxHeroBackground;
