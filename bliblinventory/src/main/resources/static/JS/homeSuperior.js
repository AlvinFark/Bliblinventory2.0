$( document ).ready(function() {
  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
  $('.sidenav').sidenav();
  $('.datepicker').datepicker();
  $("#includeDaftarBarangCard").load("daftarBarangCard.html"); 
  $("#includeOrderList").load("orderList.html"); 
  $("#includeOrderListKaryawan").load("permintaanKaryawan.html"); 
  $("#includeManualOrder").load("buatPermintaanPeminjamanManual.html"); 
  $("#includeOrderList").hide();
  $("#includeOrderListKaryawan").hide();
  $("#includeManualOrder").hide();
  
  $("#klikDaftarBarang").click(function(){
    $("#includeDaftarBarangCard").fadeIn();
    $("#includeOrderList").fadeOut();
    $("#includeOrderListKaryawan").fadeOut();
    $("#includeManualOrder").fadeOut();
  });
  
  $("#klikDaftarOrder").click(function(){
    $("#includeDaftarBarangCard").fadeOut();
    $("#includeOrderList").fadeIn();
    $("#includeOrderListKaryawan").fadeOut();
    $("#includeManualOrder").fadeOut();
  });

  $("#imgLogo").click(function(){
    $("#includeDaftarBarangCard").fadeIn();
    $("#includeOrderList").fadeOut();
    $("#includeOrderListKaryawan").fadeOut();
    $("#includeManualOrder").fadeOut();
  });

  $("#klikDaftarOrderKaryawan").click(function(){
    $("#includeDaftarBarangCard").fadeOut();
    $("#includeOrderList").fadeOut();
    $("#includeOrderListKaryawan").fadeIn();
    $("#includeManualOrder").fadeOut();
  });
});