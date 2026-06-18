<?php
/**
 * Search Form Template
 *
 * @package JaspuraHub
 */

?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label>
        <span class="screen-reader-text"><?php esc_html_e( 'Search for:', 'jaspurahub' ); ?></span>
        <input type="search" class="search-input" placeholder="<?php esc_attr_e( 'Search &hellip;', 'jaspurahub' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
    </label>
    <button type="submit" class="search-submit"><?php esc_html_e( 'Search', 'jaspurahub' ); ?></button>
</form>
