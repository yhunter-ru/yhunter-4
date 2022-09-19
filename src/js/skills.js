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

window.onload = function () {  
    const skillsElements = document.querySelectorAll('.skill');


    $('.skills').viewportChecker({
      classToAdd: 'show',
      offset: 100,
      repeat: true,
      callbackFunction: function(elem, action){
        if (action=='add') {
          ShowSkills();
        }
        else {
          ResetSkills(); 
        }
        
      },
    });
    
    
   
    function ResetSkills() {
       for (var i = 0; i < skillsElements.length; i++) {
          skillsElements[i].innerHTML = '<div></div>';
       }
    }
   
    ResetSkills();  
    
    function ShowSkills()  {    
      for (var i = 0; i < skillsElements.length; i++) {
        console.log(skillsElements[i].dataset.fill);    
        skillsElements[i].children[0].classList.add('skill-line');    
        skillsElements[i].children[0].style.width = skillsElements[i].dataset.fill;       
      };      
    };  
  };
  
  
  
  
  
  