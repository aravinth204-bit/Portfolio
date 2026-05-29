import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ── EmailJS Config ──────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ → Sign up free
// 2. Add Email Service (Gmail) → copy SERVICE_ID
// 3. Create Email Template → copy TEMPLATE_ID
// 4. Account → API Keys → copy PUBLIC_KEY
const EMAILJS_SERVICE_ID  = 'service_lcft8kr';
const EMAILJS_TEMPLATE_ID = 'template_uehpfmw';
const EMAILJS_PUBLIC_KEY  = 'nRELU8QU2tAmq6QyE';
// ────────────────────────────────────────────────────────────

/* SVG Icons */
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.86L.057 23.617a.5.5 0 0 0 .609.61l5.805-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.545 9.545 0 0 1-4.861-1.328l-.349-.207-3.617.913.944-3.558-.228-.367A9.554 9.554 0 0 1 2.4 12c0-5.293 4.307-9.6 9.6-9.6 5.293 0 9.6 4.307 9.6 9.6 0 5.293-4.307 9.6-9.6 9.6z"/>
  </svg>
);

const SmallMailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const contactLinks = [
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'aravinth204@gmail.com',
    href: 'mailto:aravinth204@gmail.com',
    color: '#EA4335',
    bg: '#FEF2F2',
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aravinth-frontend-devloper',
    href: 'https://www.linkedin.com/in/aravinth-frontend-devloper',
    color: '#0A66C2',
    bg: '#EFF6FF',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'github.com/aravinth204-bit',
    href: 'https://github.com/aravinth204-bit',
    color: '#24292E',
    bg: '#F6F8FA',
  },
  {
    icon: <WhatsAppIcon />,
    label: 'WhatsApp',
    value: 'Chat with me',
    href: 'https://wa.me/918778017989',   // +91 8778017989
    color: '#25D366',
    bg: '#F0FDF4',
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.95rem 1.2rem',
    background: 'var(--bg)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '7rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: '5rem',
          alignItems: 'start',
        }}>

          {/* ── LEFT — Info ── */}
          <div className="reveal">
            <span className="section-tag">
              <SmallMailIcon /> Contact
            </span>
            <h2 className="section-heading">Let's Build Something Great</h2>
            <p style={{
              fontSize: '1rem', color: 'var(--text-secondary)',
              lineHeight: 1.8, marginBottom: '2.5rem',
            }}>
              Ready to start your project? Whether it's a landing page, a full web app,
              or a redesign — I'd love to help you bring your vision to life.
            </p>

            {/* Contact links */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {contactLinks.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    textDecoration: 'none', padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c.color + '55';
                    e.currentTarget.style.background = c.bg;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 'var(--radius-sm)',
                    background: c.bg, color: c.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${c.color}25`,
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {c.label}
                    </p>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: c.color,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.value}
                    </p>
                  </div>
                  <svg style={{ marginLeft: 'auto', flexShrink: 0, color: c.color, opacity: 0.6 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17 17 7M7 7h10v10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Form ── */}
          <div className="reveal reveal-delay-2">
            <div className="glass-card" style={{ padding: '2.5rem' }}>

              {status === 'success' && (
                <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Thanks! I'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  background: '#FEF2F2', border: '1px solid #FCA5A5',
                  borderRadius: 'var(--radius-sm)', padding: '1rem',
                  marginBottom: '1.25rem', color: '#DC2626', fontSize: '0.9rem', fontWeight: 600,
                }}>
                  ⚠️ Failed to send. Please email me directly at aravinth204@gmail.com
                </div>
              )}

              {status !== 'success' && (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)',
                        display: 'block', marginBottom: '0.4rem' }}>
                        Your Name *
                      </label>
                      <input id="contact-name" type="text" name="name"
                        placeholder="John Doe" value={form.name}
                        onChange={handleChange} required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)',
                        display: 'block', marginBottom: '0.4rem' }}>
                        Email Address *
                      </label>
                      <input id="contact-email" type="email" name="email"
                        placeholder="john@example.com" value={form.email}
                        onChange={handleChange} required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)',
                      display: 'block', marginBottom: '0.4rem' }}>
                      Subject
                    </label>
                    <input type="text" name="subject"
                      placeholder="Project inquiry / Website redesign..." style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)',
                      display: 'block', marginBottom: '0.4rem' }}>
                      Message *
                    </label>
                    <textarea id="contact-message" name="message" rows={5}
                      placeholder="Tell me about your project — budget, timeline, goals..."
                      value={form.message} onChange={handleChange} required
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  <button id="contact-submit" type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem',
                      opacity: status === 'loading' ? 0.75 : 1 }}>
                    {status === 'loading' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Trust note */}
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)',
              marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <span>🔒</span> Your info is safe. I reply within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
