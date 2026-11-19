import './WhyMe.css';

const principles = [
  {
    title: 'Start with the brief',
    description: 'Understand the purpose and the people using the site before shaping the interface.',
  },
  {
    title: 'Keep the build considered',
    description: 'Write maintainable code and make deliberate decisions about clarity, speed and usability.',
  },
  {
    title: 'Design for every screen',
    description: 'Treat responsive behaviour as part of the design, not a final adjustment.',
  },
  {
    title: 'Deliver with care',
    description: 'Stay attentive to details and keep the work aligned with the agreed scope and timeline.',
  },
];

export default function WhyMe() {
  return (
    <section className="section approach-section">
      <div className="container">
        <div className="approach-layout">
          <div className="approach-intro reveal">
            <span className="section-tag">How I work</span>
            <h2 className="section-heading">Good work starts with good decisions.</h2>
            <p className="section-sub">
              A straightforward approach: understand the need, make the interface clear, and build it carefully.
            </p>
          </div>

          <ol className="approach-list">
            {principles.map((principle) => (
              <li
                className="approach-item reveal"
                key={principle.title}
              >
                <span className="approach-rule" aria-hidden="true" />
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
