$( document ).ready(function() {
  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
  $("#includeDaftarBarangTable").load("daftarBarangTable.html"); 
  $("#includeDaftarKaryawan").load("daftarKaryawan.html"); 
  $("#includeDaftarKaryawan").hide(); 
  
  $("#klikDaftarBarang").click(function(){
    $("#includeDaftarBarangTable").fadeIn();
    $("#includeDaftarKaryawan").fadeOut();
  });
  $("#klikDaftarKaryawan").click(function(){
    $("#includeDaftarKaryawan").fadeIn();
    $("#includeDaftarBarangTable").fadeOut();
  });
});