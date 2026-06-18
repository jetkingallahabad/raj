import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { loadSiteData } from './lib/data';
import type { SiteData, Service, ServiceDetail } from './lib/types';
import { useReveal } from './components/useReveal';

import Preloader from './components/Preloader';
import ScrollTop from './components/ScrollTop';
import LiveChat from './components/LiveChat';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ServiceDetailPage from './components/ServiceDetailPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

type View = 'site' | 'admin-login' | 'admin' | 'service-detail';

function App() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('site');
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    loadSiteData().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && view === 'admin-login') {
        setView('admin');
      }
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && view === 'admin') {
        setView('admin-login');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [view]);

  const handleAdminClick = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setView('admin');
      } else {
        setView('admin-login');
      }
    });
  };

  const handleLogin = () => setView('admin');
  const handleLogout = () => setView('site');
  const handleBackToSite = () => {
    setView('site');
    loadSiteData().then(setData);
  };

  const handleLearnMore = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setView('service-detail');
  };

  const handleServiceBack = () => {
    setSelectedServiceId(null);
    setView('site');
  };

  const handleContactClick = () => {
    setSelectedServiceId(null);
    setView('site');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  };

  if (view === 'admin-login' && authChecked) {
    return <AdminLogin onLogin={handleLogin} onBack={handleBackToSite} />;
  }

  if (view === 'admin' && authChecked) {
    return <AdminPanel onLogout={handleLogout} onBackToSite={handleBackToSite} />;
  }

  if (view === 'service-detail' && data && selectedServiceId) {
    const service = data.services.find((s) => s.id === selectedServiceId);
    const detail = data.serviceDetails.find((d) => d.service_id === selectedServiceId);
    if (service && detail) {
      return (
        <>
          <ScrollTop />
          <LiveChat />
          <ServiceDetailPage
            service={service}
            detail={detail}
            siteData={data}
            onBack={handleServiceBack}
            onContactClick={handleContactClick}
          />
        </>
      );
    }
  }

  if (loading || !data) {
    return <Preloader />;
  }

  return (
    <>
      <Preloader />
      <ScrollTop />
      <LiveChat />
      <SiteContent data={data} onAdminClick={handleAdminClick} onLearnMore={handleLearnMore} />
    </>
  );
}

function SiteContent({ data, onAdminClick, onLearnMore }: { data: SiteData; onAdminClick: () => void; onLearnMore: (serviceId: string) => void }) {
  const revealRef = useReveal();

  const s = data.settings;
  const hero = data.hero;
  const about = data.about;
  const sectionHeaders = data.sectionHeaders;

  return (
    <div ref={revealRef}>
      <Header
        navLinks={data.navLinks}
        siteName={s.site_name || 'JaspuraHub'}
        tagline={s.site_tagline || 'Digital Marketing Agency'}
        logoMark={s.logo_mark || 'JH'}
      />

      {hero && <HeroSection hero={hero} />}

      {about && <AboutSection about={about} stats={data.aboutStats} />}

      {sectionHeaders.services && (
        <ServicesSection services={data.services} header={sectionHeaders.services} onLearnMore={onLearnMore} />
      )}

      {sectionHeaders.why_us && (
        <WhyUsSection items={data.whyUsItems} header={sectionHeaders.why_us} />
      )}

      {sectionHeaders.portfolio && (
        <PortfolioSection items={data.portfolioItems} header={sectionHeaders.portfolio} />
      )}

      {sectionHeaders.testimonials && (
        <TestimonialsSection testimonials={data.testimonials} header={sectionHeaders.testimonials} />
      )}

      {sectionHeaders.process && (
        <ProcessSection steps={data.processSteps} header={sectionHeaders.process} />
      )}

      {sectionHeaders.contact && data.contact && (
        <ContactSection
          contact={data.contact}
          socialLinks={data.socialLinks}
          header={sectionHeaders.contact}
          services={data.services}
        />
      )}

      <Footer
        siteName={s.site_name || 'JaspuraHub'}
        tagline={s.site_tagline || 'Digital Marketing Agency'}
        logoMark={s.logo_mark || 'JH'}
        description={s.footer_description || ''}
        navLinks={data.navLinks}
        services={data.services}
        socialLinks={data.socialLinks}
      />

      {/* Admin access button */}
      <button
        onClick={onAdminClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '999px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          color: 'rgba(148, 163, 184, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          zIndex: 1100,
          backdropFilter: 'blur(10px)',
          transition: 'color 0.25s, border-color 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(148, 163, 184, 0.4)';
          e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
        }}
        title="Admin Panel"
      >
        <i className="fas fa-lock" />
      </button>
    </div>
  );
}

export default App;
