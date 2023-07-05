<?php
/**
 * Чистый Шаблон для разработки
 * Функции шаблона
 * http://dontforget.pro
 * @package WordPress
 * @subpackage clean
 */
register_nav_menus( array( // Регистрируем 2 меню
	'top' => 'Main menu'
) );
add_theme_support('post-thumbnails'); // Включаем поддержку миниатюр
set_post_thumbnail_size(320, 320); // Задаем размеры миниатюре

if ( function_exists('register_sidebar') )
register_sidebar(); // Регистрируем сайдбар


//Disable emoji support
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

?>

<?php
//Словоформы после числительных
function plural_form($number, $after, $separator = '') {
	$cases = array (2, 0, 1, 1, 1, 2);
	global $worksform;
	$worksform=$after[ ($number%100>4 && $number%100<20)? 2: $cases[min($number%10, 5)] ];
	return $number.$separator.$worksform;
}

//Шорткоды для главной


function yearsOfExp() {
	$exp = date('Y')-2005; //Текущий год минус начало работы в 2005
	$years = plural_form(
	$exp,
	/* варианты написания для количества 1, 2 и 5 */
	array('-го года','-х лет','-и лет')
	);
	return $years;
}

add_shortcode('years-of-exp', 'yearsOfExp');

function portfolioCount() {
	$count_works = wp_count_posts('works') -> publish;
	$works = plural_form(
	$count_works,
	/* варианты написания для количества 1, 2 и 5 */
	array('работа','работы','работ'),	
	'&nbsp;'
	);
	return $works;
}

add_shortcode('portfolio-count', 'portfolioCount');


//Галерея

add_filter('post_gallery', 'my_post_gallery', 10, 2);
function my_post_gallery($output, $attr) {
    global $post, $GalleryNum;
	$GalleryNum++;

    if (isset($attr['orderby'])) {
        $attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
        if (!$attr['orderby'])
            unset($attr['orderby']);
    }

    extract(shortcode_atts(array(
        'order' => 'ASC',
        'orderby' => 'menu_order ID',
        'id' => $post->ID,
        'itemtag' => 'dl',
        'icontag' => 'dt',
        'captiontag' => 'dd',
        'columns' => 3,
        'size' => 'thumbnail',
        'include' => '',
        'exclude' => ''
    ), $attr));

    $id = intval($id);
    if ('RAND' == $order) $orderby = 'none';

    if (!empty($include)) {
        $include = preg_replace('/[^0-9,]+/', '', $include);
        $_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));

        $attachments = array();
        foreach ($_attachments as $key => $val) {
            $attachments[$val->ID] = $_attachments[$key];
        }
    }

    if (empty($attachments)) return '';

    // Here's your actual output, you may customize it to your need
    $output = "<div class=\"wp-gallery\">\n";


    // Now you loop through each attachment
    foreach ($attachments as $id => $attachment) {
        // Fetch the thumbnail (or full image, it's up to you)
      $thumb = wp_get_attachment_image_src($id, 'thumbnail');
//      $img = wp_get_attachment_image_src($id, 'my-custom-image-size');
        $img = wp_get_attachment_image_src($id, 'large');
		$title = $attachment->post_title;

        $output .= "<div class=\"wp-gallery__thumb\">\n";
        $output .= "<a href=\"{$img[0]}\" rel=\"gallery{$GalleryNum}\" title=\"{$title}\"><img src=\"{$thumb[0]}\"   title=\"{$title}\"  alt=\"{$title}\" /></a>\n";
        $output .= "</div>\n";
    }


    $output .= "</div>\n";

    return $output;
}



add_action('admin_init', 'gpm_add_meta_boxes', 2);

function gpm_add_meta_boxes() {
    add_meta_box( 'gpminvoice-group', 'Custom Repeatable', 'Repeatable_meta_box_display', 'page', 'normal', 'default');
}

function Repeatable_meta_box_display() {
    global $post;
    $gpminvoice_group = get_post_meta($post->ID, 'customdata_group', true);
     wp_nonce_field( 'gpm_repeatable_meta_box_nonce', 'gpm_repeatable_meta_box_nonce' );
    ?>
<script type="text/javascript">
	jQuery(document).ready(function ($) {
		$('#add-row').on('click', function () {
			var row = $('.empty-row.screen-reader-text').clone(true);
			row.removeClass('empty-row screen-reader-text');
			row.insertBefore('#repeatable-fieldset-one tbody>tr:last');
			return false;
		});

		$('.remove-row').on('click', function () {
			$(this).parents('tr').remove();
			return false;
		});
	});
</script>
<table id="repeatable-fieldset-one" width="100%">
	<tbody>
		<?php
     if ( $gpminvoice_group ) :
      foreach ( $gpminvoice_group as $field ) {
    ?>
		<tr>
			<td width="15%">
				<input type="text" placeholder="Title" name="TitleItem[]"
					value="<?php if($field['TitleItem'] != '') echo esc_attr( $field['TitleItem'] ); ?>" /></td>
			<td width="70%">
				<textarea placeholder="Description" cols="55" rows="5"
					name="TitleDescription[]"> <?php if ($field['TitleDescription'] != '') echo esc_attr( $field['TitleDescription'] ); ?> </textarea>
			</td>
			<td width="15%"><a class="button remove-row" href="#1">Remove</a></td>
		</tr>
		<?php
    }
    else :
    // show a blank one
    ?>
		<tr>
			<td>
				<input type="text" placeholder="Title" title="Title" name="TitleItem[]" /></td>
			<td>
				<textarea placeholder="Description" name="TitleDescription[]" cols="55" rows="5">  </textarea>
			</td>
			<td><a class="button  cmb-remove-row-button button-disabled" href="#">Remove</a></td>
		</tr>
		<?php endif; ?>

		<!-- empty hidden one for jQuery -->
		<tr class="empty-row screen-reader-text">
			<td>
				<input type="text" placeholder="Title" name="TitleItem[]" /></td>
			<td>
				<textarea placeholder="Description" cols="55" rows="5" name="TitleDescription[]"></textarea>
			</td>
			<td><a class="button remove-row" href="#">Remove</a></td>
		</tr>
	</tbody>
</table>
<p><a id="add-row" class="button" href="#">Add another</a></p>
<?php
}
add_action('save_post', 'custom_repeatable_meta_box_save');
function custom_repeatable_meta_box_save($post_id) {
    if ( ! isset( $_POST['gpm_repeatable_meta_box_nonce'] ) ||
    ! wp_verify_nonce( $_POST['gpm_repeatable_meta_box_nonce'], 'gpm_repeatable_meta_box_nonce' ) )
        return;

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
        return;

    if (!current_user_can('edit_post', $post_id))
        return;

    $old = get_post_meta($post_id, 'customdata_group', true);
    $new = array();
    $invoiceItems = $_POST['TitleItem'];
    $prices = $_POST['TitleDescription'];
     $count = count( $invoiceItems );
     for ( $i = 0; $i < $count; $i++ ) {
        if ( $invoiceItems[$i] != '' ) :
            $new[$i]['TitleItem'] = stripslashes( strip_tags( $invoiceItems[$i] ) );
             $new[$i]['TitleDescription'] = stripslashes( $prices[$i] ); // and however you want to sanitize
        endif;
    }
    if ( !empty( $new ) && $new != $old )
        update_post_meta( $post_id, 'customdata_group', $new );
    elseif ( empty($new) && $old )
        delete_post_meta( $post_id, 'customdata_group', $old );




}