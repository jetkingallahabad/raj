<?php get_header(); ?>

<main class="site-main">
    <div class="container">
        <?php while ( have_posts() ) : the_post(); ?>
            <article class="single-post">
                <h1><?php the_title(); ?></h1>
                <p class="post-meta"><?php echo get_the_date(); ?> by <?php echo get_the_author(); ?></p>
                
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="featured-image">
                        <?php the_post_thumbnail( 'jaspurahub-large' ); ?>
                    </div>
                <?php endif; ?>
                
                <div class="post-content">
                    <?php the_content(); ?>
                </div>
            </article>
            
            <?php
            $related = new WP_Query( array(
                'post_type'      => get_post_type(),
                'posts_per_page' => 3,
                'post__not_in'   => array( get_the_ID() ),
                'orderby'        => 'rand',
            ) );
            
            if ( $related->have_posts() ) :
                echo '<div class="related-posts"><h3>Related Posts</h3><div class="posts-wrapper">';
                while ( $related->have_posts() ) : $related->the_post();
                    ?>
                    <article class="post">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail( 'jaspurahub-medium' ); ?>
                            </div>
                        <?php endif; ?>
                        <h3 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p class="post-excerpt"><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="btn">Read More</a>
                    </article>
                    <?php
                endwhile;
                echo '</div></div>';
                wp_reset_postdata();
            endif;
            ?>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
