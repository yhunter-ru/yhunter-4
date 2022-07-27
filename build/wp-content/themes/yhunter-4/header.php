<!DOCTYPE html>
<html lang="ru">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="apple-touch-icon" href="apple-touch-icon.png">

	<!-- RSS, стили -->
	<link rel="alternate" type="application/rdf+xml" title="RDF mapping" href="<?php bloginfo('rdf_url'); ?>" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rss_url'); ?>" />
	<link rel="alternate" type="application/rss+xml" title="Comments RSS"
		href="<?php bloginfo('comments_rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<!--[if lt IE 9]>
 <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]-->


	<style>
		<?php include (TEMPLATEPATH . '/_inline.php');
		?>


	

	* {}
	</style>


	<title>
		<?php // Генерируем тайтл в зависимости от контента с разделителем " | "
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );
?>

	</title>


	<?php
	wp_head(); // Необходимо для работы плагинов и функционала wp
?>


</head>

<body>
	<?php include (TEMPLATEPATH . '/symbol.php'); ?>


	


	<?php
		$args = array( // Выводим верхнее меню
			'theme_location'=>'Главное меню',
			'container'=>'',
			'depth'=> 0);
		wp_nav_menu($args);
?>


	
