    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><?php bloginfo( 'name' ); ?></h3>
                    <p><?php bloginfo( 'description' ); ?></p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <?php wp_nav_menu( array(
                        'theme_location' => 'footer',
                        'menu_class'     => '',
                        'fallback_cb'    => 'wp_page_menu',
                        'depth'          => 1,
                    ) ); ?>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>Email: <a href="mailto:<?php echo antispambot( get_option( 'admin_email' ) ); ?>"><?php echo antispambot( get_option( 'admin_email' ) ); ?></a></p>
                    <p><?php bloginfo( 'description' ); ?></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <?php wp_footer(); ?>
</body>
</html>
