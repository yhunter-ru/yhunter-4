<?php get_header();?>






<section class="page-content archive-content">
	<div class="page-content__textheader">
		

		<h1><?php the_archive_title(); ?>
		</h1>

	</div>

	<?php if (have_posts()) : while (have_posts()) : the_post(); // Цикл записей ?>
	<article class="page-content__entry entry">
		<?php if ( has_post_thumbnail() ):   ?>
		<div class="entry__image">
			<?php the_post_thumbnail(); ?>
		</div>
		<?php endif; ?>
		<div class="entry__textfield">
			<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
			<div class="entry__date"><?php the_time('F j, Y');?></div>
			<div class="entry__body">
				<?php the_excerpt(''); // Выводим анонс ?>
			</div>
			<div class="entry__meta meta">
				<div class="meta__cats">
					<?php echo 'Рубрики: '; the_category( ', ' );  // Выводим категории поста ?>
				</div>
				<div class="meta__tags">
					<?php the_tags( 'Тэги: ', ', ', ' ' ); // Выводим тэги(метки) поста ?>
				</div>
			</div>
		</div>

	</article>

	<?php endwhile;
	else: echo '<h2>Извините, ничего не найдено...</h2>'; endif; ?>



	


</section>

<div class="w">
	<div class="pagination">
		

		<?php // Пагинация
	global $wp_query;
	$big = 999999999;
	echo paginate_links( array(
		'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
		'format' => '?paged=%#%',
		'current' => max( 1, get_query_var('paged') ),
		'type' => 'plain',
		'prev_text'    => __('Вперед в будущее'), 
		'next_text'    => __('Назад в прошлое'),
		'total' => $wp_query->max_num_pages
	) );
	?>


	</div>

</div>





<?php get_footer(); // Подключаем футер ?>



