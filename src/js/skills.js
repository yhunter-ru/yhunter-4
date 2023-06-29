window.onload = function () {  

    $('.skills').viewportChecker({
      classToAdd: 'show',
      offset: 0,
      repeat: true,
      callbackFunction: function(elem, action){
        if (action=='add') {
          ShowSkills(elem);
        }
        else {
          ResetSkills(elem);           
        }        
      },
    });     
   
    function ResetSkills(elem) {
      elem.find(".skill").html("<div></div>");
    }
   
    ResetSkills($(".skills"));  
    
    function ShowSkills(elem)  {   
      $(".skills .skill > div").addClass('skill-line');
      elem.find(".skill").each(
        function() {
          $(this).find("div").width($(this).data("fill"));
        }
      );
    }
   
  }; 
  