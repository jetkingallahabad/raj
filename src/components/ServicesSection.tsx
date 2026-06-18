import { useState } from 'react';
import type { Service, SectionHeader } from '../lib/types';

interface ServicesSectionProps {
  services: Service[];
  header: SectionHeader;
  onLearnMore: (serviceId: string) => void;
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'performance', label: 'Performance' },
  { key: 'branding', label: 'Branding' },
  { key: 'strategy', label: 'Strategy' },
];

export default function ServicesSection({ services, header, onLearnMore }: ServicesSectionProps) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? services : services.filter((s) => s.category.split(' ').includes(filter));

  return (
    <section id="services" className="services section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>

        <div className="service-filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="services-grid">
          {filtered.map((service) => (
            <article key={service.id} className="service-card reveal">
              {service.image_url && (
                <div className="service-card-image">
                  <img src={service.image_url} alt={service.title} />
                </div>
              )}
              <div className="service-card-body">
                <div className="service-icon">
                  <i className={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  <li>{service.bullet_1}</li>
                  <li>{service.bullet_2}</li>
                  <li>{service.bullet_3}</li>
                </ul>
                <button className="service-learn" onClick={() => onLearnMore(service.id)}>Learn More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
