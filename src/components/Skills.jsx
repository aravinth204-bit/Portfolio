import { useState } from 'react';
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
  const [activeSkill, setActiveSkill] = useState(skills[0]);

  return (
    <section id="skills" className="section skills-section">
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
            <div className="skills-index" role="group" aria-label="Frontend technologies">
              {skills.map((skill) => (
                <button
                  className={activeSkill.name === skill.name ? 'skill-option active' : 'skill-option'}
                  type="button"
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  aria-pressed={activeSkill.name === skill.name}
                  aria-controls="skill-detail"
                >
                  <span>{skill.name}</span>
                  <span className="skill-option-indicator" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="skill-detail" id="skill-detail" aria-live="polite">
              <span className="skill-detail-label">Currently selected</span>
              <h3>{activeSkill.name}</h3>
              <p>{activeSkill.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
