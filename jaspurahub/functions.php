<?php
/**
 * JaspuraHub Theme Functions
 * Version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Theme setup
function jaspurahub_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );
    
    // Register menus
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'jaspurahub' ),
        'footer'  => __( 'Footer Menu', 'jaspurahub' ),
    ) );
    
    // Add image sizes
    add_image_size( 'jaspurahub-large', 1200, 600, true );
    add_image_size( 'jaspurahub-medium', 600, 400, true );
    add_image_size( 'jaspurahub-small', 300, 300, true );
}
add_action( 'after_setup_theme', 'jaspurahub_setup' );

// Enqueue styles and scripts
function jaspurahub_enqueue_assets() {
    wp_enqueue_style( 'jaspurahub-style', get_stylesheet_uri(), array(), '2.0.0' );
    wp_enqueue_script( 'jaspurahub-main', get_template_directory_uri() . '/assets/js/main.js', array(), '2.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'jaspurahub_enqueue_assets' );

// Register sidebars
function jaspurahub_register_sidebars() {
    register_sidebar( array(
        'name'          => __( 'Primary Sidebar', 'jaspurahub' ),
        'id'            => 'primary-sidebar',
        'description'   => __( 'Main sidebar', 'jaspurahub' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'jaspurahub_register_sidebars' );

// Custom post types
function jaspurahub_register_post_types() {
    // Services
    register_post_type( 'service', array(
        'labels'       => array( 'name' => 'Services', 'singular_name' => 'Service' ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'      => array( 'slug' => 'service' ),
        'menu_icon'    => 'dashicons-briefcase',
    ) );
    
    // Portfolio
    register_post_type( 'portfolio', array(
        'labels'       => array( 'name' => 'Portfolio', 'singular_name' => 'Portfolio Item' ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'      => array( 'slug' => 'portfolio' ),
        'menu_icon'    => 'dashicons-images-alt2',
    ) );
    
    // Testimonials
    register_post_type( 'testimonial', array(
        'labels'       => array( 'name' => 'Testimonials', 'singular_name' => 'Testimonial' ),
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'      => array( 'slug' => 'testimonial' ),
        'menu_icon'    => 'dashicons-format-quote',
    ) );
}
add_action( 'init', 'jaspurahub_register_post_types' );

// Get services
function jaspurahub_get_services( $limit = -1 ) {
    return get_posts( array(
        'post_type'      => 'service',
        'posts_per_page' => $limit,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );
}

// Get portfolio
function jaspurahub_get_portfolio( $limit = -1 ) {
    return get_posts( array(
        'post_type'      => 'portfolio',
        'posts_per_page' => $limit,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );
}

// Get testimonials
function jaspurahub_get_testimonials( $limit = -1 ) {
    return get_posts( array(
        'post_type'      => 'testimonial',
        'posts_per_page' => $limit,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );
}
