<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    
    <header class="site-header">
        <div class="container">
            <nav class="site-nav">
                <div class="site-branding">
                    <?php if ( has_custom_logo() ) {
                        the_custom_logo();
                    } else {
                        echo '<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html( bloginfo( 'name' ) ) . '</a>';
                    } ?>
                </div>
                <div class="primary-menu">
                    <?php wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'menu',
                        'fallback_cb'    => 'wp_page_menu',
                        'depth'          => 2,
                    ) ); ?>
                </div>
            </nav>
        </div>
    </header>
