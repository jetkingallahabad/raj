import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard,
  Type,
  Image,
  Briefcase,
  Award,
  Star,
  GitBranch,
  Phone,
  Share2,
  Navigation,
  Heading,
  Mail,
  LogOut,
  ArrowLeft,
  FileText,
} from 'lucide-react';

export type AdminPage =
  | 'dashboard'
  | 'site-settings'
  | 'hero'
  | 'about'
  | 'services'
  | 'service-details'
  | 'why-us'
  | 'portfolio'
  | 'testimonials'
  | 'process'
  | 'contact'
  | 'social-links'
  | 'nav-links'
  | 'section-headers'
  | 'submissions';

const NAV_ITEMS: { page: AdminPage; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { page: 'site-settings', label: 'Site Settings', icon: <Type size={16} /> },
  { page: 'hero', label: 'Hero Section', icon: <Image size={16} /> },
  { page: 'about', label: 'About Section', icon: <Award size={16} /> },
  { page: 'services', label: 'Services', icon: <Briefcase size={16} /> },
  { page: 'service-details', label: 'Service Detail Pages', icon: <FileText size={16} /> },
  { page: 'why-us', label: 'Why Choose Us', icon: <Star size={16} /> },
  { page: 'portfolio', label: 'Portfolio', icon: <Image size={16} /> },
  { page: 'testimonials', label: 'Testimonials', icon: <Star size={16} /> },
  { page: 'process', label: 'Process Steps', icon: <GitBranch size={16} /> },
  { page: 'contact', label: 'Contact Info', icon: <Phone size={16} /> },
  { page: 'social-links', label: 'Social Links', icon: <Share2 size={16} /> },
  { page: 'nav-links', label: 'Navigation', icon: <Navigation size={16} /> },
  { page: 'section-headers', label: 'Section Headers', icon: <Heading size={16} /> },
  { page: 'submissions', label: 'Submissions', icon: <Mail size={16} /> },
];

interface AdminLayoutProps {
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
  onLogout: () => void;
  onBackToSite: () => void;
  children: React.ReactNode;
}

export default function AdminLayout({ currentPage, onPageChange, onLogout, onBackToSite, children }: AdminLayoutProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">JH</span>
          <span className="logo-text">
            Admin Panel
            <small>Content Management</small>
          </span>
        </div>
        <nav>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.page}
              href="#"
              className={currentPage === item.page ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item.page);
              }}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToSite();
            }}
            style={{ marginTop: '12px', borderTop: '1px solid rgba(148,163,184,0.15)', paddingTop: '12px' }}
          >
            <ArrowLeft size={16} />
            Back to Site
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            style={{ color: '#ef4444' }}
          >
            <LogOut size={16} />
            Logout
          </a>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
