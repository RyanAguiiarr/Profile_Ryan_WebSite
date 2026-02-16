import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import fundoParalax from '../../assets/paralax/paralaxNovo/fundoParalax.webp';
import pessoaParalax from '../../assets/paralax/paralaxNovo/pessoaParalax.webp';
import logoDemo from '../../assets/logoDemo.png';

const ParallaxHeroBackground = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax movement values
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const personY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]); // Person moves slightly slower than bg to create depth? No, usually foreground moves faster.
    // Let's rethink standard parallax:
    // Background (farthest): moves slowest (or barely)
    // Middle (Person): moves faster than background
    // Front (Logo): moves fastest

    // However, if we want them to "separate" as we scroll down:
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Farthest - moves some amount
    const personYVal = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Mid - Centered, moves a bit less? 
    // Actually, usually things further away move slower.
    // So Bg = slow. Person = medium. Logo = fast.
    
    // But since this is a hero background, we want the effect of the user scrolling *past* these items.
    // If we want a "deep" feel:
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yPerson = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]); // Person stays more 'fixed' relative to viewport? 
    // Let's stick to standard: background moves slower than foreground.
    
    const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Logo moves up/away faster?

    // Simpler approach for a "Hero" that scrolls away:
    // We want them to stay fixed for a bit or move at different rates.
    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const yPersonLayer = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yLogo = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Layer 1: Background */}
            <motion.div 
                style={{ y: yBackground }}
                className="absolute inset-0 w-full h-full z-0 will-change-transform"
            >
                <img 
                    src={fundoParalax} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-60" 
                />
            </motion.div>

            {/* Layer 1.5: Content (Behind Person) */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                 {/* 
                    Wrapper must be pointer-events-auto for buttons if they are not covered by person.
                    Actually, if Person is z-20, it will block clicks on text if it overlaps.
                    The text is "behind" the person visually. Use z-10 for content, z-20 for person.
                 */}
                 <div className="w-full h-full pointer-events-auto">
                    {children}
                 </div>
            </div>

            {/* Layer 2: Person (Middle) */}
            <motion.div 
                style={{ y: yPersonLayer }}
                className="absolute inset-0 w-full h-full z-20 flex items-end max-[800px]:items-center justify-center pointer-events-none will-change-transform"
            >
                <img 
                    src={pessoaParalax} 
                    alt="Ryan" 
                    className="h-[90%] max-[800px]:h-[85%] max-[800px]:mb-0 w-auto object-contain object-bottom max-[800px]:object-center" 
                />
            </motion.div>

            {/* Layer 3: Logo (Front) */}
            <motion.div 
                style={{ y: yLogo }}
                className="absolute inset-0 w-full h-full z-30 flex items-center justify-center pt-20 pointer-events-none will-change-transform"
            >
                <img 
                    src={logoDemo} 
                    alt="Logo" 
                    className="w-[300px] md:w-[500px] object-contain drop-shadow-2xl opacity-0" // Hiding logic based on user request? No, keep it. Wait, user didn't say remove logo.
                />
            </motion.div>
            
            {/* Mobile Bottom Mask Gradient to hide body cutoff */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-25 pointer-events-none hidden max-[800px]:block" />
            
            {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 z-40 pointer-events-none" />
        </div>
    );
};

export default ParallaxHeroBackground;
