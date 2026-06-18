<?php
/**
 * Service Post Type Template Part
 *
 * @package JaspuraHub
 */

$icon = get_post_meta( get_the_ID(), '_service_icon', true );
$color = get_post_meta( get_the_ID(), '_service_color', true );

?>
<article <?php post_class( 'card service-card' ); ?>>
    <?php
    if ( $icon ) {
        ?>
        <div class="service-icon" style="color: <?php echo esc_attr( $color ); ?>;">
            <i class="<?php echo esc_attr( $icon ); ?>"></i>
        </div>
        <?php
    }
    ?>

    <div class="service-content">
        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p><?php the_excerpt(); ?></p>
        <a href="<?php the_permalink(); ?>" class="btn btn-primary">
            <?php esc_html_e( 'Learn More', 'jaspurahub' ); ?>
        </a>
    </div>
</article>
