<?php
/**
 * Footer Template
 *
 * @package JaspuraHub
 */

?>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content grid grid-3">
                <div class="footer-section">
                    <h3><?php bloginfo( 'name' ); ?></h3>
                    <p><?php bloginfo( 'description' ); ?></p>
                </div>

                <div class="footer-section">
                    <h4><?php esc_html_e( 'Quick Links', 'jaspurahub' ); ?></h4>
                    <?php
                    wp_nav_menu( array(
                        'theme_location'  => 'footer',
                        'container_class' => 'footer-menu',
                        'menu_class'      => 'menu',
                        'fallback_cb'     => false,
                    ) );
                    ?>
                </div>

                <div class="footer-section">
                    <h4><?php esc_html_e( 'Contact', 'jaspurahub' ); ?></h4>
                    <p>
                        <a href="mailto:<?php echo antispambot( get_option( 'admin_email' ) ); ?>">
                            <?php echo antispambot( get_option( 'admin_email' ) ); ?>
                        </a>
                    </p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved.', 'jaspurahub' ); ?></p>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
