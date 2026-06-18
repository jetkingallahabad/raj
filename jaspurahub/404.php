<?php get_header(); ?>

<main class="site-main">
    <div class="container">
        <div class="error-404">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn">Go Home</a>
        </div>
    </div>
</main>

<?php get_footer(); ?>
