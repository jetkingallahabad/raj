<?php
/**
 * Header Template
 *
 * @package JaspuraHub
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <header class="site-header">
        <div class="container">
            <nav class="site-nav">
                <div class="site-branding">
                    <?php
                    if ( has_custom_logo() ) {
                        the_custom_logo();
                    } else {
                        ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-title">
                            <?php bloginfo( 'name' ); ?>
                        </a>
                        <?php
                    }
                    ?>
                </div>

                <?php
                wp_nav_menu( array(
                    'theme_location'  => 'primary',
                    'container_class' => 'primary-menu',
                    'menu_class'      => 'menu',
                    'fallback_cb'     => 'wp_page_menu',
                ) );
                ?>
            </nav>
        </div>
    </header>
