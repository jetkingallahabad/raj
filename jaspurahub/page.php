<?php get_header(); ?>

<main class="site-main">
    <div class="container">
        <?php while ( have_posts() ) : the_post(); ?>
            <article class="single-post">
                <h1><?php the_title(); ?></h1>
                
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="featured-image">
                        <?php the_post_thumbnail( 'jaspurahub-large' ); ?>
                    </div>
                <?php endif; ?>
                
                <div class="post-content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
