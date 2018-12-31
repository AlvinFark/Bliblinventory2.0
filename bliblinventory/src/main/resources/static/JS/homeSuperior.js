$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.datepicker').datepicker();

    var page = $.session.get('page');
    if(page == null || page == 1) {
        page1();
    }
    else if(page == 2){
        page2();
    }
    else if(page == 3){
        page3();
    }

    $("#klikDaftarBarang").click(function(){
        $.session.set('page','1');
        page1();
    });

    $("#klikDaftarOrder").click(function(){
        $.session.set('page','2');
        page2();
    });

    $("#imgLogo").click(function(){
        $.session.set('page','1');
        page1();
    });

    $("#klikDaftarOrderKaryawan").click(function(){
        $.session.set('page','3');
        page3();
    });

    $("#klikLogout").click(function(){
        $.session.remove('page');
    });
});

function page1(){
    $("#includePageContent").load("daftarBarangCard.html");
    $("#inputSearch").show();
    $("#iconSearch").show();
}

function page2(){
    $("#includePageContent").load("orderList.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

function page3(){
    $("#includePageContent").load("permintaanKaryawan.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}