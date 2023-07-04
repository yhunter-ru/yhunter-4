document.addEventListener('DOMContentLoaded', function(){
    document.querySelector(".tiles__container").appendChild(document.querySelector(".tiles__wrapper").cloneNode(true));
    document.querySelectorAll(".tiles__wrapper").forEach(box => 
        box.classList.add("tiles__animation")  
    );
});