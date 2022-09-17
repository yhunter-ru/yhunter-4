window.onload = function () {  
    const skillsElements = document.querySelectorAll('.skill');
    
    /* Demo Links Script */
    
    document.getElementById("ShowSkills").onclick = 
      function(e) {
        e.preventDefault();
        ShowSkills();
      };
    
    document.getElementById("ResetSkills").onclick = 
       function(e) {
        e.preventDefault();
          ResetSkills(); 
       }; 
    
    /* Demo Links Script end */
   
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
  
  
  
  
  
  