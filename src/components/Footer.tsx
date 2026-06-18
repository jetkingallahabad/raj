import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { NavLink, SocialLink, Service } from '../lib/types';

interface FooterProps {
  siteName: string;
  tagline: string;
  logoMark: string;
  description: string;
  navLinks: NavLink[];
  services: Service[];
  socialLinks: SocialLink[];
}

export default function Footer({ siteName, description, navLinks, services, socialLinks }: FooterProps) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await supabase.from('newsletter_subscriptions').insert({ email });
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  };

  const year = new Date().getFullYear();

  const quickLinks = navLinks.filter((l) => ['Home', 'About', 'Services', 'Portfolio', 'Contact'].includes(l.label));
  const coreServices = services.slice(0, 5);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="footer-logo-wrap">
            <img
              src="/logo-removebg-preview.png"
              alt={siteName}
              className="footer-logo-img"
            />
          </div>
          <p>{description}</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Core Services</h4>
          <ul>
            {coreServices.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Get insights and growth frameworks directly in your inbox.</p>
          {done && (
            <p style={{ color: '#4ade80', fontSize: '12px', marginBottom: '6px' }}>Subscribed!</p>
          )}
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              <Send size={14} />
            </button>
          </form>
          {socialLinks.length > 0 && (
            <div className="footer-social">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} aria-label={link.icon} className="footer-social-link">
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} {siteName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
