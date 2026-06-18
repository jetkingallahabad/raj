# JaspuraHub WordPress Theme

A professional WordPress theme for digital marketing agencies, converted from the React-based JaspuraHub website.

## Features

### Custom Post Types
- **Services** - Showcase your services with custom icons and colors
- **Portfolio** - Display your portfolio projects with categories
- **Testimonials** - Client testimonials with ratings and author info
- **Team Members** - Team profile pages with social media links

### Theme Features
- Responsive design (mobile-first)
- Tailwind CSS for modern styling
- Font Awesome icons integrated
- Custom Wordpress Customizer settings
- SEO-friendly structure
- Built-in contact form support
- Custom meta boxes for enhanced functionality
- Translation-ready (i18n support)

## Installation

1. Upload the `jaspurahub` folder to `/wp-content/themes/`
2. Activate the theme in WordPress Admin > Appearance > Themes
3. Customize the theme in Appearance > Customize

## Theme Customization

### Customize Site Settings
Go to **Appearance > Customize > JaspuraHub Settings** to customize:
- Site tagline
- Primary color
- Accent color

### Menus
Set up navigation menus in **Appearance > Menus**:
- Primary Menu (main navigation)
- Footer Menu (footer navigation)

### Logo
Upload a custom logo in **Appearance > Customize > Site Identity > Logo**

## Creating Content

### Services
1. Go to **Services** in the admin menu
2. Add a new service
3. Add service details:
   - Icon (Font Awesome class, e.g., `fas fa-rocket`)
   - Color (accent color for the service)
   - Description

### Portfolio
1. Go to **Portfolio** in the admin menu
2. Add a new portfolio item
3. Assign a portfolio category
4. Add featured image

### Testimonials
1. Go to **Testimonials** in the admin menu
2. Add testimonial content
3. Fill in:
   - Author Name
   - Author Title
   - Rating (1-5 stars)

### Team Members
1. Go to **Team Members** in the admin menu
2. Add team member
3. Fill in:
   - Position
   - Email
   - Social Links (JSON format)

## Social Links Format

For team members, add social links in JSON format:

```json
{
  "twitter": "https://twitter.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "facebook": "https://facebook.com/username",
  "instagram": "https://instagram.com/username",
  "github": "https://github.com/username"
}
```

## File Structure

```
jaspurahub/
├── style.css                          # Theme stylesheet & info
├── functions.php                      # Theme functions
├── index.php                          # Main template
├── page.php                           # Page template
├── single.php                         # Single post template
├── archive.php                        # Archive template
├── 404.php                            # 404 template
├── header.php                         # Header template
├── footer.php                         # Footer template
├── searchform.php                     # Search form
├── template-parts/
│   ├── post.php                       # Post template part
│   ├── service.php                    # Service template part
│   ├── portfolio.php                  # Portfolio template part
│   ├── testimonial.php                # Testimonial template part
│   ├── team.php                       # Team template part
│   └── content-none.php               # No content template
├── assets/
│   ├── js/
│   │   └── main.js                    # Main JavaScript
│   └── css/
│       └── responsive.css             # Responsive styles
└── README.md                          # This file
```

## Helper Functions

The theme includes several helper functions available in `functions.php`:

### `jaspurahub_get_option( $option, $default = '' )`
Get theme options set in the customizer.

```php
$tagline = jaspurahub_get_option( 'tagline', 'Digital Marketing Agency' );
```

### `jaspurahub_get_services( $args = array() )`
Get services with custom arguments.

```php
$services = jaspurahub_get_services( array( 'posts_per_page' => 6 ) );
```

### `jaspurahub_get_portfolio( $args = array() )`
Get portfolio items.

```php
$portfolio = jaspurahub_get_portfolio();
```

### `jaspurahub_get_testimonials( $args = array() )`
Get testimonials.

```php
$testimonials = jaspurahub_get_testimonials();
```

### `jaspurahub_get_team( $args = array() )`
Get team members.

```php
$team = jaspurahub_get_team();
```

## Extending the Theme

To create child themes or extend functionality:

1. Create a child theme directory in `/wp-content/themes/`
2. Create `style.css` with parent theme reference
3. Override templates or add functionality as needed

## Requirements

- WordPress 6.0+
- PHP 8.0+
- Modern web browser

## License

GPL v2 or later

## Support

For issues or questions, please contact the JaspuraHub team.
