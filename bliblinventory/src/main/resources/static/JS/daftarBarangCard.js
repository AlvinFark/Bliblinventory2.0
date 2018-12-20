$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
 
    $(".card").hover(function(){
        $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });



    $("#buttonRequestPinjam").hide();
    $("#buttonBackToDetailCard").hide();
    $("#pinjamBarang").hide();

    $(".card").click(function(){
        $("#pinjamBarang").hide();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").hide();
        $("#buttonPinjam").show();
        $("#detailBarangCard").show();
    });

    $("#buttonPinjam").click(function(){
        $("#pinjamBarang").fadeIn();
        $("#buttonRequestPinjam").show();
        $("#buttonBackToDetailCard").fadeIn();
        $("#buttonPinjam").hide();
        $("#detailBarangCard").fadeOut();
    });

    $("#buttonBackToDetailCard").click(function(){
        $("#pinjamBarang").fadeOut();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").fadeOut();
        $("#buttonPinjam").show();
        $("#detailBarangCard").fadeIn();
    });
});
