import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './HeroTerminal.css';

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState('developer.ts');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // 3D perspective tilt effect on mousemove
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (y / (rect.height / 2)) * -9;
    const rotY = (x / (rect.width / 2)) * 9;

    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const copyCode = () => {
    const textToCopy = `const developer = {
  name: 'Aravinth S',
  role: 'Creative Frontend Engineer',
  status: 'Open for High-Impact Roles'
};`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="hero-terminal-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-terminal-card" ref={cardRef}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control dot-close" />
            <span className="control dot-minimize" />
            <span className="control dot-maximize" />
          </div>

          <div className="terminal-tabs">
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'developer.ts' ? 'active' : ''}`}
              onClick={() => setActiveTab('developer.ts')}
            >
              <span className="tab-icon ts-icon">TS</span>
              <span>developer.ts</span>
            </button>
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'stack.json' ? 'active' : ''}`}
              onClick={() => setActiveTab('stack.json')}
            >
              <span className="tab-icon json-icon">{'{}'}</span>
              <span>stack.json</span>
            </button>
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'terminal' ? 'active' : ''}`}
              onClick={() => setActiveTab('terminal')}
            >
              <span className="tab-icon cli-icon">&gt;_</span>
              <span>bash</span>
            </button>
          </div>

          <button 
            type="button" 
            className="terminal-copy-btn" 
            onClick={copyCode}
            title="Copy snippet"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Terminal Editor Content */}
        <div className="terminal-body">
          {activeTab === 'developer.ts' && (
            <div className="code-content">
              <div className="code-line">
                <span className="line-num">01</span>
                <span className="token-keyword">export</span> <span className="token-keyword">const</span> <span className="token-var">developer</span>: <span className="token-type">DeveloperProfile</span> = &#123;
              </div>
              <div className="code-line indent">
                <span className="line-num">02</span>
                <span className="token-prop">name:</span> <span className="token-string">'Aravinth S'</span>,
              </div>
              <div className="code-line indent">
                <span className="line-num">03</span>
                <span className="token-prop">role:</span> <span className="token-string">'Creative Frontend Developer'</span>,
              </div>
              <div className="code-line indent">
                <span className="line-num">04</span>
                <span className="token-prop">location:</span> <span className="token-string">'Tamil Nadu, India'</span>,
              </div>
              <div className="code-line indent">
                <span className="line-num">05</span>
                <span className="token-prop">coreFocus:</span> [
              </div>
              <div className="code-line double-indent">
                <span className="line-num">06</span>
                <span className="token-string">'Interactive 3D Web'</span>,
              </div>
              <div className="code-line double-indent">
                <span className="line-num">07</span>
                <span className="token-string">'High-Performance React UI'</span>,
              </div>
              <div className="code-line double-indent">
                <span className="line-num">08</span>
                <span className="token-string">'Cinematic GSAP Motion'</span>
              </div>
              <div className="code-line indent">
                <span className="line-num">09</span>
                ],
              </div>
              <div className="code-line indent">
                <span className="line-num">10</span>
                <span className="token-prop">status:</span> <span className="token-accent">'Open for Opportunities'</span>,
              </div>
              <div className="code-line indent">
                <span className="line-num">11</span>
                <span className="token-fn">craftExperience:</span> () =&gt; &#123;
              </div>
              <div className="code-line double-indent">
                <span className="line-num">12</span>
                <span className="token-keyword">return</span> <span className="token-string">'Award-Winning Clean Code ✨'</span>;
              </div>
              <div className="code-line indent">
                <span className="line-num">13</span>
                &#125;
              </div>
              <div className="code-line">
                <span className="line-num">14</span>
                &#125;;
              </div>
            </div>
          )}

          {activeTab === 'stack.json' && (
            <div className="code-content">
              <div className="code-line">
                <span className="line-num">01</span>
                &#123;
              </div>
              <div className="code-line indent">
                <span className="line-num">02</span>
                <span className="token-prop">"frontend"</span>: [<span className="token-string">"React 19"</span>, <span className="token-string">"Vite"</span>, <span className="token-string">"TypeScript"</span>],
              </div>
              <div className="code-line indent">
                <span className="line-num">03</span>
                <span className="token-prop">"animation"</span>: [<span className="token-string">"GSAP"</span>, <span className="token-string">"ScrollTrigger"</span>, <span className="token-string">"Three.js"</span>],
              </div>
              <div className="code-line indent">
                <span className="line-num">04</span>
                <span className="token-prop">"styling"</span>: [<span className="token-string">"TailwindCSS"</span>, <span className="token-string">"Modern CSS"</span>],
              </div>
              <div className="code-line indent">
                <span className="line-num">05</span>
                <span className="token-prop">"backend"</span>: [<span className="token-string">"Node.js"</span>, <span className="token-string">"Express"</span>, <span className="token-string">"MongoDB"</span>],
              </div>
              <div className="code-line indent">
                <span className="line-num">06</span>
                <span className="token-prop">"standards"</span>: <span className="token-accent">"Awwwards-grade performance"</span>
              </div>
              <div className="code-line">
                <span className="line-num">07</span>
                &#125;
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="terminal-cli">
              <div className="cli-row">
                <span className="cli-prompt">aravinth@portfolio:~$</span>
                <span className="cli-cmd">node --version</span>
              </div>
              <div className="cli-output">v20.12.0 (LTS)</div>
              
              <div className="cli-row">
                <span className="cli-prompt">aravinth@portfolio:~$</span>
                <span className="cli-cmd">npm run build-experience</span>
              </div>
              <div className="cli-output success">
                ✔ 4 Production apps compiled<br />
                ✔ 60 FPS animations verified<br />
                ✔ Ready to collaborate on great products!
              </div>
              <div className="cli-row typing-cursor">
                <span className="cli-prompt">aravinth@portfolio:~$</span>
                <span className="cli-blink">_</span>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Status Footer */}
        <div className="terminal-footer">
          <div className="footer-left">
            <span className="git-branch">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="3" x2="6" y2="15"></line>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
              main*
            </span>
            <span className="footer-status-pill">
              <span className="status-ping" />
              Active
            </span>
          </div>

          <div className="footer-right">
            <span>TypeScript</span>
            <span>UTF-8</span>
            <span className="rating-badge">AWWWARDS READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
