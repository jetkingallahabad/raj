import type { WhyUsItem, SectionHeader } from '../lib/types';

interface WhyUsSectionProps {
  items: WhyUsItem[];
  header: SectionHeader;
}

export default function WhyUsSection({ items, header }: WhyUsSectionProps) {
  return (
    <section id="why-us" className="why-us section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>
        <div className="why-grid">
          {items.map((item) => (
            <div key={item.id} className="why-card reveal">
              <div className="why-icon">
                <i className={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
