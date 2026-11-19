import { useCallback, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import './components/MotionChrome.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import WhyMe from './components/WhyMe';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { IntroCurtain, MotionChrome } from './components/MotionChrome';
import MotionJourney from './components/MotionJourney';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [introReady, setIntroReady] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const completeIntro = useCallback(() => setIntroReady(true), []);

  useLayoutEffect(() => {
    if (!introReady) return undefined;

    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const main = document.querySelector('#main-content');
      const context = gsap.context(() => {
        const servicesIntro = document.querySelector('.services-intro');
        if (servicesIntro) {
          gsap.fromTo(
            servicesIntro.querySelectorAll('.section-tag, .section-heading, .section-sub'),
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.68,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: servicesIntro, start: 'top 80%', once: true },
            },
          );
        }

        gsap.utils.toArray('.service-row').forEach((row) => {
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 86%', once: true },
          });
          timeline
            .fromTo(row.querySelector('.service-rule'), { scaleY: 0 }, {
              scaleY: 1, transformOrigin: 'top center', duration: 0.42, ease: 'power2.out',
            })
            .fromTo(row.querySelector('.service-copy'), { x: -18, autoAlpha: 0 }, {
              x: 0, autoAlpha: 1, duration: 0.58, ease: 'power3.out',
            }, '-=0.16');
        });

        const projectsIntro = document.querySelector('.projects-intro');
        if (projectsIntro) {
            gsap.fromTo(projectsIntro.querySelectorAll('.section-tag, .section-heading, .section-sub'), {
              y: 20,
              autoAlpha: 0,
            }, {
              y: 0,
              autoAlpha: 1,
              duration: 0.62,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: projectsIntro, start: 'top 80%', once: true },
            });
        }

        const skills = document.querySelector('#skills');
        if (skills) {
            gsap.fromTo(skills.querySelectorAll('.skills-intro .section-tag, .skills-intro h2, .skills-intro .section-sub'), {
              x: -18,
              autoAlpha: 0,
            }, {
              x: 0,
              autoAlpha: 1,
              duration: 0.58,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: skills, start: 'top 78%', once: true },
            });
            gsap.fromTo(skills.querySelectorAll('.skill-option'), {
              clipPath: 'inset(0 0 0 100%)',
            }, {
              clipPath: 'inset(0 0 0 0%)',
              duration: 0.55,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: { trigger: skills.querySelector('.skills-explorer'), start: 'top 80%', once: true },
            });
            gsap.fromTo(skills.querySelector('.skill-detail'), { clipPath: 'inset(0 0 0 12%)', autoAlpha: 0 }, {
              clipPath: 'inset(0 0 0 0%)',
              autoAlpha: 1,
              duration: 0.68,
              ease: 'power3.out',
              scrollTrigger: { trigger: skills.querySelector('.skills-explorer'), start: 'top 80%', once: true },
            });
        }

        const approachIntro = document.querySelector('.approach-intro');
        if (approachIntro) {
            gsap.fromTo(approachIntro.querySelectorAll('.section-tag, .section-heading, .section-sub'), {
              clipPath: 'inset(0 0 100% 0)',
            }, {
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.68,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: approachIntro, start: 'top 80%', once: true },
            });
        }

        gsap.utils.toArray('.approach-item').forEach((item) => {
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: item, start: 'top 86%', once: true },
          });
          timeline
            .fromTo(item.querySelector('.approach-rule'), { scaleY: 0 }, {
              scaleY: 1, transformOrigin: 'top center', duration: 0.36, ease: 'power2.out',
            })
            .fromTo(item.querySelector('div'), { x: -20, autoAlpha: 0 }, {
              x: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out',
            }, '-=0.12');
        });

        const about = document.querySelector('#about');
        if (about) {
          const words = about.querySelectorAll('.about-heading-word');
          gsap.fromTo(about.querySelector('.about-portrait'), {
            clipPath: 'inset(0 0 100% 0)',
          }, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: about, start: 'top 76%', once: true },
          });
          gsap.fromTo(words, { yPercent: 110, autoAlpha: 0 }, {
            yPercent: 0,
            autoAlpha: 1,
            ease: 'none',
            stagger: 0.012,
            scrollTrigger: {
              trigger: about.querySelector('.about-copy'),
              start: 'top 82%',
              end: 'top 40%',
              scrub: 0.45,
            },
          });

          if (window.matchMedia('(min-width: 801px)').matches) {
            gsap.to(about.querySelector('.about-portrait img'), {
              yPercent: -3,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: about,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            });
          }

          gsap.fromTo(about.querySelectorAll('.about-copy > p, .about-details, .about-contact'), {
            y: 14,
            autoAlpha: 0,
          }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: about.querySelector('.about-copy'), start: 'top 78%', once: true },
          });
        }

        const experience = document.querySelector('.experience-section');
        if (experience) {
          gsap.fromTo(experience.querySelectorAll('.experience-intro .section-tag, .experience-intro h2'), {
            x: -16,
            autoAlpha: 0,
          }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.58,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: experience, start: 'top 80%', once: true },
          });
          gsap.fromTo(experience.querySelector('.experience-track-progress'), { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: experience.querySelector('.experience-timeline'),
              start: 'top 82%',
              end: 'bottom 52%',
              scrub: 0.7,
            },
          });
          const entry = experience.querySelector('.experience-entry');
          const marker = experience.querySelector('.experience-marker');
          gsap.fromTo(marker, { scale: 0.65, y: 0 }, {
            scale: 1,
            y: () => Math.max(0, entry.offsetHeight - marker.offsetHeight - 36),
            ease: 'none',
            scrollTrigger: {
              trigger: entry,
              start: 'top 82%',
              end: 'bottom 52%',
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          });
          gsap.fromTo(experience.querySelector('.experience-entry'), { x: -24, autoAlpha: 0 }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: experience.querySelector('.experience-entry'), start: 'top 84%', once: true },
          });
        }

        const contact = document.querySelector('#contact');
        if (contact) {
          gsap.fromTo(contact.querySelectorAll('.contact-intro .section-tag, .contact-intro h2, .contact-intro > p'), {
            clipPath: 'inset(0 0 100% 0)',
          }, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: contact, start: 'top 72%', once: true },
          });
          gsap.fromTo(contact.querySelectorAll('.contact-link'), { x: -18, autoAlpha: 0 }, {
            x: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: contact, start: 'top 72%', once: true },
          });
          gsap.fromTo(contact.querySelector('.contact-form-panel'), { clipPath: 'inset(0 0 0 12%)', autoAlpha: 0 }, {
            clipPath: 'inset(0 0 0 0%)',
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: contact, start: 'top 72%', once: true },
          });
        }

        const footer = document.querySelector('.site-footer');
        if (contact && footer) {
          const closingSequence = gsap.timeline({
            scrollTrigger: {
              trigger: contact,
              start: 'bottom bottom',
              end: 'bottom 72%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          closingSequence
            .fromTo(footer, { clipPath: 'inset(12% 0 0 0)' }, {
              clipPath: 'inset(0% 0 0 0)',
              ease: 'none',
            }, 0)
            .fromTo(footer.querySelectorAll('.footer-motion'), {
              y: 20,
              autoAlpha: 0.35,
            }, {
              y: 0,
              autoAlpha: 1,
              stagger: 0.12,
              ease: 'none',
            }, 0.12)
            .to(contact.querySelector('.contact-form-panel'), {
              y: -16,
              autoAlpha: 0.72,
              ease: 'none',
            }, 0);
        }
      }, main);

      return () => {
        context.revert();
      };
    });

    return () => media.revert();
  }, [introReady]);

  return (
    <>
      {!introReady && <IntroCurtain onComplete={completeIntro} />}
      <MotionChrome />
      <Navbar />
      <div className="motion-page">
        <MotionJourney />
        <main id="main-content" tabIndex="-1">
          <Hero introReady={introReady} />
          <Services />
          <Projects />
          <Skills />
          <WhyMe />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
