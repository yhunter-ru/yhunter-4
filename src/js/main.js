@import './menu.js';
@import '../../node_modules/slick-carousel/slick/slick.js';
@import '../../node_modules/slick-lightbox/dist/slick-lightbox.js';
@import '../../node_modules/rellax/rellax.js';
@import '../../node_modules/jquery-viewport-checker/src/jquery.viewportchecker.js';
@import './skills.js';
@import './accordeon.js';

@import '../../node_modules/inputmask/dist/jquery.inputmask.js';


$(window).on('load', function(){
    
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
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

      $('.frontpage .port__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: false,
        variableWidth: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                variableWidth: false,
                centerMode: false,
                arrows: true
              }
            }
          },
          ]
      });

      var featuredImg = $('#featured-image');
      
      if (featuredImg.length) { 
        console.log('header image exist');
        var featuredImgWidth = featuredImg[0].naturalWidth;
        var featuredImgHeight = featuredImg[0].naturalHeight;  

        console.log(featuredImgWidth);
        console.log(featuredImgHeight);
        
        if (featuredImgWidth >= 1024) {
          $(".bigheader").removeClass("blur");
        }

        if (featuredImgHeight >= 760) {
          $(".bigheader").removeClass("thin");
        }
      }
      

});

@import './share.js';