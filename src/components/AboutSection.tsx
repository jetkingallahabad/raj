import { CheckCircle } from 'lucide-react';
import type { AboutContent, AboutStat } from '../lib/types';
import { useCounter } from './useCounter';

interface AboutSectionProps {
  about: AboutContent;
  stats: AboutStat[];
}

function StatCard({ stat }: { stat: AboutStat }) {
  const counterRef = useCounter(Number(stat.number) || 0);
  return (
    <div className="stat-card">
      <span className="stat-number" ref={counterRef}>
        0
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function AboutSection({ about, stats }: AboutSectionProps) {
  return (
    <section id="about" className="about section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{about.section_title}</h2>
          <p>{about.section_subtitle}</p>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <h3>{about.heading}</h3>
            <p>{about.paragraph_1}</p>
            <p>{about.paragraph_2}</p>
            <ul className="about-list">
              <li>
                <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                {about.list_item_1}
              </li>
              <li>
                <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                {about.list_item_2}
              </li>
              <li>
                <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                {about.list_item_3}
              </li>
            </ul>
          </div>
          <div className="about-visual reveal">
            {about.image_url ? (
              <div className="about-image-wrapper">
                <img
                  src={about.image_url}
                  alt="About JaspuraHub"
                  className="about-image"
                />
              </div>
            ) : (
              <div className="about-stats">
                {stats.map((stat) => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
            )}
          </div>
        </div>
        {about.image_url && stats.length > 0 && (
          <div className="about-stats-row reveal">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
