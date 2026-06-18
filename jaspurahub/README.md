# JaspuraHub WordPress Theme v2.0

## Installation

1. Download this theme folder
2. Go to WordPress Admin > Appearance > Themes
3. Click "Add New" then "Upload Theme"
4. Select the theme ZIP file and click "Install Now"
5. Click "Activate"

## Features

✓ Fully Responsive Design
✓ Custom Logo Support
✓ Custom Menus (Primary + Footer)
✓ Custom Post Types:
  - Services
  - Portfolio
  - Testimonials
✓ Featured Images Support
✓ Clean, Simple Code
✓ SEO Friendly
✓ Fast Loading

## Quick Setup

### 1. Set Home Page
- Go to Settings > Reading
- Select "A static page"
- Create a new page called "Home"
- Set it as your Homepage

### 2. Create Menus
- Go to Appearance > Menus
- Create a new menu called "Main Menu"
- Add your pages/links
- Check "Display location" for Primary Menu
- Do the same for Footer Menu (optional)

### 3. Upload Logo
- Go to Appearance > Customize
- Click "Site Identity"
- Upload your logo

### 4. Create Content

#### Create Services:
```
Services > Add New
- Title: Service Name
- Content: Description
- Featured Image: Upload image
- Publish
```

#### Create Portfolio:
```
Portfolio > Add New
- Title: Project Name
- Content: Project Description
- Featured Image: Upload image
- Publish
```

#### Create Testimonials:
```
Testimonials > Add New
- Title: Client Name
- Content: Testimonial Text
- Featured Image: Client Photo
- Publish
```

## Display Content on Home

Add this shortcode or code to your Home page to display content:

### Display Services:
```php
<?php
$services = jaspurahub_get_services( 3 );
if ( $services ) :
    echo '<div class="posts-wrapper">';
    foreach ( $services as $service ) :
        echo '<article class="post">';
        if ( has_post_thumbnail( $service->ID ) ) :
            echo '<div class="post-thumbnail">' . get_the_post_thumbnail( $service->ID, 'jaspurahub-medium' ) . '</div>';
        endif;
        echo '<h3><a href="' . get_permalink( $service->ID ) . '">' . $service->post_title . '</a></h3>';
        echo '<p>' . wp_trim_words( $service->post_content, 20 ) . '</p>';
        echo '<a href="' . get_permalink( $service->ID ) . '" class="btn">Learn More</a>';
        echo '</article>';
    endforeach;
    echo '</div>';
endif;
?>
```

## Recommended Plugins

- **Yoast SEO** - SEO Optimization
- **WP Forms Lite** - Contact Forms
- **WP Super Cache** - Performance
- **Google Site Kit** - Analytics
- **Akismet Anti-Spam** - Spam Protection

## Theme Customization

The theme is built with:
- HTML5
- CSS3
- Vanilla JavaScript
- WordPress Standards

To customize, edit the files in the theme folder.

## File Structure

```
jaspurahub/
├── style.css (Main stylesheet)
├── functions.php (Theme functions)
├── index.php (Main template)
├── header.php (Header)
├── footer.php (Footer)
├── page.php (Page template)
├── single.php (Single post)
├── archive.php (Archive pages)
├── 404.php (Error page)
├── assets/
│   └── js/main.js (Main JavaScript)
└── README.md (This file)
```

## Support

For issues or questions, check:
1. WordPress documentation
2. Theme code comments
3. Your hosting provider

## License

GPL v2 or later
