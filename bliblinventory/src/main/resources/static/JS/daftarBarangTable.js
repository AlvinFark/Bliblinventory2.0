$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();

    $("#includeDetailBarangAdmin").load("detailBarangAdmin.html"); 
    $("#includeTambahBarang").load("tambahBarang.html"); 
    $("#includeDetailBarangAdmin").hide();
    $("#includeTambahBarang").hide();
    $("#closeDetailBarangAdmin").hide();
 
    $("#clickDetailAdmin").click(function(){
        $("#includeDetailBarangAdmin").fadeIn();
        $("#closeDetailBarangAdmin").fadeIn();
    });

    $("#tombolAdd").click(function(){
        $("#includeTambahBarang").fadeIn();
        $("#closeDetailBarangAdmin").fadeIn();
    });
    
    $("#closeDetailBarangAdmin").click(function(){
        $("#includeDetailBarangAdmin").fadeOut();
        $("#includeTambahBarang").fadeOut();
        $("#closeDetailBarangAdmin").fadeOut();
    });
});
