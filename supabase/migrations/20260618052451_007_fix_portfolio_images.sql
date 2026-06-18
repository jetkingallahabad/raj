/*
# Add images to missing portfolio items
*/

-- Update portfolio items with relevant images
UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600' 
WHERE title LIKE '%Local Service%';

UPDATE portfolio_items SET image_url = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600' 
WHERE title LIKE '%Marketplace%' OR title LIKE '%Amazon%';