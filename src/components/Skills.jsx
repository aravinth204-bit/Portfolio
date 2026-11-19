import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Skills.css';

const skills = [
  {
    name: 'HTML',
    detail: 'Semantic structure for accessible, well-organized web pages.',
  },
  {
    name: 'CSS',
    detail: 'Responsive layouts, visual systems and considered interface details.',
  },
  {
    name: 'JavaScript',
    detail: 'Interactive behaviour and application logic for the browser.',
  },
  {
    name: 'React.js',
    detail: 'Component-based interfaces and single-page applications.',
  },
  {
    name: 'Tailwind CSS',
    detail: 'Utility-first styling for building consistent interfaces.',
  },
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [displayedSkill, setDisplayedSkill] = useState(skills[0]);
  const detailRef = useRef(null);
  const lastDisplayedSkillRef = useRef(skills[0]);

  const selectSkill = (skill) => {
    setSelectedSkill(skill);
    setDisplayedSkill(skill);
  };

  useLayoutEffect(() => {
    if (lastDisplayedSkillRef.current.name === displayedSkill.name) return undefined;
    lastDisplayedSkillRef.current = displayedSkill;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const reveal = gsap.fromTo(
      detailRef.current,
      { autoAlpha: 0, y: 10, clipPath: 'inset(0 0 8% 0)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.38, ease: 'power3.out' },
    );

    return () => reveal.kill();
  }, [displayedSkill]);

  return (
    <section id="skills" className="section skills-section" data-motion-section>
      <span className="motion-thread" aria-hidden="true" />
      <div className="container">
        <div className="skills-layout">
          <div className="skills-intro reveal">
            <span className="section-tag">Skills</span>
            <h2 className="section-heading">A practical frontend toolkit.</h2>
            <p className="section-sub">
              The building blocks I use to shape and develop web interfaces.
            </p>
          </div>

          <div className="skills-explorer reveal">
            <div
              className="skills-index"
              role="group"
              aria-label="Frontend technologies"
              style={{ '--skill-offset': `${skills.findIndex((skill) => skill.name === selectedSkill.name) * 58}px` }}
            >
              {skills.map((skill) => (
                <button
                  className={selectedSkill.name === skill.name ? 'skill-option active' : 'skill-option'}
                  type="button"
                  data-magnetic
                  key={skill.name}
                  onClick={() => selectSkill(skill)}
                  aria-pressed={selectedSkill.name === skill.name}
                  aria-controls="skill-detail"
                >
                  <span>{skill.name}</span>
                  <span className="skill-option-indicator" aria-hidden="true" />
                </button>
              ))}
              <span className="skill-active-indicator" aria-hidden="true" />
            </div>

            <div className="skill-detail" id="skill-detail" aria-live="polite" ref={detailRef}>
              <span className="skill-detail-label">Currently selected</span>
              <h3>{displayedSkill.name}</h3>
              <p>{displayedSkill.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
