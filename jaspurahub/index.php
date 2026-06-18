<?php get_header(); ?>

<main class="site-main">
    <div class="container">
        <h1 style="margin: 2rem 0; text-align: center; font-size: 2.5rem; color: #333;"><?php bloginfo( 'name' ); ?></h1>
        <p style="text-align: center; font-size: 1.1rem; color: #666; margin-bottom: 2rem;"><?php bloginfo( 'description' ); ?></p>
        
        <?php if ( have_posts() ) : ?>
            <div class="posts-wrapper">
                <?php while ( have_posts() ) : the_post(); ?>
                    <article class="post">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail( 'jaspurahub-medium' ); ?>
                            </div>
                        <?php endif; ?>
                        <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <p class="post-meta"><?php echo get_the_date(); ?> | <?php echo get_the_author(); ?></p>
                        <p class="post-excerpt"><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="btn">Read More</a>
                    </article>
                <?php endwhile; ?>
            </div>
            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <p style="text-align: center; font-size: 1.1rem; color: #666;">No posts found</p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
