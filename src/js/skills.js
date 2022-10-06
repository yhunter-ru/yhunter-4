window.onload = function () {  

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

      $(".skills .skill").html("<div></div>");

    }
   
    ResetSkills();  
    
    function ShowSkills()  {   
      $(".skills .skill > div").addClass('skill-line');
      $(".skills .skill").each(
        function() {
          $(this).find("div").width($(this).data("fill"));
        }
      );
    }
   
  }; 
  