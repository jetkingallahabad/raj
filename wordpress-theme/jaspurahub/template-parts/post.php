<?php
/**
 * Post Template Part
 *
 * @package JaspuraHub
 */

?>
<article <?php post_class( 'card' ); ?>>
    <?php
    if ( has_post_thumbnail() ) {
        ?>
        <div class="post-thumbnail">
            <?php the_post_thumbnail( 'medium' ); ?>
        </div>
        <?php
    }
    ?>

    <div class="post-content">
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <p class="post-meta">
            <?php
            printf(
                esc_html__( 'Posted on %s by %s', 'jaspurahub' ),
                '<a href="' . esc_url( get_the_date_archive_link() ) . '">' . esc_html( get_the_date() ) . '</a>',
                '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>'
            );
            ?>
        </p>
        <?php the_excerpt(); ?>
        <a href="<?php the_permalink(); ?>" class="btn btn-primary">
            <?php esc_html_e( 'Read More', 'jaspurahub' ); ?>
        </a>
    </div>
</article>
