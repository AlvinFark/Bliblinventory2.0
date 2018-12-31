$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.sidenav').sidenav();

    //tidak dipakai
    /*
  $("#includeDaftarBarangTable").load("daftarBarangTable.html"); 
  $("#includeDaftarKaryawan").load("daftarKaryawan.html"); 
  $("#includePengembalianBarang").load("pengembalianBarang.html"); 
  $("#includePermintaanKaryawan").load("permintaanKaryawanToAssign.html");
  $("#includePermintaanKaryawan").load("permintaanKaryawan.html");
  //$("#includeDaftarBarangTable").hide();
  $("#includeDaftarKaryawan").hide();
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
*/

    $('select').formSelect();
    $('.modal').modal();

    $(".card").hover(function(){
    $(this).addClass('z-depth-3');}, function(){
        $(this).removeClass('z-depth-3');
    });

    page1();

    $("#klikDaftarBarang").click(function(){
        page1();
    });

    $("#klikPengembalianBarang").click(function(){
        page2();
    });

    $("#klikDaftarKaryawan").click(function(){
        page3();
    });

    $("#klikPermintaanKaryawan").click(function(){
        page4();
    });

    $("#klikPermintaanPembelianKaryawan").click(function(){
        page5();
    });

    $(".imgLogo").click(function(){
        page1();
    });

    $("#klikLogout").click(function(){

    });
});

function page1(){
    $("#includePageContent").load("daftarBarangTable.html");
}

function page2(){
    $("#includePageContent").load("pengembalianBarang.html");
}

function page3(){
    $("#includePageContent").load("daftarKaryawan.html");
}

function page4(){
    $("#includePageContent").load("permintaanKaryawanToAssign.html");
}

function page5(){
    $("#includePageContent").load("permintaanPembelianKaryawan.html");
}