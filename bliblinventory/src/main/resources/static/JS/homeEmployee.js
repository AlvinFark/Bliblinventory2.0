$( document ).ready(function() {
    $("#includePageContent").load("daftarBarangCard.html");

    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.datepicker').datepicker();
    $("#includeOrderList").load("orderList.html");
    $("#includeManualOrder").load("buatPermintaanPeminjamanManual.html");
    $("#includeOrderList").hide();
    $("#includeManualOrder").hide();

    $("#klikDaftarBarang").click(function(){
        $("#includeDaftarBarangCard").fadeIn();
        $("#includeOrderList").fadeOut();
        $("#includeManualOrder").fadeOut();
    });

    $("#klikDaftarOrder").click(function(){
        $("#includeDaftarBarangCard").fadeOut();
        $("#includeOrderList").fadeIn();
        $("#includeManualOrder").fadeOut();
    });

    $("#imgLogo").click(function(){
        $("#includeDaftarBarangCard").fadeIn();
        $("#includeOrderList").fadeOut();
        $("#includeManualOrder").fadeOut();
    });
});
