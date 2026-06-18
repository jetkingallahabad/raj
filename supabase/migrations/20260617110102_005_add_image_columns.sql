/*
# Add image_url columns to multiple tables

1. Modified Tables
- `hero_content`: add `background_image` (text) - hero background image
- `about_content`: add `image_url` (text) - about section image
- `services`: add `image_url` (text) - service card image
- `portfolio_items`: add `image_url` (text) - portfolio item image
- `testimonials`: add `avatar_url` (text) - testimonial avatar
- `service_details`: add `hero_image` (text) - service detail page hero image

2. Notes
- All columns are nullable text fields storing Pexels image URLs
- Defaults to empty string so existing rows don't break
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_content' AND column_name = 'background_image') THEN
    ALTER TABLE hero_content ADD COLUMN background_image text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_content' AND column_name = 'image_url') THEN
    ALTER TABLE about_content ADD COLUMN image_url text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image_url') THEN
    ALTER TABLE services ADD COLUMN image_url text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'image_url') THEN
    ALTER TABLE portfolio_items ADD COLUMN image_url text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'avatar_url') THEN
    ALTER TABLE testimonials ADD COLUMN avatar_url text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_details' AND column_name = 'hero_image') THEN
    ALTER TABLE service_details ADD COLUMN hero_image text NOT NULL DEFAULT '';
  END IF;
END $$;