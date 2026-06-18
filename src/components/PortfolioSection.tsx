import type { PortfolioItem, SectionHeader } from '../lib/types';

interface PortfolioSectionProps {
  items: PortfolioItem[];
  header: SectionHeader;
}

export default function PortfolioSection({ items, header }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>
        <div className="portfolio-grid">
          {items.map((item) => (
            <article key={item.id} className="portfolio-card reveal">
              <div
                className="portfolio-img"
                style={item.image_url ? {
                  backgroundImage: `url(${item.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : {
                  backgroundImage: `linear-gradient(135deg, ${item.gradient_from}, ${item.gradient_to})`,
                }}
              />
              <div className="portfolio-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  <li>{item.bullet_1}</li>
                  <li>{item.bullet_2}</li>
                  <li>{item.bullet_3}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
