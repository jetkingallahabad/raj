<?php
/**
 * Testimonial Post Type Template Part
 *
 * @package JaspuraHub
 */

$author_name = get_post_meta( get_the_ID(), '_testimonial_author_name', true );
$author_title = get_post_meta( get_the_ID(), '_testimonial_author_title', true );
$rating = get_post_meta( get_the_ID(), '_testimonial_rating', true );

?>
<article <?php post_class( 'card testimonial-card' ); ?>>
    <div class="testimonial-rating">
        <?php
        for ( $i = 0; $i < $rating; $i++ ) {
            echo '<i class="fas fa-star"></i>';
        }
        ?>
    </div>

    <div class="testimonial-content">
        <?php the_content(); ?>
    </div>

    <div class="testimonial-author">
        <?php
        if ( has_post_thumbnail() ) {
            ?>
            <div class="testimonial-avatar">
                <?php the_post_thumbnail( 'jaspurahub-team' ); ?>
            </div>
            <?php
        }
        ?>
        <div class="author-info">
            <?php if ( $author_name ) : ?>
                <strong><?php echo esc_html( $author_name ); ?></strong>
            <?php endif; ?>
            <?php if ( $author_title ) : ?>
                <p><?php echo esc_html( $author_title ); ?></p>
            <?php endif; ?>
        </div>
    </div>
</article>
