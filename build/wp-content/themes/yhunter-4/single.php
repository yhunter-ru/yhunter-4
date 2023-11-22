<?php get_header();?>



<?php if ( have_posts() ) while ( have_posts() ) : the_post(); // Начало цикла ?>
<?php $large_image_url=''; //Запомним для socialshare ?>
<?php if ( has_post_thumbnail() ): ?>
<div class="page-content__header bigheader thin blur">
    <div class="bigheader__image">
        <img id="featured-image"
            src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full'); echo $large_image_url[0];?>"
            alt="<?php the_title(); ?>" skip_lazy>
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


    


    <div class="navigation">
        <div class="NavPrev">
            <?php previous_post_link( '%link', '' . _x( '', 'Previous post link', 'twentyten' ) . ' %title' ); // Ссылка на предидущий пост?>
        </div>
        <div class="NavNext">
            <?php next_post_link( '%link', '%title' . _x( '', 'Next post link', 'twentyten' ) . '' ); // Ссылка на следующий пост?>
        </div>
    </div>






    <?php get_footer(); // Подключаем футер ?>


    
