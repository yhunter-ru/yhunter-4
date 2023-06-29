<?php get_header();?>



<?php if ( have_posts() ) while ( have_posts() ) : the_post(); // Начало цикла ?>

<div class="page-content__header bigheader thin">
    <div class="bigheader__image">
        <img src="https://www.yhunter.ru/wp-content/uploads/2022/07/DSC1584.jpg" alt="">
    </div>
    <div class="bigheader__field">
        <h1><?php the_title(); // Заголовок ?></h1>
        <div class="bigheader__meta">
            <div class="bigheader__date"><?php the_time('j F, Y');  ?></div>
            <div class="bigheader__share">share</div>
        </div>
    </div>
</div>

<article class="page-content mt0">
    <!-- .add-spacer class for 4rem top margin -->

    <?php the_content(); // Содержимое страницы ?>
    <?php echo 'Рубрики: '; the_category( ' | ' ); // Выводим категории поста ?>
    <?php the_tags( 'Тэги: ', ' | ', '' ); // Выводим тэги(метки) поста ?>
    <?php endwhile; // Конец цикла ?>

    <div class="page-content__comments">
        comments section
    </div>


    <?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentyten' ) . '</span> %title' ); // Ссылка на предидущий пост?>
    <?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '</span>' ); // Ссылка на следующий пост?>






</article>

<div class="page-content mt0">


    <?php comments_template( '', true ); // Комментарии ?>



</div>

<!-- build:html -->

<div class="navigation">
    <div class="NavPrev">
        <a href="https://www.yhunter.ru/portfolio/design/web/sajt-magazina-fotografij-rusklipart/" rel="prev"></span>
            Сайт магазина фотографий «Русклипарт»</a> </div>
    <div class="NavNext">
        <a href="https://www.yhunter.ru/portfolio/design/web/interaktivnyj-sajt-senatora/" rel="next">Интерактивный
            сайт «Сенатора»</a>

    </div>
</div>











<?php get_footer(); // Подключаем футер ?>



