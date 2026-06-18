<?php get_header(); ?>

<main class="site-main">
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1><?php bloginfo( 'name' ); ?></h1>
            <p><?php bloginfo( 'description' ); ?></p>
            <a href="#services" class="btn">Explore Services</a>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services">
        <div class="container">
            <div class="section-header">
                <h2>Our Services</h2>
                <p>Comprehensive digital marketing solutions tailored to your business needs</p>
            </div>
            <div class="grid grid-3">
                <?php
                $services = get_posts( array(
                    'post_type'      => 'service',
                    'posts_per_page' => 6,
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                ) );

                if ( $services ) :
                    foreach ( $services as $service ) :
                        ?>
                        <div class="card service-card">
                            <div class="service-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <h3><?php echo esc_html( $service->post_title ); ?></h3>
                            <p><?php echo wp_trim_words( $service->post_content, 20 ); ?></p>
                            <a href="<?php echo esc_url( get_permalink( $service->ID ) ); ?>" class="btn">Learn More</a>
                        </div>
                        <?php
                    endforeach;
                else :
                    echo '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No services found. Create your first service in the admin panel.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section class="section" style="background: var(--bg-light);">
        <div class="container">
            <div class="section-header">
                <h2>Our Portfolio</h2>
                <p>Check out some of our recent projects and success stories</p>
            </div>
            <div class="grid grid-3">
                <?php
                $portfolio = get_posts( array(
                    'post_type'      => 'portfolio',
                    'posts_per_page' => 6,
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                ) );

                if ( $portfolio ) :
                    foreach ( $portfolio as $item ) :
                        ?>
                        <div class="card portfolio-card">
                            <?php if ( has_post_thumbnail( $item->ID ) ) : ?>
                                <div class="portfolio-image">
                                    <?php echo get_the_post_thumbnail( $item->ID, 'jaspurahub-medium' ); ?>
                                </div>
                            <?php endif; ?>
                            <h3><?php echo esc_html( $item->post_title ); ?></h3>
                            <p><?php echo wp_trim_words( $item->post_content, 15 ); ?></p>
                            <a href="<?php echo esc_url( get_permalink( $item->ID ) ); ?>" class="btn">View Project</a>
                        </div>
                        <?php
                    endforeach;
                else :
                    echo '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No portfolio items found. Create your first portfolio item in the admin panel.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>What Our Clients Say</h2>
                <p>Trusted by leading companies worldwide</p>
            </div>
            <div class="grid grid-3">
                <?php
                $testimonials = get_posts( array(
                    'post_type'      => 'testimonial',
                    'posts_per_page' => 6,
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                ) );

                if ( $testimonials ) :
                    foreach ( $testimonials as $testimonial ) :
                        ?>
                        <div class="card testimonial-card">
                            <div class="testimonial-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="testimonial-content">
                                "<?php echo wp_trim_words( $testimonial->post_content, 30 ); ?>..."
                            </div>
                            <div class="testimonial-author">
                                <?php if ( has_post_thumbnail( $testimonial->ID ) ) : ?>
                                    <img src="<?php echo get_the_post_thumbnail_url( $testimonial->ID, 'thumbnail' ); ?>" alt="Client" class="author-avatar">
                                <?php endif; ?>
                                <div class="author-name"><?php echo esc_html( $testimonial->post_title ); ?></div>
                                <div class="author-title">Client</div>
                            </div>
                        </div>
                        <?php
                    endforeach;
                else :
                    echo '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No testimonials found. Create your first testimonial in the admin panel.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section" style="background: linear-gradient(135deg, #3b82f6 0%, #1e293b 100%); color: white; text-align: center;">
        <div class="container">
            <h2 style="color: white; margin-bottom: 1rem;">Ready to Get Started?</h2>
            <p style="color: #cbd5e1; max-width: 600px; margin-left: auto; margin-right: auto; margin-bottom: 2rem; font-size: 1.1rem;">Let's work together to grow your business and achieve your goals.</p>
            <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-secondary" style="background-color: white; color: #3b82f6;">Contact Us Today</a>
        </div>
    </section>

</main>

<?php get_footer(); ?>
