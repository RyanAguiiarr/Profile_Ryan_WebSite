import React, { useEffect } from "react";
import Lenis from "lenis";
import { isIOS } from "../../utils/ios-utils";

export const LenisContext = React.createContext();

const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = React.useState(null);

  useEffect(() => {
    const isIOSDevice = isIOS();
    
    const lenisInstance = new Lenis({
      duration: isIOSDevice ? 1.0 : 1.5, // Faster/native-like on iOS
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !isIOSDevice, // Disable heavy smoothing on iOS if it causes issues, or keep enabled but lighter
      mouseMultiplier: 1,
      smoothTouch: false, // Always false for touch devices usually better
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
