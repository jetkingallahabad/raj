/*
# Add map_embed_url to contact_content

1. New Column
- `map_embed_url` (text) - Google Maps embed iframe URL

2. Seed with default map
*/

ALTER TABLE contact_content ADD COLUMN map_embed_url text NOT NULL DEFAULT '';

-- Update with a default map (can be changed from admin)
UPDATE contact_content SET map_embed_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.8765432109876!2d80.94668381544567!3d26.85000078316924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzAwLjAiTiA4MMKwNTYnNDguMSJF!5e0!3m2!1sen!2sin!4v1234567890';