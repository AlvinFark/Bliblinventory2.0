$( document ).ready(function() {
  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
  $('.datepicker').datepicker();
  $("#includeDaftarBarangCard").load("daftarBarangCard.html");
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