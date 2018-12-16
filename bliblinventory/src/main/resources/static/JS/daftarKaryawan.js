$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();
 
    $(".card").hover(function(){
        $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });

    $("#buttonRequestPinjam").hide();
    $("#buttonBackToDetailCard").hide();
    $("#ubahDetailKaryawan").hide();

    $(".card").click(function(){
        $("#pinjamBarang").hide();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").hide();
        $("#buttonPinjam").show();
        $("#detailBarangCard").show();
    });

    $("#buttonUbahDetail").click(function(){
        $("#ubahDetailKaryawan").fadeIn();
        $("#buttonRequestPinjam").show();
        $("#buttonBackToDetailCard").fadeIn();
        $("#buttonUbahDetail").hide();
        $("#detailBarangCard").fadeOut();
    });

    $("#buttonBackToDetailCard").click(function(){
        $("#ubahDetailKaryawan").fadeOut();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").fadeOut();
        $("#buttonPinjam").show();
        $("#detailBarangCard").fadeIn();
    });
});
