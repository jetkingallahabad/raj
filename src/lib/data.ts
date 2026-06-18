import { supabase } from './supabase';
import type {
  SiteData,
  SiteSettings,
  HeroContent,
  AboutContent,
  AboutStat,
  Service,
  ServiceDetail,
  WhyUsItem,
  PortfolioItem,
  Testimonial,
  ProcessStep,
  ContactContent,
  SocialLink,
  NavLink,
  SectionHeader,
} from './types';

export async function loadSiteData(): Promise<SiteData> {
  const [
    settingsRes,
    heroRes,
    aboutRes,
    aboutStatsRes,
    servicesRes,
    serviceDetailsRes,
    whyUsRes,
    portfolioRes,
    testimonialsRes,
    processRes,
    contactRes,
    socialRes,
    navRes,
    sectionHeadersRes,
  ] = await Promise.all([
    supabase.from('site_settings').select('*').order('key'),
    supabase.from('hero_content').select('*').limit(1).maybeSingle(),
    supabase.from('about_content').select('*').limit(1).maybeSingle(),
    supabase.from('about_stats').select('*').order('sort_order'),
    supabase.from('services').select('*').order('sort_order'),
    supabase.from('service_details').select('*'),
    supabase.from('why_us_items').select('*').order('sort_order'),
    supabase.from('portfolio_items').select('*').order('sort_order'),
    supabase.from('testimonials').select('*').order('sort_order'),
    supabase.from('process_steps').select('*').order('sort_order'),
    supabase.from('contact_content').select('*').limit(1).maybeSingle(),
    supabase.from('social_links').select('*').order('sort_order'),
    supabase.from('nav_links').select('*').order('sort_order'),
    supabase.from('section_headers').select('*').order('section_key'),
  ]);

  const settings: Record<string, string> = {};
  for (const s of (settingsRes.data as SiteSettings[] | null) ?? []) {
    settings[s.key] = s.value;
  }

  const sectionHeaders: Record<string, SectionHeader> = {};
  for (const h of (sectionHeadersRes.data as SectionHeader[] | null) ?? []) {
    sectionHeaders[h.section_key] = h;
  }

  return {
    settings,
    hero: heroRes.data as HeroContent | null,
    about: aboutRes.data as AboutContent | null,
    aboutStats: (aboutStatsRes.data as AboutStat[] | null) ?? [],
    services: (servicesRes.data as Service[] | null) ?? [],
    serviceDetails: (serviceDetailsRes.data as ServiceDetail[] | null) ?? [],
    whyUsItems: (whyUsRes.data as WhyUsItem[] | null) ?? [],
    portfolioItems: (portfolioRes.data as PortfolioItem[] | null) ?? [],
    testimonials: (testimonialsRes.data as Testimonial[] | null) ?? [],
    processSteps: (processRes.data as ProcessStep[] | null) ?? [],
    contact: contactRes.data as ContactContent | null,
    socialLinks: (socialRes.data as SocialLink[] | null) ?? [],
    navLinks: (navRes.data as NavLink[] | null) ?? [],
    sectionHeaders,
  };
}
