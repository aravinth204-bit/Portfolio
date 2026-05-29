import { useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import WhyMe from './components/WhyMe';

import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    // Small delay so all child components are mounted
    const timer = setTimeout(() => {
      const revealEls = document.querySelectorAll('.reveal');
      revealEls.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);


  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Skills />
        <WhyMe />

        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
