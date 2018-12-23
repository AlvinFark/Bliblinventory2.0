$( document ).ready(function() {
    //tampilkan semua produk mgn ajax
    ajaxGetAllProduct();
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

    //ketika ada card barang yang diklik
    $( document ).on("click",".modal-trigger",function () {
       var idBarang = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
       ajaxGetProductDetail(idBarang);
    });

    //ketika merubah dropdown urutkan
    $( document ).on("change","#selectUrutkan",function (){
        getProductBySortAndSearch();
    });

    //ketika search barang
    $( document ).on("click","#iconSearch",function (){
        getProductBySortAndSearch();
    });
});

//membuat url untuk sorting dan searching
function getProductBySortAndSearch() {
    var url;
    var keyword = $("#inputSearch").val();
    var indexSelected = $("#selectUrutkan").prop('selectedIndex');
    if(indexSelected==0){
        url = window.location+"/sortByName/" + keyword;
    }
    else if(indexSelected==1){
        url = window.location+"/sortByCode/" + keyword;
    }
    ajaxGetProductCustom(url);
}

//tampilkan semua product
function ajaxGetAllProduct(){
    $.ajax({
        type : "GET",
        url : window.location + "/getAllProduct",
        success: function(result){
            $("#includeDaftarBarangCard").load("daftarBarangCard.html",function () {
                $("#daftarProduk").html('');
                //tampilkan setiap barang dalam bentuk card
                for(var i = 0; i < result.length; i++){
                    $("#daftarProduk").append('' +
                        '<a class="col s6 l2 m3 modal-trigger" href="#modalDetailPinjam">\n' +
                        '<div class="card">\n' +
                        '<div class="card-image">\n' +
                        '<img src="'+result[i].gambar+'" style="height:203px; width:100%">\n' +
                        '</div>\n' +
                        '<div class="card-content">\n' +
                        '<p>'+result[i].kode+'</p>\n' +
                        '<p>'+result[i].nama+'</p>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '</a>');
                }
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

//dapatkan detail barang (lewat kode barang)
function ajaxGetProductDetail(idBarang) {
    //tampilkan popup detail barang
    $.ajax({
        type : "GET",
        url : window.location + "/getDetailProduct/" + idBarang,
        success: function(result){
            $("#detailBarangCard").html('<div>\n' +
                '<img src="'+result.gambar+'" style="height:300px; width:auto"/>\n' +
                '</div>\n' +
                '<div>\n' +
                '<table class="tableNoBorder">\n' +
                '<tr>\n' +
                '<td class="tdAtrib" width="120">Kode</td>\n' +
                '<td class="tdInfo">'+result.kode+'</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Nama Barang</td>\n' +
                '<td class="tdInfo">'+result.nama+'</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Kuantitas</td>\n' +
                '<td class="tdInfo" id="totalSubBarang"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Kuantitas Tersedia</td>\n' +
                '<td class="tdInfo" id="totalSubBarangTersedia"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Deskripsi</td>\n' +
                '<td class="tdInfo" style="height: 185px; overflow-y: scroll;">'+result.deskripsi+'</td>\n' +
                '</tr>\n' +
                '</table>\n' +
                '</div>');

        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });

    //tampilkan total sub kuantitas barang
    $.ajax({
        type : "GET",
        url : window.location + "/countAllSubBarang/" + idBarang,
        success: function(result){
            $("#totalSubBarang").html(result + ' unit');
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });

    //tampilkan total kuantitas sub barang yang TERSEDIA
    $.ajax({
        type : "GET",
        url : window.location + "/countReadySubBarang/" + idBarang,
        success: function(result){
            $("#totalSubBarangTersedia").html(result + ' unit');
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

//tampilkan hasil sorting maupun searching product
function ajaxGetProductCustom(url){
    $.ajax({
        type : "GET",
        url : url,
        success: function(result){
            $("#daftarProduk").html('');
            //tampilkan setiap barang dalam bentuk card
            for(var i = 0; i < result.length; i++){
                $("#daftarProduk").append('' +
                    '<a class="col s6 l2 m3 modal-trigger" href="#modalDetailPinjam">\n' +
                    '<div class="card">\n' +
                    '<div class="card-image">\n' +
                    '<img src="'+result[i].gambar+'" style="height:203px; width:100%">\n' +
                    '</div>\n' +
                    '<div class="card-content">\n' +
                    '<p>'+result[i].kode+'</p>\n' +
                    '<p>'+result[i].nama+'</p>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '</a>');
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}