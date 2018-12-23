$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.datepicker').datepicker();
    $("#includeManualOrder").load("buatPermintaanPeminjamanManual.html");

    //session penanda tiap page, supaya kalau refresh, tetap berada di page-nya
    var page = $.session.get('page');
    if(page == null || page == 1) {
        page1();
    }
    else if(page == 2){
        page2();
    }

    $("#klikDaftarBarang").click(function(){
        $.session.set('page','1');
       page1();
    });

    $("#klikDaftarOrder").click(function(){
        $.session.set('page','2');
        page2();
    });

    $(".imgLogo").click(function(){
        $.session.set('page','1');
        page1();
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
