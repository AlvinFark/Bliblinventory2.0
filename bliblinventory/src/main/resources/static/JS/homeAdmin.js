$( document ).ready(function() {
  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
  $('.sidenav').sidenav();
  $("#includeDaftarBarangTable").load("daftarBarangTable.html"); 
  $("#includeDaftarKaryawan").load("daftarKaryawan.html"); 
  $("#includePengembalianBarang").load("pengembalianBarang.html"); 
  $("#includePermintaanKaryawan").load("permintaanKaryawanToAssign.html");
  $("#includeDaftarBarangTable").hide();
  //$("#includeDaftarKaryawan").hide();
  $("#includePengembalianBarang").hide();
  $("#includePermintaanKaryawan").hide();
  
  $("#klikDaftarBarang").click(function(){
    $("#includeDaftarBarangTable").fadeIn();
    $("#includeDaftarKaryawan").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikDaftarKaryawan").click(function(){
    $("#includeDaftarKaryawan").fadeIn();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikPengembalianBarang").click(function(){
    $("#includeDaftarKaryawan").fadeOut();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeIn();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikPermintaanKaryawan").click(function(){
    $("#includeDaftarKaryawan").fadeOut();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeIn();
  });

  $('select').formSelect();
  $('.modal').modal();

  $(".card").hover(function(){
    $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
  });

});