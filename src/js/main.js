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


