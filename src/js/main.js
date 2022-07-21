@import './menu.js';
@import '../../node_modules/slick-carousel/slick/slick.js';
@import '../../node_modules/slick-lightbox/dist/slick-lightbox.js';
@import '../../node_modules/rellax/rellax.js';
@import '../../node_modules/jquery-viewport-checker/src/jquery.viewportchecker.js';
@import './accordeon.js';

$(window).on('load', function(){
    $('.left').addClass("jump-left").viewportChecker({
        classToAdd: 'left-show',
        offset: 100,
        repeat: true
    });

    $('.right').addClass("jump-right").viewportChecker({
        classToAdd: 'right-show',
        offset: 100,
        repeat: true
    });
});

@import '../../node_modules/inputmask/dist/jquery.inputmask.js';
