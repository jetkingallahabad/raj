-- Site-wide settings (key-value)
CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Hero section
CREATE TABLE hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  primary_btn_text text NOT NULL DEFAULT 'Get Started',
  secondary_btn_text text NOT NULL DEFAULT 'View Services',
  meta_1_number text NOT NULL DEFAULT '5+',
  meta_1_label text NOT NULL DEFAULT 'Years of Experience',
  meta_2_number text NOT NULL DEFAULT '120+',
  meta_2_label text NOT NULL DEFAULT 'Brands Scaled',
  meta_3_number text NOT NULL DEFAULT '3X',
  meta_3_label text NOT NULL DEFAULT 'Average ROI',
  created_at timestamptz DEFAULT now()
);

-- About section
CREATE TABLE about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text NOT NULL DEFAULT '',
  section_subtitle text NOT NULL DEFAULT '',
  heading text NOT NULL DEFAULT '',
  paragraph_1 text NOT NULL DEFAULT '',
  paragraph_2 text NOT NULL DEFAULT '',
  list_item_1 text NOT NULL DEFAULT '',
  list_item_2 text NOT NULL DEFAULT '',
  list_item_3 text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- About stats (repeatable)
CREATE TABLE about_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL DEFAULT '0',
  label text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Services (repeatable)
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'fas fa-laptop-code',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  bullet_1 text NOT NULL DEFAULT '',
  bullet_2 text NOT NULL DEFAULT '',
  bullet_3 text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'branding performance',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Why us items (repeatable)
CREATE TABLE why_us_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'fas fa-database',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Portfolio items (repeatable)
CREATE TABLE portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gradient_from text NOT NULL DEFAULT '#22d3ee',
  gradient_to text NOT NULL DEFAULT '#6366f1',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  bullet_1 text NOT NULL DEFAULT '',
  bullet_2 text NOT NULL DEFAULT '',
  bullet_3 text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Testimonials (repeatable)
CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  rating smallint NOT NULL DEFAULT 5,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Process steps (repeatable)
CREATE TABLE process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'fas fa-lightbulb',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Contact info
CREATE TABLE contact_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Social links (repeatable)
CREATE TABLE social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'fab fa-facebook-f',
  url text NOT NULL DEFAULT '#',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Nav links (repeatable)
CREATE TABLE nav_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  href text NOT NULL DEFAULT '#',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Section headers
CREATE TABLE section_headers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_us_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_headers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables
CREATE POLICY "read_site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_hero_content" ON hero_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_about_content" ON about_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_about_stats" ON about_stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_services" ON services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_why_us_items" ON why_us_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_portfolio_items" ON portfolio_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_process_steps" ON process_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_contact_content" ON contact_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_social_links" ON social_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_nav_links" ON nav_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_section_headers" ON section_headers FOR SELECT TO anon, authenticated USING (true);

-- Authenticated write policies for content tables
CREATE POLICY "write_site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_hero_content" ON hero_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_about_content" ON about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_about_stats" ON about_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_why_us_items" ON why_us_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_portfolio_items" ON portfolio_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_process_steps" ON process_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_contact_content" ON contact_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_social_links" ON social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_nav_links" ON nav_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "write_section_headers" ON section_headers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact submissions: anyone can insert, only authenticated can read
CREATE POLICY "insert_contact_submissions" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "read_contact_submissions" ON contact_submissions FOR SELECT TO authenticated USING (true);

-- Newsletter: anyone can insert, only authenticated can read
CREATE POLICY "insert_newsletter" ON newsletter_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "read_newsletter" ON newsletter_subscriptions FOR SELECT TO authenticated USING (true);