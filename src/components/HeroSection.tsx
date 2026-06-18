import { ChevronDown } from 'lucide-react';
import type { HeroContent } from '../lib/types';

interface HeroSectionProps {
  hero: HeroContent;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section id="hero" className="hero">
      <div
        className="hero-bg"
        style={hero.background_image ? {
          backgroundImage: `url(${hero.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-text reveal">
          <h1>
            {hero.title.split('JaspuraHub')[0]}
            <span>JaspuraHub</span>
            {hero.title.includes('JaspuraHub') ? hero.title.split('JaspuraHub')[1] : ''}
          </h1>
          <p>{hero.subtitle}</p>
          <div className="hero-cta">
            <a href="#contact" className="primary-btn glow-btn">
              {hero.primary_btn_text}
            </a>
            <a href="#services" className="secondary-btn">
              {hero.secondary_btn_text}
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <span className="meta-number">{hero.meta_1_number}</span>
              <span className="meta-label">{hero.meta_1_label}</span>
            </div>
            <div>
              <span className="meta-number">{hero.meta_2_number}</span>
              <span className="meta-label">{hero.meta_2_label}</span>
            </div>
            <div>
              <span className="meta-number">{hero.meta_3_number}</span>
              <span className="meta-label">{hero.meta_3_label}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="floating-card card-1">
            <i className="fas fa-chart-line" />
            <div>
              <p>Traffic Growth</p>
              <span>+150%</span>
            </div>
          </div>
          <div className="floating-card card-2">
            <i className="fas fa-bullseye" />
            <div>
              <p>Qualified Leads</p>
              <span>+500</span>
            </div>
          </div>
          <div className="hero-main-graphic">
            <div className="circle circle-lg" />
            <div className="circle circle-md" />
            <div className="circle circle-sm" />
            <div className="hero-dashboard">
              <div className="dash-header">
                <span>Campaign Performance</span>
                <span className="online-pill">Live</span>
              </div>
              <div className="dash-body">
                <div className="dash-stat">
                  <p>Conversion Rate</p>
                  <h4>7.8%</h4>
                  <span className="up">
                    <i className="fas fa-arrow-up" /> 32%
                  </span>
                </div>
                <div className="dash-stat">
                  <p>Ad Spend ROAS</p>
                  <h4>4.3x</h4>
                  <span className="up">
                    <i className="fas fa-arrow-up" /> 54%
                  </span>
                </div>
              </div>
              <div className="dash-bar-chart">
                <span style={{ height: '40%' }} />
                <span style={{ height: '60%' }} />
                <span style={{ height: '80%' }} />
                <span style={{ height: '55%' }} />
                <span style={{ height: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
