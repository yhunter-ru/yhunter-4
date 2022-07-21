






<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/main.min.css?rev=0.3081553302867668">
<script>window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/main.js?rev=0.3081553302867668"></script>
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


<script>
	jQuery(document).ready(function($){  
  element='.fit';
  function textfit() {  
    $(element).each(function(index) {
      $(this).css('display', 'inline');
      $(this).css('white-space', 'nowrap');
      
      wd=$(this).width();
      wdb=$(this).parent().width();           
      wdf=parseFloat($(this).css('font-size')); 

      $(this).css('font-size', wdf*(wdb/wd));
      $(this).css('line-height', wdf*(wdb/wd)+'px');
    });
  } 
  window.onload = function() {
  	textfit(); 
  }
  jQuery(window).resize(function() { 
      textfit();
  });
});
</script>

</body>
</html>