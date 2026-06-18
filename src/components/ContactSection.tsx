import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ContactContent, SocialLink, SectionHeader } from '../lib/types';

interface ContactSectionProps {
  contact: ContactContent;
  socialLinks: SocialLink[];
  header: SectionHeader;
  services: { title: string }[];
}

export default function ContactSection({ contact, socialLinks, header, services }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      message: form.message,
    });
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    await supabase.from('newsletter_subscriptions').insert({ email: newsletterEmail });
    setNewsletterDone(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterDone(false), 4000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-form-wrapper reveal">
            {submitted && (
              <div className="auth-error" style={{ background: 'rgba(22,163,74,0.1)', borderColor: 'rgba(22,163,74,0.3)', color: '#4ade80' }}>
                Thank you! Your inquiry has been received. We will get back to you shortly.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your goals, timelines, and challenges."
                />
              </div>
              <button type="submit" className="primary-btn glow-btn">
                <Send size={14} /> Submit Inquiry
              </button>
              <p className="form-note">We typically respond within one business day.</p>
            </form>
          </div>

          <div className="contact-info reveal">
            <div className="info-block">
              <h3>Contact Information</h3>
              <p>
                <Phone size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {contact.phone}
              </p>
              <p>
                <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {contact.email}
              </p>
              <p>
                <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {contact.address}
              </p>
            </div>
            <div className="info-block">
              <h3>Connect With Us</h3>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.url} aria-label={link.icon}>
                    <i className={link.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div className="info-block">
              <h3>Our Location</h3>
              {contact.map_embed_url ? (
                <div className="map-container">
                  <iframe
                    src={contact.map_embed_url}
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                  />
                </div>
              ) : (
                <div className="map-placeholder">
                  <p>Google Maps embed will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
