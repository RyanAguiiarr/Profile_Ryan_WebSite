import React from 'react';
import paralaxVideo from '../../assets/paralax/paralaxVideo.webm';

const ParallaxHeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <video 
        title="Background animation video"
        src={paralaxVideo} 
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-80"
      >
        <track kind="captions" src="data:text/vtt;charset=utf-8,WEBVTT" label="No captions" default />
      </video>
      {/* Optional: Add a localized overlay if the gif is too bright, matching previous darkening */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default ParallaxHeroBackground;


