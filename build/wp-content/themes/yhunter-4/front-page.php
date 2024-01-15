<?php get_header();?>
<div class="w add-spacer frontpage">
    <section class="intro">
        <div class="intro__topline r">
            <div class="intro__photo">
                <img src="/wp-content/themes/yhunter-4/img/yuri.webp" alt="Юрий Баранов" skip_lazy />
            </div>
            <div class="intro__aboutme bigtext">
                <?php the_field('greetings');?><a href="#about" class="intro__scrolldown" title="Подробнее обо мне"></a>
                
            </div>
        </div>
        <div class="intro__bottomline r">
            <div class="intro__contacts">
                <div class="contacts">
                    <h3>Контакты</h3>
                    <div class="contacts__email">
                        <a href="mailto:mail@yhunter.ru">mail@yhunter.ru</a>
                        <!--<a href="#">Отправить сообщение с сайта</a>-->
                    </div>
                    <div class="contacts__tel">
                        <a href="tel:+79028358830">+7-902-83-588-30</a>
                    </div>
                    <div class="contacts__messengers">
                        <a href="" class="contacts__icon tg"><span>telegram</span></a>
                        <a href="" class="contacts__icon vb"><span>viber</span></a>
                    </div>
                    <div class="contacts__social">
                        <a href="https://codepen.io/yhunter" class="contacts__icon cp"><span>codepen</span></a>
                        <a href="https://500px.com/yhunter" class="contacts__icon px"><span>500px</span></a>
                        <a href="https://www.instagram.com/_yhunter_/"
                            class="contacts__icon ig"><span>instagram</span></a>
                        <a href="https://www.youtube.com/channel/UCuIyI522EgSfT5W6qtmW61Q"
                            class="contacts__icon yb"><span>youtube</span></a>
                        <a href="https://www.last.fm/user/yhunter" class="contacts__icon fm"><span>last.fm</span></a>
                    </div>
                </div>

            </div>
            <div class="intro__portfolio">
                <div class="port">
                    <div class="port__slider">
                        <?php 
                        $args = array(
                        'posts_per_page' => 8,
                        'post_type' => 'works',
                        'orderby' => 'date'
                        );
                        $query = new WP_Query( $args );
                     
                        if($query->have_posts()) : while($query->have_posts()) : $query->the_post(); 
                    
                    
                        ?>

                        <a href="<?php the_permalink(); ?>">
                            <img src="<?php if ( has_post_thumbnail() ) { $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium'); echo $large_image_url[0]; } // Проверяем наличие миниатюры, если есть показываем ?>"
                                alt="<?php the_title(); ?>" skip_lazy>
                            <h3><?php the_title(); ?></h3>
                        </a>

                        <?php endwhile; // Конец цикла.
					    else:  endif; ?>
                        <?php wp_reset_query(); ?>
                                            </div>
                </div>

                <div class="intro__portlink">
                    Другие работы <a href="/portfolio/">в портфолио</a>
                </div>

            </div>
        </div>
    </section>

    <section class="w blog">
        <div class="blog__header xs12 md4">
            <h3>Свежее в <a href="/blog/">Блоге</a></h3>
        </div>
        <div class="blog__line  xs12 md12">
            <div class="r">
                <?php 
					$query = new WP_Query("posts_per_page=3&post-type=post");
				 
					if($query->have_posts()) : while($query->have_posts()) : $query->the_post(); 
				
				
					?>
                <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting"
                    class="blog__item item">
                    <a href="<?php the_permalink(); ?>">

                        <img class="item__pic"
                            src="<?php if ( has_post_thumbnail() ) { $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large'); echo $large_image_url[0]; } // Проверяем наличие миниатюры, если есть показываем ?>"
                            alt="<?php the_title(); ?>">

                        <!--<?php echo wp_get_attachment_image( get_post_thumbnail_id(), array('250', '350'), "", array( "class" => "item__pic" ) );  ?>-->


                        <h2 class="item__header header"><?php the_title(); ?></h2>
                        <div class="item__date date">
                            <?php the_time('j F, Y'); // Дата создания поста ?>
                        </div>
                        <div class="item__text text">
                            <?php the_excerpt(''); // Выводим анонс ?>
                        </div>
                    </a>

                </article>


                <?php endwhile; // Конец цикла.
					else:  endif; // Если записей нет - извиняемся ?>
                <?php wp_reset_query(); ?>
                            </div>
        </div>
        
    </section>

    <section class="about r" id="about">
        <div class="about__header xs12 md4">
            <h3>Обо мне</h3>
        </div>
        <div class="about__main  xs12 md6 bigtext">
            <div>
                <?php the_field('about');?>
                            </div>

        </div>
        <div class="xs12 md4">
            <h3>Разработка</h3>
        </div>
        <div class="about__main  xs12 md6 lb">
            <?php the_field('dev');?>
            
        </div>
        <div class="about__skills xs12 md12 skills">
            <div class="r">
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/html.svg" alt="">
                    HTML5
                    <div class="skills__points skill" data-fill="85%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/css.svg" alt="">
                    CSS3/SASS
                    <div class="skills__points skill" data-fill="85%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/js.svg" alt="">
                    JS
                    <div class="skills__points skill" data-fill="70%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/website.svg" alt="">
                    Верстка нестандартных UI
                    <div class="skills__points skill" data-fill="90%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/wordpress.svg" alt="">
                    14 лет с WordPress
                    <div class="skills__points skill" data-fill="90%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/react.svg" alt="">
                    Фронтэнд-разработка, React
                    <div class="skills__points skill" data-fill="45%"></div>
                </div>
            </div>
        </div>
        <div class="xs12 md4">
            <h3>Дизайн</h3>
        </div>
        <div class="about__main  xs12 md6 lb">
            <?php the_field('design');?>
                    </div>
        <div class="about__skills xs12 md12  skills">
            <div class="r">
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/tablet.svg" alt="">
                    UX/UI
                    <div class="skills__points skill" data-fill="85%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/fg.svg" alt="">
                    Figma
                    <div class="skills__points skill" data-fill="50%"></div>
                </div>

                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/psd.svg" alt="">
                    Photoshop
                    <div class="skills__points skill" data-fill="90%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/il.svg" alt="">
                    Illustrator
                    <div class="skills__points skill" data-fill="60%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/ai.svg" alt="">
                    Нейросети
                    <div class="skills__points skill" data-fill="50%"></div>
                </div>
                <div class="skills__item">
                    <img src="/wp-content/themes/yhunter-4/img/ani.svg" alt="">
                    Анимация
                    <div class="skills__points skill" data-fill="50%"></div>
                </div>
            </div>
        </div>
        <div class="xs12 md4">
            <h3>Софт-скиллз</h3>
        </div>
        <div class="about__main  xs12 md6 lb">
            <?php the_field('soft-skills');?>
            

        </div>

        <div class="xs12 md4">
            <h3>А что еще?</h3>
        </div>
        <div class="about__main  xs12 md6 lb">
            <?php the_field('add');?>
            

        </div>
    </section>



</div>

<?php get_footer(); // Подключаем футер ?>


