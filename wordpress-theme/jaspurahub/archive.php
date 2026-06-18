<?php
/**
 * Archive Template
 *
 * @package JaspuraHub
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <h1 class="page-title">
            <?php
            if ( is_category() ) {
                single_cat_title();
            } elseif ( is_tag() ) {
                single_tag_title( esc_html__( 'Tag: ', 'jaspurahub' ) );
            } elseif ( is_author() ) {
                echo esc_html__( 'Author: ', 'jaspurahub' ) . get_the_author();
            } elseif ( is_date() ) {
                if ( is_year() ) {
                    echo esc_html( get_the_date( 'Y' ) );
                } elseif ( is_month() ) {
                    echo esc_html( get_the_date( 'F Y' ) );
                } elseif ( is_day() ) {
                    echo esc_html( get_the_date( 'F j, Y' ) );
                }
            } else {
                post_type_archive_title();
            }
            ?>
        </h1>

        <div class="posts-wrapper grid grid-3">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/post', get_post_type() );
                endwhile;
            else :
                get_template_part( 'template-parts/content', 'none' );
            endif;
            ?>
        </div>

        <?php
        the_posts_pagination( array(
            'mid_size' => 2,
            'prev_text' => esc_html__( '← Previous', 'jaspurahub' ),
            'next_text' => esc_html__( 'Next →', 'jaspurahub' ),
        ) );
        ?>
    </div>
</main>

<?php
get_footer();
