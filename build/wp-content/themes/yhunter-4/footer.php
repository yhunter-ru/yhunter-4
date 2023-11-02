<footer>

	<div class="footer">
		<div class="r w">
			<div class="lg2 footer__logo logo">
				<img src="/wp-content/themes/yhunter-4/img/logo-lines.svg" alt="">
			</div>
			<div class="lg2 md2 footer__menu">
				<div class="footer__header">
					Разделы сайта
				</div>
				<ul>
					<li><a href="/">Главная</a></li>
					


					<?php
					$args = array( // Выводим верхнее меню
						'menu'=>'Главное меню',
						'container'=>false,
						'depth'=> 1,
						'items_wrap' => '%3$s');
						
					wp_nav_menu($args);
				?>

				</ul>

			</div>
			<div class="xs12 md10 lg5">
				<div class="footer__header">
					Облако меток
				</div>
				<div class="footer__cloud">
					

					<?php 
							$args = array(
							'taxonomy' => array('post_tag'),
							'number'=>30
							);
	 
							wp_tag_cloud( $args );
						?>

				</div>
			</div>
			<div class="xs12 md12 lg3 contact">
				<div class="footer__header">
					Контакты
				</div>
				

				<?php the_field('footer-contacts', 11430); ?>


			</div>
			<div class="xs12 md12 footer__copy">

				

				© Юрий Баранов, 2004—<?php echo date('Y').'. v4.0 β'; ?>

			</div>
		</div>
	</div>

</footer>
</main>




<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/main.min.css?rev=0.943410130372142">

<script src="<?php echo get_template_directory_uri(); ?>/js/vendor/jquery.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/main.js?rev=0.943410130372142"></script>
<?php
/**
 * Чистый Шаблон для разработки
 * Шаблон футера
 * http://dontforget.pro
 * @package WordPress
 * @subpackage clean
 */

	wp_footer(); // Необходимо для нормальной работы плагинов
?>
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
	(function (d, w, c) {
		(w[c] = w[c] || []).push(function () {
			try {
				w.yaCounter18194194 = new Ya.Metrika({
					id: 18194194,
					clickmap: true,
					trackLinks: true,
					accurateTrackBounce: true,
					trackHash: true
				});
			} catch (e) {}
		});
		var n = d.getElementsByTagName("script")[0],
			x = "https://mc.yandex.ru/metrika/watch.js",
			s = d.createElement("script"),
			f = function () {
				n.parentNode.insertBefore(s, n);
			};
		for (var i = 0; i < document.scripts.length; i++) {
			if (document.scripts[i].src === x) {
				return;
			}
		}
		s.type = "text/javascript";
		s.async = true;
		s.src = x;
		if (w.opera == "[object Opera]") {
			d.addEventListener("DOMContentLoaded", f, false);
		} else {
			f();
		}
	})(document, window, "yandex_metrika_callbacks");
</script> <noscript>
	<div><img src="https://mc.yandex.ru/watch/18194194" style="position:absolute; left:-9999px;" alt="" /></div>
</noscript> <!-- /Yandex.Metrika counter -->


</body>

</html>