<?php
/**
 * Team Post Type Template Part
 *
 * @package JaspuraHub
 */

$position = get_post_meta( get_the_ID(), '_team_position', true );
$email = get_post_meta( get_the_ID(), '_team_email', true );
$social_links = get_post_meta( get_the_ID(), '_team_social_links', true );
$social = $social_links ? json_decode( $social_links, true ) : array();

?>
<article <?php post_class( 'card team-card' ); ?>>
    <?php
    if ( has_post_thumbnail() ) {
        ?>
        <div class="team-thumbnail">
            <?php the_post_thumbnail( 'jaspurahub-team' ); ?>
        </div>
        <?php
    }
    ?>

    <div class="team-content">
        <h3><?php the_title(); ?></h3>
        <?php if ( $position ) : ?>
            <p class="team-position"><?php echo esc_html( $position ); ?></p>
        <?php endif; ?>
        <p><?php the_excerpt(); ?></p>

        <div class="team-social">
            <?php
            if ( ! empty( $social ) ) {
                foreach ( $social as $platform => $url ) {
                    $icon_map = array(
                        'twitter'   => 'fab fa-twitter',
                        'linkedin'  => 'fab fa-linkedin',
                        'facebook'  => 'fab fa-facebook',
                        'instagram' => 'fab fa-instagram',
                        'github'    => 'fab fa-github',
                    );
                    $icon = $icon_map[ strtolower( $platform ) ] ?? 'fas fa-link';
                    ?>
                    <a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr( ucfirst( $platform ) ); ?>">
                        <i class="<?php echo esc_attr( $icon ); ?>"></i>
                    </a>
                    <?php
                }
            }
            ?>
        </div>
    </div>
</article>
