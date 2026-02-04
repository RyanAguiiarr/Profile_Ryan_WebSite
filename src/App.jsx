import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import TechStack3D from './components/TechStack3D';
import Footer from './components/Footer';
import FutureProjects from './components/FutureProjects';

// import ScrollFloatingCard from './components/ScrollFloatingCard';
import SmoothScroll from './components/ui/SmoothScroll';
import SectionDimmer from './components/ui/SectionDimmer';
import ThreeDCarousel from './components/ThreeDCarousel';

function App() {
  return (
    <div className="bg-background text-white min-h-screen selection:bg-primary selection:text-white font-sans">
      <SmoothScroll>
        {/* GLOBAL ORANGE LIGHTING */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Top Right Orange Glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-orange-600/10 blur-[120px] rounded-full mix-blend-screen opacity-60" />
            
            {/* Bottom Left Orange Glow */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-800/10 blur-[150px] rounded-full mix-blend-screen opacity-60" />
            
            {/* Center Ambient */}
            <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-orange-500/5 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        {/* MAIN CONTENT CONTAINER (The "Box") */}
        <div className="relative max-w-[1600px] mx-auto shadow-2xl min-h-screen z-10">
          <Navbar />
          {/* <ScrollFloatingCard /> */}
          <main>
            <Hero />
            <SectionDimmer>
              <About />
            </SectionDimmer>
            <SectionDimmer>
              <ThreeDCarousel />
            </SectionDimmer>
            <SectionDimmer>
              <TechStack3D />
            </SectionDimmer>
            <SectionDimmer>
              <Projects />
            </SectionDimmer>
            <SectionDimmer>
              <FutureProjects />
            </SectionDimmer>
            <SectionDimmer>
              <Contact />
            </SectionDimmer>
          </main>
        </div>
      </SmoothScroll>
    </div>
  );
}

export default App;
