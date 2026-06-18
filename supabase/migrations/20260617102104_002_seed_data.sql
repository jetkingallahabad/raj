-- Site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'JaspuraHub'),
  ('site_tagline', 'Digital Marketing Agency'),
  ('logo_mark', 'JH'),
  ('footer_description', 'JaspuraHub partners with ambitious brands to design, launch, and scale digital ecosystems that generate measurable growth—not just impressions.'),
  ('copyright_year', '2024');

-- Hero content
INSERT INTO hero_content (title, subtitle, primary_btn_text, secondary_btn_text, meta_1_number, meta_1_label, meta_2_number, meta_2_label, meta_3_number, meta_3_label) VALUES
  ('Transform Your Digital Presence with JaspuraHub', 'Expert digital marketing services that drive real growth, boost your visibility, and turn clicks into loyal customers.', 'Get Started', 'View Services', '5+', 'Years of Experience', '120+', 'Brands Scaled', '3X', 'Average ROI');

-- About content
INSERT INTO about_content (section_title, section_subtitle, heading, paragraph_1, paragraph_2, list_item_1, list_item_2, list_item_3) VALUES
  ('Who We Are', 'JaspuraHub is a premier digital marketing agency based in India, specializing in comprehensive digital solutions that help businesses thrive online. Our team mixes creativity with data-driven strategies to deliver measurable results.', 'We don''t guess. We strategize, execute, and optimize.', 'From startups to established brands, JaspuraHub partners with growth-focused businesses to build powerful digital ecosystems. Every campaign is tailored—no generic templates, no copy-paste approaches.', 'Whether you need a conversion-focused website, profitable ad campaigns, or a full-funnel strategy that aligns with your sales process, we help you win online while you focus on running your business.', 'Full-funnel digital marketing under one roof', 'Transparent communication and reporting', 'Strategies aligned with your real business goals');

-- About stats
INSERT INTO about_stats (number, label, sort_order) VALUES
  ('5', 'Years in Business', 1),
  ('120', 'Clients Served', 2),
  ('350', 'Projects Completed', 3),
  ('15', 'Industries Covered', 4);

-- Services
INSERT INTO services (icon, title, description, bullet_1, bullet_2, bullet_3, category, sort_order) VALUES
  ('fas fa-laptop-code', 'Website Development', 'Custom, responsive websites built with modern technologies that load fast, look world-class, and convert visitors into customers.', 'Conversion-focused layouts tailored to your offer', 'Mobile-first, SEO-friendly architecture', 'Integrated analytics, forms, and automation', 'branding performance', 1),
  ('fas fa-bullhorn', 'Online Ads & Media Buying', 'Strategic ad campaigns on Google, Facebook, Instagram, and more—engineered to maximize every rupee of your ad spend.', 'Full-funnel ad strategies and audience research', 'Creative testing and landing page optimization', 'Continuous budget allocation based on performance', 'performance', 2),
  ('fas fa-magnifying-glass-chart', 'Search Engine Optimization (SEO)', 'Boost your rankings, dominate your niche, and drive sustainable organic traffic with white-hat SEO strategies.', 'Technical audits and on-page optimization', 'Strategic content and keyword planning', 'Authority building through ethical link strategies', 'strategy performance', 3),
  ('fas fa-cart-shopping', 'E-commerce Account Management', 'Complete management of your Amazon, Flipkart, and other marketplaces to increase visibility, orders, and profitability.', 'Catalog setup, listing optimization, and A+ content', 'Pricing, promotions, and rating improvement', 'Inventory coordination and performance monitoring', 'performance', 4),
  ('fas fa-map-location-dot', 'Google My Business Optimization', 'Put your local presence on the map and capture customers searching in your area with an optimized GMB profile.', 'Profile optimization and keyword-rich descriptions', 'Review strategy and response management', 'Local content and posting calendar', 'strategy branding', 5),
  ('fas fa-hashtag', 'Social Media Marketing', 'Engage your audience, build brand loyalty, and stay top-of-mind across Facebook, Instagram, LinkedIn, and more.', 'Content calendars and creative production', 'Community management and engagement', 'Social media ad campaigns and remarketing', 'branding', 6),
  ('fas fa-pen-nib', 'Content Marketing', 'Create compelling content that attracts, educates, and converts your ideal customers at every stage of their journey.', 'Blogs, landing copy, email sequences, and more', 'Topic research aligned with SEO and brand voice', 'Content funnels that nurture and convert', 'strategy branding', 7),
  ('fas fa-chart-pie', 'Analytics & Reporting', 'Track performance with detailed analytics and transparent reporting that links marketing activity to real business outcomes.', 'Custom dashboards for decision-makers', 'KPI tracking across campaigns and channels', 'Actionable insights, not just data dumps', 'strategy performance', 8);

-- Why us items
INSERT INTO why_us_items (icon, title, description, sort_order) VALUES
  ('fas fa-database', 'Data-Driven Strategies', 'Every campaign is grounded in research, tracking, and continuous testing to uncover what truly works for your brand.', 1),
  ('fas fa-users-gear', 'Experienced Team', 'Strategists, media buyers, designers, and copywriters collaborate to craft cohesive, high-performing campaigns.', 2),
  ('fas fa-file-invoice-dollar', 'Transparent Reporting', 'Clear dashboards and monthly reviews ensure you know exactly where your money goes and what it returns.', 3),
  ('fas fa-puzzle-piece', 'Custom Solutions', 'No one-size-fits-all packages—only tailored strategies aligned with your goals, budgets, and timelines.', 4),
  ('fas fa-trophy', 'Proven Results', 'From e-commerce to local businesses, we have a track record of scaling revenue while lowering acquisition costs.', 5),
  ('fas fa-headset', '24/7 Support', 'Dedicated account managers and support channels ensure your campaigns are monitored and optimized continuously.', 6);

-- Portfolio items
INSERT INTO portfolio_items (gradient_from, gradient_to, title, description, bullet_1, bullet_2, bullet_3, sort_order) VALUES
  ('#22d3ee', '#6366f1', 'D2C Skincare Brand', 'Full-funnel performance marketing across Meta Ads and Google Search.', 'Increased traffic by 150%', 'Generated 500+ qualified leads in 90 days', 'Achieved 3.8x blended ROAS', 1),
  ('#f97316', '#ef4444', 'Local Service Business (Lucknow)', 'Website redesign, SEO, and Google My Business optimization.', 'Top 3 ranking for 12+ local keywords', 'Calls from Google Maps up by 210%', 'Lead cost reduced by 47%', 2),
  ('#4ade80', '#0ea5e9', 'Marketplace Seller (Amazon & Flipkart)', 'E-commerce account management and advertising across major platforms.', 'Order volume increased by 120%', 'Organic rankings improved for 30+ SKUs', 'Ad ACoS reduced from 38% to 21%', 3);

-- Testimonials
INSERT INTO testimonials (quote, name, role, rating, sort_order) VALUES
  ('JaspuraHub rebuilt our entire digital presence—from website to ads. Within three months, our inbound leads doubled and our sales team finally had predictable demand.', 'Rahul Verma', 'Founder, RV Realty Solutions', 5, 1),
  ('Their team understands performance marketing at a deep level. They manage our e-commerce ads and marketplace listings like an in-house growth team.', 'Neha Singh', 'Marketing Head, GlowPure Skincare', 5, 2),
  ('We were invisible online in Lucknow. After JaspuraHub optimized our website and Google My Business, our phone started ringing with real customers every day.', 'Mohammad Ali', 'Owner, Ali Home Services', 5, 3);

-- Process steps
INSERT INTO process_steps (icon, title, description, sort_order) VALUES
  ('fas fa-lightbulb', '1. Discovery & Strategy', 'We dive deep into your business, audience, and goals to build a clear strategy and success roadmap.', 1),
  ('fas fa-rocket', '2. Implementation', 'Our team designs, builds, and launches campaigns, creatives, and assets aligned with your brand.', 2),
  ('fas fa-sliders', '3. Optimization', 'We continuously test, refine, and improve performance to squeeze more results from every channel.', 3),
  ('fas fa-chart-line', '4. Results & Reporting', 'Clean reports and strategy sessions connect the data back to your pipeline, profit, and long-term growth.', 4);

-- Contact content
INSERT INTO contact_content (phone, email, address) VALUES
  ('+91-87872-29617', 'rajesh@jaspurahub.com', 'Jaspura, Banda, Uttar Pradesh, India');

-- Social links
INSERT INTO social_links (icon, url, sort_order) VALUES
  ('fab fa-facebook-f', '#', 1),
  ('fab fa-instagram', '#', 2),
  ('fab fa-linkedin-in', '#', 3),
  ('fab fa-x-twitter', '#', 4);

-- Nav links
INSERT INTO nav_links (label, href, sort_order) VALUES
  ('Home', '#hero', 1),
  ('About', '#about', 2),
  ('Services', '#services', 3),
  ('Portfolio', '#portfolio', 4),
  ('Process', '#process', 5),
  ('Contact', '#contact', 6);

-- Section headers
INSERT INTO section_headers (section_key, title, subtitle) VALUES
  ('services', 'Services That Drive Real Growth', 'JaspuraHub covers every critical touchpoint of your digital journey—from building your online foundation to scaling traffic, conversions, and lifetime value.'),
  ('why_us', 'Why Businesses Trust JaspuraHub', 'Beyond vanity metrics, we focus on the numbers that actually matter—revenue, profit, and long-term brand equity.'),
  ('portfolio', 'Selected Case Studies', 'A snapshot of how we help brands in India and beyond turn digital channels into reliable growth engines.'),
  ('testimonials', 'What Our Clients Say', 'Brands across industries rely on JaspuraHub to keep their marketing sharp, accountable, and growth-focused.'),
  ('process', 'Our 4-Step Process', 'A simple, transparent process that keeps you in control while we handle the execution.'),
  ('contact', 'Ready to Grow Your Business?', 'Tell us about your brand, and we''ll share a tailored growth plan—no fluff, just clear next steps.');