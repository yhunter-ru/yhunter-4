<?php get_header();?>
<div class="w add-spacer frontpage">
    <section class="intro">
        <div class="intro__topline r">
            <div class="intro__photo">
                <img src="/wp-content/themes/yhunter-4/img/yuri.jpg" alt="Юрий Баранов">
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
            <h3>Свежее в <a href="/c/blog/">Блоге</a></h3>
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
        <div class="blog__freq xs12 freq" style="display: none;">
            <div class="freq__cloud">


                <a href="https://www.yhunter.ru/tag/backend/" class="tag-cloud-link tag-link-80 tag-link-position-1"
                    style="font-size: 13.079646017699pt;" aria-label="backend (17 элементов)">backend</a>
                <a href="https://www.yhunter.ru/tag/css/" class="tag-cloud-link tag-link-102 tag-link-position-2"
                    style="font-size: 19.274336283186pt;" aria-label="css (57 элементов)">css</a>
                <a href="https://www.yhunter.ru/tag/flash/" class="tag-cloud-link tag-link-19 tag-link-position-3"
                    style="font-size: 13.575221238938pt;" aria-label="flash (19 элементов)">flash</a>
                <a href="https://www.yhunter.ru/tag/frontend/" class="tag-cloud-link tag-link-72 tag-link-position-4"
                    style="font-size: 20.141592920354pt;" aria-label="frontend (67 элементов)">frontend</a>
                <a href="https://www.yhunter.ru/tag/html/" class="tag-cloud-link tag-link-101 tag-link-position-5"
                    style="font-size: 19.769911504425pt;" aria-label="html (62 элемента)">html</a>
                <a href="https://www.yhunter.ru/tag/jquery/" class="tag-cloud-link tag-link-103 tag-link-position-6"
                    style="font-size: 16.176991150442pt;" aria-label="jquery (31 элемент)">jquery</a>
                <a href="https://www.yhunter.ru/tag/ui/" class="tag-cloud-link tag-link-74 tag-link-position-7"
                    style="font-size: 20.389380530973pt;" aria-label="ui (70 элементов)">ui</a>
                <a href="https://www.yhunter.ru/tag/wordpress/" class="tag-cloud-link tag-link-81 tag-link-position-8"
                    style="font-size: 18.778761061947pt;" aria-label="wordpress (51 элемент)">wordpress</a>
                <a href="https://www.yhunter.ru/tag/%d0%bf%d0%b5%d1%80%d0%bc%d1%8c/"
                    class="tag-cloud-link tag-link-48 tag-link-position-9" style="font-size: 17.53982300885pt;"
                    aria-label="Пермь (41 элемент)">Пермь</a>
                <a href="https://www.yhunter.ru/tag/%d1%81%d0%b8%d0%bd%d0%b3%d0%b0%d0%bf%d1%83%d1%80/"
                    class="tag-cloud-link tag-link-60 tag-link-position-10" style="font-size: 8pt;"
                    aria-label="Сингапур (6 элементов)">Сингапур</a>
                <a href="https://www.yhunter.ru/tag/%d1%8f%d0%bf%d0%be%d0%bd%d0%b8%d1%8f/"
                    class="tag-cloud-link tag-link-57 tag-link-position-11" style="font-size: 15.185840707965pt;"
                    aria-label="Япония (26 элементов)">Япония</a>
                <a href="https://www.yhunter.ru/tag/%d1%8f%d0%bf%d0%be%d0%bd%d0%b8%d1%8f-2010/"
                    class="tag-cloud-link tag-link-65 tag-link-position-12" style="font-size: 9.858407079646pt;"
                    aria-label="Япония-2010 (9 элементов)">Япония-2010</a>
                <a href="https://www.yhunter.ru/tag/%d1%8f%d0%bf%d0%be%d0%bd%d0%b8%d1%8f-2014/"
                    class="tag-cloud-link tag-link-67 tag-link-position-13" style="font-size: 8pt;"
                    aria-label="Япония-2014 (6 элементов)">Япония-2014</a>
                <a href="https://www.yhunter.ru/tag/adaptive/" class="tag-cloud-link tag-link-104 tag-link-position-14"
                    style="font-size: 14.070796460177pt;" aria-label="адаптивная верстка (21 элемент)">адаптивная
                    верстка</a>
                <a href="https://www.yhunter.ru/tag/%d0%b0%d0%bd%d0%b8%d0%bc%d0%b5/"
                    class="tag-cloud-link tag-link-23 tag-link-position-15" style="font-size: 14.318584070796pt;"
                    aria-label="аниме (22 элемента)">аниме</a>
                <a href="https://www.yhunter.ru/tag/veb-dizajn/" class="tag-cloud-link tag-link-71 tag-link-position-16"
                    style="font-size: 20.513274336283pt;" aria-label="веб-дизайн (71 элемент)">веб-дизайн</a>
                <a href="https://www.yhunter.ru/tag/%d0%b2%d0%b8%d0%b4%d0%b5%d0%be/"
                    class="tag-cloud-link tag-link-40 tag-link-position-17" style="font-size: 9.2389380530973pt;"
                    aria-label="видео (8 элементов)">видео</a>
                <a href="https://www.yhunter.ru/tag/dizajn-veshhej/"
                    class="tag-cloud-link tag-link-89 tag-link-position-18" style="font-size: 8.6194690265487pt;"
                    aria-label="дизайн вещей (7 элементов)">дизайн вещей</a>
                <a href="https://www.yhunter.ru/tag/%d0%b5%d0%ba%d0%b0%d1%82%d0%b5%d1%80%d0%b8%d0%bd%d0%b1%d1%83%d1%80%d0%b3/"
                    class="tag-cloud-link tag-link-41 tag-link-position-19" style="font-size: 8.6194690265487pt;"
                    aria-label="екатеринбург (7 элементов)">екатеринбург</a>
                <a href="https://www.yhunter.ru/tag/%d0%ba%d0%b0%d0%bb%d0%b5%d0%bd%d0%b4%d0%b0%d1%80%d1%8c/"
                    class="tag-cloud-link tag-link-66 tag-link-position-20" style="font-size: 9.2389380530973pt;"
                    aria-label="календарь (8 элементов)">календарь</a>
                <a href="https://www.yhunter.ru/tag/%d0%ba%d0%be%d0%bd%d1%86%d0%b5%d1%80%d1%82%d1%8b/"
                    class="tag-cloud-link tag-link-39 tag-link-position-21" style="font-size: 17.044247787611pt;"
                    aria-label="концерты (37 элементов)">концерты</a>
                <a href="https://www.yhunter.ru/tag/logotipy/" class="tag-cloud-link tag-link-88 tag-link-position-22"
                    style="font-size: 9.858407079646pt;" aria-label="логотипы (9 элементов)">логотипы</a>
                <a href="https://www.yhunter.ru/tag/%d0%bc%d0%b5%d1%80%d0%be%d0%bf%d1%80%d0%b8%d1%8f%d1%82%d0%b8%d1%8f/"
                    class="tag-cloud-link tag-link-58 tag-link-position-23" style="font-size: 15.929203539823pt;"
                    aria-label="мероприятия (30 элементов)">мероприятия</a>
                <a href="https://www.yhunter.ru/tag/%d0%bc%d0%be%d0%b5/"
                    class="tag-cloud-link tag-link-26 tag-link-position-24" style="font-size: 21.380530973451pt;"
                    aria-label="мое (84 элемента)">мое</a>
                <a href="https://www.yhunter.ru/tag/%d0%bc%d1%83%d0%b7%d1%8b%d0%ba%d0%b0/"
                    class="tag-cloud-link tag-link-52 tag-link-position-25" style="font-size: 16.920353982301pt;"
                    aria-label="музыка (36 элементов)">музыка</a>
                <a href="https://www.yhunter.ru/tag/%d0%bf%d0%bb%d0%b0%d0%bd%d1%88%d0%b5%d1%82/"
                    class="tag-cloud-link tag-link-16 tag-link-position-26" style="font-size: 8.6194690265487pt;"
                    aria-label="планшет (7 элементов)">планшет</a>
                <a href="https://www.yhunter.ru/tag/%d0%bf%d1%83%d1%82%d0%b5%d1%88%d0%b5%d1%81%d1%82%d0%b2%d0%b8%d1%8f/"
                    class="tag-cloud-link tag-link-56 tag-link-position-27" style="font-size: 14.814159292035pt;"
                    aria-label="путешествия (24 элемента)">путешествия</a>
                <a href="https://www.yhunter.ru/tag/texdizajn/" class="tag-cloud-link tag-link-86 tag-link-position-28"
                    style="font-size: 8pt;" aria-label="техдизайн (6 элементов)">техдизайн</a>
                <a href="https://www.yhunter.ru/tag/%d1%84%d0%be%d1%82%d0%be/"
                    class="tag-cloud-link tag-link-36 tag-link-position-29" style="font-size: 22pt;"
                    aria-label="фото (94 элемента)">фото</a>
                <a href="https://www.yhunter.ru/tag/%d1%84%d0%be%d1%82%d0%be%d1%88%d0%be%d0%bf/"
                    class="tag-cloud-link tag-link-51 tag-link-position-30" style="font-size: 11.716814159292pt;"
                    aria-label="фотошоп (13 элементов)">фотошоп</a>
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
                    <img src="/wp-content/themes/yhunter-4/img/xd.svg" alt="">
                    Adobe XD
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


