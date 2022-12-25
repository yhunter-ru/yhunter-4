@import './menu.js';
@import '../../node_modules/slick-carousel/slick/slick.js';
@import '../../node_modules/slick-lightbox/dist/slick-lightbox.js';
@import '../../node_modules/rellax/rellax.js';
@import '../../node_modules/jquery-viewport-checker/src/jquery.viewportchecker.js';
@import './skills.js';
@import './accordeon.js';

@import '../../node_modules/inputmask/dist/jquery.inputmask.js';

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector(".tiles__container").appendChild(document.querySelector(".tiles__wrapper").cloneNode(true));
    document.querySelectorAll(".tiles__wrapper").forEach(box => 
        box.classList.add("tiles__animation")  
    );
});

$(window).on('load', function(){
    
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                variableWidth: false,
                centerMode: false,
                arrows: true,
              }
            },
          ]
      });

});
