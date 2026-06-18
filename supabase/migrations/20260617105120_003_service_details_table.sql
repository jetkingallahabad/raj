/*
# Add service_details table for detailed service pages

1. New Tables
- `service_details`
  - `id` (uuid, primary key)
  - `service_id` (uuid, foreign key to services.id)
  - `hero_title` (text) - main heading on detail page
  - `hero_subtitle` (text) - subheading
  - `overview` (text) - detailed overview paragraph
  - `feature_1_title` (text) - feature card 1 title
  - `feature_1_desc` (text) - feature card 1 description
  - `feature_2_title` (text) - feature card 2 title
  - `feature_2_desc` (text) - feature card 2 description
  - `feature_3_title` (text) - feature card 3 title
  - `feature_3_desc` (text) - feature card 3 description
  - `feature_4_title` (text) - feature card 4 title
  - `feature_4_desc` (text) - feature card 4 description
  - `process_title` (text) - how we work section title
  - `process_step_1` (text) - process step 1
  - `process_step_2` (text) - process step 2
  - `process_step_3` (text) - process step 3
  - `process_step_4` (text) - process step 4
  - `cta_text` (text) - call to action text
  - `created_at` (timestamp)

2. Security
- Enable RLS on service_details
- Public read, authenticated write
*/

CREATE TABLE service_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid UNIQUE NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  overview text NOT NULL DEFAULT '',
  feature_1_title text NOT NULL DEFAULT '',
  feature_1_desc text NOT NULL DEFAULT '',
  feature_2_title text NOT NULL DEFAULT '',
  feature_2_desc text NOT NULL DEFAULT '',
  feature_3_title text NOT NULL DEFAULT '',
  feature_3_desc text NOT NULL DEFAULT '',
  feature_4_title text NOT NULL DEFAULT '',
  feature_4_desc text NOT NULL DEFAULT '',
  process_title text NOT NULL DEFAULT 'How We Work',
  process_step_1 text NOT NULL DEFAULT '',
  process_step_2 text NOT NULL DEFAULT '',
  process_step_3 text NOT NULL DEFAULT '',
  process_step_4 text NOT NULL DEFAULT '',
  cta_text text NOT NULL DEFAULT 'Ready to get started? Contact us today for a free consultation.',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_service_details" ON service_details;
CREATE POLICY "read_service_details" ON service_details FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "write_service_details" ON service_details;
CREATE POLICY "write_service_details" ON service_details FOR ALL
  TO authenticated USING (true) WITH CHECK (true);