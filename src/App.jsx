import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import TechStack3D from './components/TechStack3D';
import Footer from './components/Footer';

import ScrollFloatingCard from './components/ScrollFloatingCard';
import SmoothScroll from './components/ui/SmoothScroll';
import SectionDimmer from './components/ui/SectionDimmer';

function App() {
  return (
    <div className="bg-background text-white min-h-screen selection:bg-primary selection:text-white font-sans">
      <SmoothScroll>
        {/* GLOBAL LIGHTING EFFECTS (The "Void" Side Lights) */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            {/* Left Glow */}
            <div className="absolute top-[-10%] -left-[10%] w-[40vw] h-[60vh] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[20%] -left-[5%] w-[30vw] h-[50vh] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
            
            {/* Right Glow */}
            <div className="absolute top-[10%] -right-[10%] w-[40vw] h-[60vh] bg-orange-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] -right-[5%] w-[30vw] h-[50vh] bg-red-900/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        {/* MAIN CONTENT CONTAINER (The "Box") */}
        <div className="relative max-w-[1600px] mx-auto border-x border-white/5 bg-black shadow-2xl min-h-screen z-10">
          <Navbar />
          <ScrollFloatingCard />
          <main>
            <Hero />
            <SectionDimmer>
              <About />
            </SectionDimmer>
            <SectionDimmer>
              <TechStack3D />
            </SectionDimmer>
            <SectionDimmer>
              <Projects />
            </SectionDimmer>
            <SectionDimmer>
              <Contact />
            </SectionDimmer>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </div>
  );
}

export default App;
