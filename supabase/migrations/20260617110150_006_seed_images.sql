/*
# Seed image URLs across all tables

1. Updates hero_content with a digital marketing background image
2. Updates about_content with a team/office image
3. Updates each service with a relevant Pexels image
4. Updates portfolio_items with relevant project images
5. Updates testimonials with avatar images
6. Updates service_details with hero images

All images are from Pexels (stock photos, free to use).
*/

-- Hero background
UPDATE hero_content SET background_image = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920';

-- About section
UPDATE about_content SET image_url = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800';

-- Service images
UPDATE services SET image_url = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Website Development';
UPDATE services SET image_url = 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Online Ads & Media Buying';
UPDATE services SET image_url = 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Search Engine Optimization (SEO)';
UPDATE services SET image_url = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'E-commerce Account Management';
UPDATE services SET image_url = 'https://images.pexels.com/photos/1551446/pexels-photo-1551446.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Google My Business Optimization';
UPDATE services SET image_url = 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Social Media Marketing';
UPDATE services SET image_url = 'https://images.pexels.com/photos/768946/pexels-photo-768946.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Content Marketing';
UPDATE services SET image_url = 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title = 'Analytics & Reporting';

-- Portfolio images
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%Website%';
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%E-commerce%';
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%SEO%';
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/1551446/pexels-photo-1551446.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%Google%';
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%Social%';
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE title LIKE '%Brand%';

-- Testimonial avatars (diverse professional headshots)
UPDATE testimonials SET avatar_url = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' WHERE name LIKE '%Rajesh%';
UPDATE testimonials SET avatar_url = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' WHERE name LIKE '%Priya%';
UPDATE testimonials SET avatar_url = 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150' WHERE name LIKE '%Amit%';
UPDATE testimonials SET avatar_url = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' WHERE name LIKE '%Sneha%';
UPDATE testimonials SET avatar_url = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150' WHERE name LIKE '%Vikram%';

-- Service detail hero images (wider format)
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Website%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Online Ads%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%SEO%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%E-commerce%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/1551446/pexels-photo-1551446.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Google%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Social%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/768946/pexels-photo-768946.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Content%';
UPDATE service_details SET hero_image = 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200' WHERE hero_title LIKE '%Analytics%';