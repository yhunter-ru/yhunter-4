<?php get_header();?>



<?php if ( have_posts() ) while ( have_posts() ) : the_post(); // Начало цикла ?>

<?php if ( has_post_thumbnail() ): ?>
<div class="page-content__header bigheader thin blur">
    <div class="bigheader__image">
        <img id="featured-image"
            src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full'); echo $large_image_url[0];?>"
            alt="<?php the_title(); ?>">
    </div>
    <div class="bigheader__field">
        <h1><?php the_title(); ?></h1>
        <?php get_template_part( 'single-meta' ); ?>
    </div>
</div>
<article class="page-content mt0">
    <?php else: ?>
    <article class="page-content mt0 add-spacer">
        <h1><?php the_title(); ?></h1>
        <?php get_template_part( 'single-meta' ); ?>
        <?php endif; ?>


        <!-- .add-spacer class for 4rem top margin -->

        <?php the_content(); // Содержимое страницы ?>
        <div class="page-content__meta ">
            <?php echo 'Рубрики: '; the_category( ' | ' ); // Выводим категории поста ?>
            <?php the_tags( 'Тэги: ', ' | ', '' ); // Выводим тэги(метки) поста ?>
        </div>
        <?php endwhile; // Конец цикла ?>











    </article>

    <div class="page-content mt0">


        <?php comments_template( '', true ); // Комментарии ?>



    </div>

    <!-- build:html -->

    <div class="navigation">
        <div class="NavPrev">
            <a href="https://www.yhunter.ru/portfolio/design/web/sajt-magazina-fotografij-rusklipart/"
                rel="prev"></span>
                Сайт магазина фотографий «Русклипарт»</a> </div>
        <div class="NavNext">
            <a href="https://www.yhunter.ru/portfolio/design/web/interaktivnyj-sajt-senatora/" rel="next">Интерактивный
                сайт «Сенатора»</a>

        </div>
    </div>


    








    <?php get_footer(); // Подключаем футер ?>


    
