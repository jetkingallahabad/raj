<?php
/**
 * Portfolio Post Type Template Part
 *
 * @package JaspuraHub
 */

?>
<article <?php post_class( 'card portfolio-card' ); ?>>
    <?php
    if ( has_post_thumbnail() ) {
        ?>
        <div class="portfolio-thumbnail">
            <?php the_post_thumbnail( 'jaspurahub-portfolio' ); ?>
        </div>
        <?php
    }
    ?>

    <div class="portfolio-content">
        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p class="portfolio-meta">
            <?php
            $terms = get_the_terms( get_the_ID(), 'portfolio_category' );
            if ( $terms ) {
                $categories = wp_list_pluck( $terms, 'name' );
                echo esc_html( implode( ', ', $categories ) );
            }
            ?>
        </p>
        <p><?php the_excerpt(); ?></p>
        <a href="<?php the_permalink(); ?>" class="btn btn-primary">
            <?php esc_html_e( 'View Project', 'jaspurahub' ); ?>
        </a>
    </div>
</article>
