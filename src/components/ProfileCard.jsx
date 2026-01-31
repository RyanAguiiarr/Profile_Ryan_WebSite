import React from "react";
import profileImg from "../assets/profile.png";

const ProfileCard = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl ${className}`}>
        <img 
            src={profileImg} 
            alt="Ryan Cantareli"
            className="w-full h-full object-cover opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-left">
            <p className="text-white text-lg font-bold">Ryan Cantareli</p>
            <p className="text-white/60 text-sm">Desenvolvedor Full Stack</p>
        </div>
    </div>
  );
};

export default ProfileCard;
