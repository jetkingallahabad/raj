<?php
/**
 * Single Post Template
 *
 * @package JaspuraHub
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article <?php post_class( 'single-post' ); ?>>
                <h1><?php the_title(); ?></h1>
                <p class="post-meta">
                    <?php
                    printf(
                        esc_html__( 'Posted on %s by %s', 'jaspurahub' ),
                        '<a href="' . esc_url( get_the_date_archive_link() ) . '">' . esc_html( get_the_date() ) . '</a>',
                        '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>'
                    );
                    ?>
                </p>

                <?php
                if ( has_post_thumbnail() ) {
                    ?>
                    <div class="featured-image">
                        <?php the_post_thumbnail( 'jaspurahub-hero' ); ?>
                    </div>
                    <?php
                }
                ?>

                <div class="post-content">
                    <?php the_content(); ?>
                </div>

                <?php
                // Display category/tags if available
                if ( get_the_category() ) {
                    ?>
                    <div class="post-categories">
                        <?php the_category( ', ' ); ?>
                    </div>
                    <?php
                }

                if ( get_the_tags() ) {
                    ?>
                    <div class="post-tags">
                        <?php the_tags( '', ', ' ); ?>
                    </div>
                    <?php
                }
                ?>
            </article>

            <?php
            // Related posts
            $related_args = array(
                'post_type'      => get_post_type(),
                'posts_per_page' => 3,
                'post__not_in'   => array( get_the_ID() ),
                'orderby'        => 'rand',
            );
            $related = new WP_Query( $related_args );

            if ( $related->have_posts() ) {
                ?>
                <div class="related-posts">
                    <h3><?php esc_html_e( 'Related Posts', 'jaspurahub' ); ?></h3>
                    <div class="grid grid-3">
                        <?php
                        while ( $related->have_posts() ) :
                            $related->the_post();
                            get_template_part( 'template-parts/post', get_post_type() );
                        endwhile;
                        wp_reset_postdata();
                        ?>
                    </div>
                </div>
                <?php
            }
            ?>
        <?php
        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
