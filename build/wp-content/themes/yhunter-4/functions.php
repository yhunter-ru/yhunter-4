<?php
/**
 * Чистый Шаблон для разработки
 * Функции шаблона
 * http://dontforget.pro
 * @package WordPress
 * @subpackage clean
 */
register_nav_menus( array( // Регистрируем 2 меню
	'top' => 'Main menu'
) );
add_theme_support('post-thumbnails'); // Включаем поддержку миниатюр
set_post_thumbnail_size(320, 320); // Задаем размеры миниатюре

if ( function_exists('register_sidebar') )
register_sidebar(); // Регистрируем сайдбар


//Disable emoji support
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

?>