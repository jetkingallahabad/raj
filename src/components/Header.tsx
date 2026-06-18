import { useState, useEffect } from 'react';
import type { NavLink } from '../lib/types';

interface HeaderProps {
  navLinks: NavLink[];
  siteName: string;
  tagline: string;
  logoMark: string;
}

export default function Header({ navLinks, siteName, tagline, logoMark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header id="header" className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <img
            src="/logo-removebg-preview.png"
            alt={siteName}
            className="header-logo-img"
          />
        </div>
        <nav className="nav">
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="primary-btn nav-cta" onClick={(e) => handleClick(e, '#contact')}>
            Get Proposal
          </a>
          <button
            className={`mobile-menu-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
