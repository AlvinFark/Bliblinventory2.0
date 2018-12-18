$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();

    $(".clickDetailTable").click(function(){
        $("#editBarangTable").hide();
        $("#tambahSatuanTable").hide();
        $("#detailBarangTable").show();
        $("#backToDetailTable").hide();
        $("#tombolSimpanEditan").hide();
        $("#tombolSimpanSatuan").hide();
        $("#tombolEditBarang").show();
        $("#clickTambahSatuan").show();
    });

    $(".clickEditTable").click(function(){
        $("#editBarangTable").show();
        $("#tambahSatuanTable").hide();
        $("#detailBarangTable").hide();
        $("#backToDetailTable").show();
        $("#tombolSimpanEditan").show();
        $("#tombolSimpanSatuan").hide();
        $("#tombolEditBarang").hide();
        $("#clickTambahSatuan").hide();
    })

    $("#clickTambahSatuan").click(function(){
        $("#editBarangTable").hide();
        $("#tambahSatuanTable").show();
        $("#detailBarangTable").hide();
        $("#backToDetailTable").show();
        $("#tombolSimpanEditan").hide();
        $("#tombolSimpanSatuan").show();
        $("#tombolEditBarang").hide();
        $("#clickTambahSatuan").hide();
    })
    

});
