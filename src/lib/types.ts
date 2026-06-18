export interface SiteSettings {
  id: string;
  key: string;
  value: string;
}

export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  primary_btn_text: string;
  secondary_btn_text: string;
  meta_1_number: string;
  meta_1_label: string;
  meta_2_number: string;
  meta_2_label: string;
  meta_3_number: string;
  meta_3_label: string;
  background_image: string;
}

export interface AboutContent {
  id: string;
  section_title: string;
  section_subtitle: string;
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  list_item_1: string;
  list_item_2: string;
  list_item_3: string;
  image_url: string;
}

export interface AboutStat {
  id: string;
  number: string;
  label: string;
  sort_order: number;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  bullet_1: string;
  bullet_2: string;
  bullet_3: string;
  category: string;
  sort_order: number;
  image_url: string;
}

export interface WhyUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface PortfolioItem {
  id: string;
  gradient_from: string;
  gradient_to: string;
  title: string;
  description: string;
  bullet_1: string;
  bullet_2: string;
  bullet_3: string;
  sort_order: number;
  image_url: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  sort_order: number;
  avatar_url: string;
}

export interface ProcessStep {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ContactContent {
  id: string;
  phone: string;
  email: string;
  address: string;
  map_embed_url: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  url: string;
  sort_order: number;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  sort_order: number;
}

export interface SectionHeader {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
}

export interface ServiceDetail {
  id: string;
  service_id: string;
  hero_title: string;
  hero_subtitle: string;
  overview: string;
  feature_1_title: string;
  feature_1_desc: string;
  feature_2_title: string;
  feature_2_desc: string;
  feature_3_title: string;
  feature_3_desc: string;
  feature_4_title: string;
  feature_4_desc: string;
  process_title: string;
  process_step_1: string;
  process_step_2: string;
  process_step_3: string;
  process_step_4: string;
  cta_text: string;
  hero_image: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

export interface SiteData {
  settings: Record<string, string>;
  hero: HeroContent | null;
  about: AboutContent | null;
  aboutStats: AboutStat[];
  services: Service[];
  serviceDetails: ServiceDetail[];
  whyUsItems: WhyUsItem[];
  portfolioItems: PortfolioItem[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  contact: ContactContent | null;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
  sectionHeaders: Record<string, SectionHeader>;
}
