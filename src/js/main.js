jQuery(document).ready(function() {
    jQuery('.left').addClass("jump-left").viewportChecker({
        classToAdd: 'left-show',
        offset: 100,
        repeat: true
       });

    jQuery('.right').addClass("jump-right").viewportChecker({
        classToAdd: 'right-show',
        offset: 100,
        repeat: true
       });

    $.featherlightGallery.prototype.afterContent = function() {
		  var caption = this.$currentTarget.find('img').attr('title');
		  this.$instance.find('.caption').remove();
		  $('<div class="caption">').appendTo(this.$instance.find('.featherlight-content'));
		  $('<div>').text(caption).appendTo(this.$instance.find('.caption'));
	};
});


var $window = $(window);
var $header = $('.sticky-header');
var scrolling = false;
var previousTop = 0;
var scrollDelta = 10;
var scrollOffset = 250;

$window.on('scroll', function() {
  if (!scrolling) {
    scrolling = true;

    if (!window.requestAnimationFrame) {
      setTimeout(autoHideHeader, 250);
    } else {
      requestAnimationFrame(autoHideHeader);
    }
  }
});

function autoHideHeader() {
  var currentTop = $window.scrollTop();

  if (currentTop < 10) {
    // Is at top
    $header.removeClass('is-hidden');
  } else if (previousTop - currentTop > scrollDelta) {
    // Scrolling up
    $header.removeClass('is-hidden');
  } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
    // Scrolling down
    $header.addClass('is-hidden');
  }

  previousTop = currentTop;
  scrolling = false;
}

