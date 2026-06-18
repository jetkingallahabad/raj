<?php
/**
 * JaspuraHub Theme Functions
 *
 * @package JaspuraHub
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

define( 'JASPURAHUB_VERSION', '1.0.0' );
define( 'JASPURAHUB_DIR', get_template_directory() );
define( 'JASPURAHUB_URI', get_template_directory_uri() );

/**
 * Theme Setup
 */
function jaspurahub_setup() {
    // Add theme support
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'editor-styles' );

    // Register menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'jaspurahub' ),
        'footer'  => esc_html__( 'Footer Menu', 'jaspurahub' ),
    ) );

    // Add image sizes
    add_image_size( 'jaspurahub-hero', 1920, 600, true );
    add_image_size( 'jaspurahub-service', 400, 300, true );
    add_image_size( 'jaspurahub-portfolio', 500, 400, true );
    add_image_size( 'jaspurahub-team', 300, 300, true );
}
add_action( 'after_setup_theme', 'jaspurahub_setup' );

/**
 * Enqueue Scripts and Styles
 */
function jaspurahub_enqueue_assets() {
    // Main stylesheet
    wp_enqueue_style(
        'jaspurahub-style',
        JASPURAHUB_URI . '/style.css',
        array(),
        JASPURAHUB_VERSION
    );

    // Tailwind CSS
    wp_enqueue_style(
        'tailwindcss',
        'https://cdn.tailwindcss.com',
        array(),
        '3.3.0'
    );

    // Font Awesome
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        array(),
        '6.5.1'
    );

    // Google Fonts
    wp_enqueue_style(
        'google-fonts-poppins',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        array(),
        '1.0'
    );

    // Main JavaScript
    wp_enqueue_script(
        'jaspurahub-main',
        JASPURAHUB_URI . '/assets/js/main.js',
        array( 'jquery' ),
        JASPURAHUB_VERSION,
        true
    );

    // Pass data to JavaScript
    wp_localize_script( 'jaspurahub-main', 'jaspurahubData', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'siteUrl' => get_site_url(),
    ) );
}
add_action( 'wp_enqueue_scripts', 'jaspurahub_enqueue_assets' );

/**
 * Register Custom Post Types
 */
function jaspurahub_register_post_types() {
    // Services
    register_post_type( 'service', array(
        'labels' => array(
            'name'          => esc_html__( 'Services', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Service', 'jaspurahub' ),
        ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'      => array( 'slug' => 'service' ),
        'menu_icon'    => 'dashicons-briefcase',
        'taxonomies'   => array( 'post_tag' ),
    ) );

    // Portfolio
    register_post_type( 'portfolio', array(
        'labels' => array(
            'name'          => esc_html__( 'Portfolio', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Portfolio Item', 'jaspurahub' ),
        ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'      => array( 'slug' => 'portfolio' ),
        'menu_icon'    => 'dashicons-images-alt2',
        'taxonomies'   => array( 'category' ),
    ) );

    // Testimonials
    register_post_type( 'testimonial', array(
        'labels' => array(
            'name'          => esc_html__( 'Testimonials', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Testimonial', 'jaspurahub' ),
        ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'      => array( 'slug' => 'testimonial' ),
        'menu_icon'    => 'dashicons-format-quote',
    ) );

    // Team Members
    register_post_type( 'team', array(
        'labels' => array(
            'name'          => esc_html__( 'Team Members', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Team Member', 'jaspurahub' ),
        ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'      => array( 'slug' => 'team' ),
        'menu_icon'    => 'dashicons-people',
    ) );
}
add_action( 'init', 'jaspurahub_register_post_types' );

/**
 * Register Custom Taxonomies
 */
function jaspurahub_register_taxonomies() {
    // Service Categories
    register_taxonomy( 'service_category', 'service', array(
        'labels' => array(
            'name'          => esc_html__( 'Service Categories', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Service Category', 'jaspurahub' ),
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'service-category' ),
    ) );

    // Portfolio Categories
    register_taxonomy( 'portfolio_category', 'portfolio', array(
        'labels' => array(
            'name'          => esc_html__( 'Portfolio Categories', 'jaspurahub' ),
            'singular_name' => esc_html__( 'Portfolio Category', 'jaspurahub' ),
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'portfolio-category' ),
    ) );
}
add_action( 'init', 'jaspurahub_register_taxonomies' );

/**
 * Register Custom Fields (Meta Boxes)
 */
function jaspurahub_register_meta_boxes() {
    add_meta_box(
        'service_details',
        esc_html__( 'Service Details', 'jaspurahub' ),
        'jaspurahub_service_meta_callback',
        'service',
        'normal',
        'high'
    );

    add_meta_box(
        'testimonial_details',
        esc_html__( 'Testimonial Details', 'jaspurahub' ),
        'jaspurahub_testimonial_meta_callback',
        'testimonial',
        'normal',
        'high'
    );

    add_meta_box(
        'team_details',
        esc_html__( 'Team Member Details', 'jaspurahub' ),
        'jaspurahub_team_meta_callback',
        'team',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'jaspurahub_register_meta_boxes' );

/**
 * Service Details Meta Box Callback
 */
function jaspurahub_service_meta_callback( $post ) {
    wp_nonce_field( 'jaspurahub_service_nonce', 'jaspurahub_service_nonce' );

    $icon = get_post_meta( $post->ID, '_service_icon', true );
    $color = get_post_meta( $post->ID, '_service_color', true );
    ?>
    <div class="jaspurahub-meta-box">
        <p>
            <label for="service_icon"><?php esc_html_e( 'Icon Class (Font Awesome):', 'jaspurahub' ); ?></label><br>
            <input type="text" id="service_icon" name="service_icon" value="<?php echo esc_attr( $icon ); ?>" class="widefat" placeholder="e.g., fas fa-rocket">
        </p>
        <p>
            <label for="service_color"><?php esc_html_e( 'Accent Color:', 'jaspurahub' ); ?></label><br>
            <input type="color" id="service_color" name="service_color" value="<?php echo esc_attr( $color ?: '#3b82f6' ); ?>" class="widefat">
        </p>
    </div>
    <?php
}

/**
 * Testimonial Details Meta Box Callback
 */
function jaspurahub_testimonial_meta_callback( $post ) {
    wp_nonce_field( 'jaspurahub_testimonial_nonce', 'jaspurahub_testimonial_nonce' );

    $author_name = get_post_meta( $post->ID, '_testimonial_author_name', true );
    $author_title = get_post_meta( $post->ID, '_testimonial_author_title', true );
    $rating = get_post_meta( $post->ID, '_testimonial_rating', true );
    ?>
    <div class="jaspurahub-meta-box">
        <p>
            <label for="testimonial_author_name"><?php esc_html_e( 'Author Name:', 'jaspurahub' ); ?></label><br>
            <input type="text" id="testimonial_author_name" name="testimonial_author_name" value="<?php echo esc_attr( $author_name ); ?>" class="widefat">
        </p>
        <p>
            <label for="testimonial_author_title"><?php esc_html_e( 'Author Title:', 'jaspurahub' ); ?></label><br>
            <input type="text" id="testimonial_author_title" name="testimonial_author_title" value="<?php echo esc_attr( $author_title ); ?>" class="widefat" placeholder="e.g., CEO at Company">
        </p>
        <p>
            <label for="testimonial_rating"><?php esc_html_e( 'Rating (1-5):', 'jaspurahub' ); ?></label><br>
            <input type="number" id="testimonial_rating" name="testimonial_rating" value="<?php echo esc_attr( $rating ?: 5 ); ?>" class="widefat" min="1" max="5">
        </p>
    </div>
    <?php
}

/**
 * Team Details Meta Box Callback
 */
function jaspurahub_team_meta_callback( $post ) {
    wp_nonce_field( 'jaspurahub_team_nonce', 'jaspurahub_team_nonce' );

    $position = get_post_meta( $post->ID, '_team_position', true );
    $email = get_post_meta( $post->ID, '_team_email', true );
    $social_links = get_post_meta( $post->ID, '_team_social_links', true );
    ?>
    <div class="jaspurahub-meta-box">
        <p>
            <label for="team_position"><?php esc_html_e( 'Position:', 'jaspurahub' ); ?></label><br>
            <input type="text" id="team_position" name="team_position" value="<?php echo esc_attr( $position ); ?>" class="widefat" placeholder="e.g., Marketing Manager">
        </p>
        <p>
            <label for="team_email"><?php esc_html_e( 'Email:', 'jaspurahub' ); ?></label><br>
            <input type="email" id="team_email" name="team_email" value="<?php echo esc_attr( $email ); ?>" class="widefat">
        </p>
        <p>
            <label for="team_social_links"><?php esc_html_e( 'Social Links (JSON):', 'jaspurahub' ); ?></label><br>
            <textarea id="team_social_links" name="team_social_links" class="widefat" rows="3" placeholder='{"twitter": "https://twitter.com/...", "linkedin": "https://linkedin.com/in/..."}'><?php echo esc_textarea( $social_links ); ?></textarea>
        </p>
    </div>
    <?php
}

/**
 * Save Meta Box Data
 */
function jaspurahub_save_meta_box_data( $post_id ) {
    if ( ! isset( $_POST['jaspurahub_service_nonce'] ) && ! isset( $_POST['jaspurahub_testimonial_nonce'] ) && ! isset( $_POST['jaspurahub_team_nonce'] ) ) {
        return;
    }

    // Service meta
    if ( isset( $_POST['jaspurahub_service_nonce'] ) && wp_verify_nonce( $_POST['jaspurahub_service_nonce'], 'jaspurahub_service_nonce' ) ) {
        update_post_meta( $post_id, '_service_icon', sanitize_text_field( $_POST['service_icon'] ?? '' ) );
        update_post_meta( $post_id, '_service_color', sanitize_hex_color( $_POST['service_color'] ?? '#3b82f6' ) );
    }

    // Testimonial meta
    if ( isset( $_POST['jaspurahub_testimonial_nonce'] ) && wp_verify_nonce( $_POST['jaspurahub_testimonial_nonce'], 'jaspurahub_testimonial_nonce' ) ) {
        update_post_meta( $post_id, '_testimonial_author_name', sanitize_text_field( $_POST['testimonial_author_name'] ?? '' ) );
        update_post_meta( $post_id, '_testimonial_author_title', sanitize_text_field( $_POST['testimonial_author_title'] ?? '' ) );
        update_post_meta( $post_id, '_testimonial_rating', intval( $_POST['testimonial_rating'] ?? 5 ) );
    }

    // Team meta
    if ( isset( $_POST['jaspurahub_team_nonce'] ) && wp_verify_nonce( $_POST['jaspurahub_team_nonce'], 'jaspurahub_team_nonce' ) ) {
        update_post_meta( $post_id, '_team_position', sanitize_text_field( $_POST['team_position'] ?? '' ) );
        update_post_meta( $post_id, '_team_email', sanitize_email( $_POST['team_email'] ?? '' ) );
        update_post_meta( $post_id, '_team_social_links', sanitize_text_field( $_POST['team_social_links'] ?? '' ) );
    }
}
add_action( 'save_post', 'jaspurahub_save_meta_box_data' );

/**
 * Customizer Settings
 */
function jaspurahub_customize_register( $wp_customize ) {
    // Site Settings
    $wp_customize->add_section( 'jaspurahub_site_settings', array(
        'title'    => esc_html__( 'JaspuraHub Settings', 'jaspurahub' ),
        'priority' => 30,
    ) );

    // Tagline
    $wp_customize->add_setting( 'jaspurahub_tagline', array(
        'default'   => esc_html__( 'Digital Marketing Agency', 'jaspurahub' ),
        'transport' => 'postMessage',
    ) );

    $wp_customize->add_control( 'jaspurahub_tagline', array(
        'label'   => esc_html__( 'Site Tagline', 'jaspurahub' ),
        'section' => 'jaspurahub_site_settings',
        'type'    => 'text',
    ) );

    // Primary Color
    $wp_customize->add_setting( 'jaspurahub_primary_color', array(
        'default'   => '#3b82f6',
        'transport' => 'postMessage',
    ) );

    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'jaspurahub_primary_color', array(
        'label'   => esc_html__( 'Primary Color', 'jaspurahub' ),
        'section' => 'jaspurahub_site_settings',
    ) ) );

    // Accent Color
    $wp_customize->add_setting( 'jaspurahub_accent_color', array(
        'default'   => '#38bdf8',
        'transport' => 'postMessage',
    ) );

    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'jaspurahub_accent_color', array(
        'label'   => esc_html__( 'Accent Color', 'jaspurahub' ),
        'section' => 'jaspurahub_site_settings',
    ) ) );
}
add_action( 'customize_register', 'jaspurahub_customize_register' );

/**
 * Helper Functions
 */

/**
 * Get theme option
 */
function jaspurahub_get_option( $option, $default = '' ) {
    return get_theme_mod( 'jaspurahub_' . $option, $default );
}

/**
 * Get services
 */
function jaspurahub_get_services( $args = array() ) {
    $defaults = array(
        'post_type'      => 'service',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );

    $args = wp_parse_args( $args, $defaults );
    return get_posts( $args );
}

/**
 * Get portfolio items
 */
function jaspurahub_get_portfolio( $args = array() ) {
    $defaults = array(
        'post_type'      => 'portfolio',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );

    $args = wp_parse_args( $args, $defaults );
    return get_posts( $args );
}

/**
 * Get testimonials
 */
function jaspurahub_get_testimonials( $args = array() ) {
    $defaults = array(
        'post_type'      => 'testimonial',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );

    $args = wp_parse_args( $args, $defaults );
    return get_posts( $args );
}

/**
 * Get team members
 */
function jaspurahub_get_team( $args = array() ) {
    $defaults = array(
        'post_type'      => 'team',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );

    $args = wp_parse_args( $args, $defaults );
    return get_posts( $args );
}
