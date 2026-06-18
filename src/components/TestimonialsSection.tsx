import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Testimonial, SectionHeader } from '../lib/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  header: SectionHeader;
}

export default function TestimonialsSection({ testimonials, header }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>

        <div className="testimonial-carousel">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-item${i === current ? ' active' : ''}`}>
              <div className="testimonial-top">
                {t.avatar_url && (
                  <img
                    src={t.avatar_url}
                    alt={t.name}
                    className="testimonial-avatar"
                  />
                )}
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }, (_, si) => (
                    <Star
                      key={si}
                      size={13}
                      fill={si < t.rating ? '#facc15' : 'none'}
                      stroke={si < t.rating ? '#facc15' : '#9ca3af'}
                    />
                  ))}
                </div>
              </div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-meta">
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          ))}

          <div className="testimonial-controls">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
