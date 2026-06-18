<?php
/**
 * Main Template File
 *
 * @package JaspuraHub
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <?php
        if ( have_posts() ) :
            ?>
            <div class="posts-wrapper">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/post', get_post_type() );
                endwhile;
                ?>
            </div>
            <?php
            the_posts_pagination( array(
                'mid_size' => 2,
                'prev_text' => esc_html__( '← Previous', 'jaspurahub' ),
                'next_text' => esc_html__( 'Next →', 'jaspurahub' ),
            ) );
        else :
            get_template_part( 'template-parts/content', 'none' );
        endif;
        ?>
    </div>
</main>

<?php
get_footer();
