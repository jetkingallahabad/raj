<?php
/**
 * 404 Error Template
 *
 * @package JaspuraHub
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <div class="error-404 card">
            <h1><?php esc_html_e( '404 - Page Not Found', 'jaspurahub' ); ?></h1>
            <p><?php esc_html_e( 'Sorry, the page you are looking for does not exist. It might have been moved or deleted.', 'jaspurahub' ); ?></p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
                <?php esc_html_e( 'Back to Home', 'jaspurahub' ); ?>
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
