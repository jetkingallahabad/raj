import { useEffect } from 'react';
import { ArrowLeft, CheckCircle, Star, ArrowRight } from 'lucide-react';
import type { Service, ServiceDetail, SiteData } from '../lib/types';

interface ServiceDetailPageProps {
  service: Service;
  detail: ServiceDetail;
  siteData: SiteData;
  onBack: () => void;
  onContactClick: () => void;
}

export default function ServiceDetailPage({ service, detail, siteData, onBack, onContactClick }: ServiceDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const s = siteData.settings;
  const features = [
    { title: detail.feature_1_title, desc: detail.feature_1_desc },
    { title: detail.feature_2_title, desc: detail.feature_2_desc },
    { title: detail.feature_3_title, desc: detail.feature_3_desc },
    { title: detail.feature_4_title, desc: detail.feature_4_desc },
  ].filter((f) => f.title);

  const steps = [
    detail.process_step_1,
    detail.process_step_2,
    detail.process_step_3,
    detail.process_step_4,
  ].filter(Boolean);

  const heroImage = detail.hero_image || service.image_url;

  return (
    <div className="sdp-root">
      {/* Top Nav */}
      <nav className="sdp-nav">
        <div className="container sdp-nav-inner">
          <img src="/logo-removebg-preview.png" alt={s.site_name || 'JaspuraHub'} className="sdp-logo" />
          <button className="sdp-back-btn" onClick={onBack}>
            <ArrowLeft size={14} />
            All Services
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="sdp-hero" style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}>
        <div className="sdp-hero-overlay" />
        <div className="container sdp-hero-content">
          <div className="sdp-hero-badge">
            <i className={service.icon} />
            <span>{service.category.split(' ')[0].charAt(0).toUpperCase() + service.category.split(' ')[0].slice(1)}</span>
          </div>
          <h1 className="sdp-hero-title">{detail.hero_title}</h1>
          <p className="sdp-hero-sub">{detail.hero_subtitle}</p>
          <div className="sdp-hero-actions">
            <button className="primary-btn glow-btn" onClick={onContactClick}>
              Get Free Consultation <ArrowRight size={14} />
            </button>
            <button className="sdp-ghost-btn" onClick={onBack}>
              View All Services
            </button>
          </div>
          <div className="sdp-hero-stats">
            <div className="sdp-hero-stat">
              <span className="sdp-stat-num">100+</span>
              <span className="sdp-stat-lbl">Clients Served</span>
            </div>
            <div className="sdp-hero-stat-divider" />
            <div className="sdp-hero-stat">
              <span className="sdp-stat-num">4.9</span>
              <span className="sdp-stat-lbl">
                <Star size={11} fill="#facc15" stroke="none" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                Avg. Rating
              </span>
            </div>
            <div className="sdp-hero-stat-divider" />
            <div className="sdp-hero-stat">
              <span className="sdp-stat-num">3x</span>
              <span className="sdp-stat-lbl">Avg. ROI Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="sdp-overview">
        <div className="container sdp-overview-grid">
          <div className="sdp-overview-text">
            <span className="sdp-section-tag">Overview</span>
            <h2 className="sdp-section-heading">What is {detail.hero_title}?</h2>
            <p className="sdp-overview-body">{detail.overview}</p>
            <ul className="sdp-overview-bullets">
              {[service.bullet_1, service.bullet_2, service.bullet_3].filter(Boolean).map((b, i) => (
                <li key={i}>
                  <CheckCircle size={16} className="sdp-check" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {heroImage && (
            <div className="sdp-overview-img-wrap">
              <img src={heroImage} alt={detail.hero_title} className="sdp-overview-img" />
              <div className="sdp-overview-badge">
                <i className={service.icon} style={{ fontSize: 20 }} />
                <span>{detail.hero_title}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="sdp-features">
          <div className="container">
            <div className="sdp-section-header">
              <span className="sdp-section-tag">Benefits</span>
              <h2 className="sdp-section-heading">What You Get</h2>
              <p className="sdp-section-sub">Everything included in our {detail.hero_title} service</p>
            </div>
            <div className="sdp-features-grid">
              {features.map((f, i) => (
                <div key={i} className="sdp-feature-card">
                  <div className="sdp-feature-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="sdp-feature-title">{f.title}</h3>
                  <p className="sdp-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {steps.length > 0 && (
        <section className="sdp-process">
          <div className="container">
            <div className="sdp-section-header">
              <span className="sdp-section-tag">Our Approach</span>
              <h2 className="sdp-section-heading">{detail.process_title}</h2>
              <p className="sdp-section-sub">A proven, results-driven process</p>
            </div>
            <div className="sdp-steps">
              {steps.map((step, i) => (
                <div key={i} className="sdp-step">
                  <div className="sdp-step-num">
                    <span>{i + 1}</span>
                  </div>
                  <div className="sdp-step-connector" />
                  <div className="sdp-step-body">
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="sdp-cta">
        {heroImage && (
          <div className="sdp-cta-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        )}
        <div className="sdp-cta-overlay" />
        <div className="container sdp-cta-inner">
          <span className="sdp-section-tag sdp-tag-light">Ready to Grow?</span>
          <h2 className="sdp-cta-heading">{detail.cta_text}</h2>
          <div className="sdp-cta-btns">
            <button className="primary-btn glow-btn" onClick={onContactClick}>
              Get a Free Consultation <ArrowRight size={14} />
            </button>
            <button className="sdp-ghost-btn" onClick={onBack}>
              Explore Other Services
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {s.site_name || 'JaspuraHub'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
