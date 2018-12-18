$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();
 
    $(".card").hover(function(){
        $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });

    $(".card, #buttonBackToDetailKaryawan").click(function(){
        $("#detailKaryawan").fadeIn();
        $("#ubahDetailKaryawan").hide();
        $("#buttonUbahDetailKaryawan").show();
        $("#buttonBackToDetailKaryawan").hide();
        $("#buttonSimpanUbahanKaryawan").hide();
    });

    $("#buttonUbahDetailKaryawan").click(function(){
        $("#detailKaryawan").hide();
        $("#ubahDetailKaryawan").fadeIn();
        $("#buttonUbahDetailKaryawan").hide();
        $("#buttonBackToDetailKaryawan").fadeIn();
        $("#buttonSimpanUbahanKaryawan").show();
    })

});
