import React from "react";
import profileImg from "../assets/profile.png";
import profileImgMobile from "../assets/profile-mobile.webp";

const ProfileCard = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-[700px] rounded-3xl overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/15 shadow-2xl group ${className}`}>
        
        {/* Top Orange Glow Effect - Intensified */}
        <div className="absolute top-[-25%] left-[-20%] right-[-20%] h-[60%] bg-orange-500/40 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

        {/* Hover Sheen Effect - Light Reflection */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-3xl">
             <div className="absolute top-0 left-[-150%] h-full w-[80%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-[left] duration-1000 ease-in-out" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col">
            {/* Image Area - Adjusted for taller card */}
            <div className="relative flex-1 overflow-hidden m-3 rounded-2xl border border-white/5">
                 <picture className="w-full h-full block">
                    <source media="(max-width: 768px)" srcSet={profileImgMobile} />
                    <img 
                        src={profileImg}
                        alt="Ryan Cantareli"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 aspect-[300/700] md:aspect-[400/700]" 
                    />
                 </picture>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>

            {/* Text Content */}
            <div className="p-8 relative z-10">
                <p className="text-white text-3xl font-bold mb-2">Ryan Cantareli</p>
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <p className="text-white/70 text-base font-medium tracking-wide">Desenvolvedor Full Stack</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileCard;
