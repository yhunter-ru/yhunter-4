$(document).ready(function(){ 
	var touch 	= $('#touch-menu');
	var nav 	= $('body > nav');

	$(touch).on('click', function(e) {
		e.preventDefault();
    nav.toggleClass("show-nav");
		//menu.slideToggle();
	});
	
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 767 && nav.hasClass("show-nav")) {
			nav.removeClass('show-nav');
		}
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
	
});