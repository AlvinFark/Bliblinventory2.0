$( document ).ready(function() {
    if(window.location.pathname == "/employee"){
        $("body").load("homeEmployee.html");
    }
    else if(window.location.pathname == "/admin")
        $("body").load("homeAdmin.html");
    else
        $("body").load("homeSuperior.html");
    
});