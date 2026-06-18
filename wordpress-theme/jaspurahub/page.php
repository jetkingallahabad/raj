<?php
/**
 * Page Template
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
            <article class="page-content">
                <h1><?php the_title(); ?></h1>
                <?php
                if ( has_post_thumbnail() ) {
                    the_post_thumbnail( 'jaspurahub-hero' );
                }
                the_content();
                ?>
            </article>
            <?php
        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
