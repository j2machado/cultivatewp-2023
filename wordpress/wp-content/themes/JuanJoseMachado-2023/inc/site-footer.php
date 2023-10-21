<?php
/**
 * Site Footer
 *
 * @package      JuanJoseMachado-2023
 * @subpackage   site-header/01
 * @author       Bill Erickson
 * @since        1.0.0
 * @license      GPL-2.0+
 **/

use BEStarter\Blocks\Social_Links;

/**
 * Site Footer
 */
function be_site_footer() {
	echo '<a href="' . esc_url( home_url() ) . '" rel="home" class="site-header__logo" aria-label="' . esc_attr( get_bloginfo( 'name' ) ) . ' Home"> <img src="'. get_stylesheet_directory_uri() .'/assets/logos/logo-footer.svg" alt="'. get_bloginfo( 'name' ) .'"></a>';
	echo '<p>&copy;' . date( 'Y' ) . ' ' . get_bloginfo( 'name' ) . '. All rights reserved.</p>';
}
add_action( 'tha_footer_top', 'be_site_footer' );
