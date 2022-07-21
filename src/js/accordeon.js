$(function(){
  // hide all content
  $('.ans').hide();
  
  $('.ask').click(function(){
    $(this).parent().toggleClass('acc').siblings().removeClass('acc');
    $('.ans').slideUp();
    
    if(!$(this).next().is(":visible")) {
			$(this).next().slideDown();
		}
  });
});