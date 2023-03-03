<?php get_header();?>






<article class="page-content">
    <?php if ( have_posts() ) while ( have_posts() ) : the_post(); // Начало цикла ?>
    <h1><?php the_title(); // Заголовок ?></h1>
    <?php the_content(); // Содержимое страницы ?>
    <?php endwhile; // Конец цикла ?>
</article>



<?php get_footer(); // Подключаем футер ?>



