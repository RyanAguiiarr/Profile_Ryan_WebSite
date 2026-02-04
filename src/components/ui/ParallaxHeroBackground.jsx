import React from 'react';
import paralaxGif from '../../assets/paralax/paralaxGif.gif';

const ParallaxHeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={paralaxGif} 
        alt="Parallax Background" 
        className="w-full h-full object-cover opacity-80"
      />
      {/* Optional: Add a localized overlay if the gif is too bright, matching previous darkening */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default ParallaxHeroBackground;


