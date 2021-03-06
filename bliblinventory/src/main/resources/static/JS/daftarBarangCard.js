$( document ).ready(function() {
    //tampilkan semua produk
    ajaxGetAllProduct();
    //buat dropdown sesuai kategori yang ada di DB
    ajaxGetSelectKategori();

    //inisialisasi elemen-elemen yang ada
    $('select').formSelect();
    $('.modal').modal();
    $("#buttonRequestPinjam").hide();
    $("#buttonBackToDetailCard").hide();
    $("#pinjamBarang").hide();

    //jika isi dropdown berubah, maka me-load ulang tampilan dropdown-nya
    $('select').on('contentChanged', function() {
        $(this).formSelect();
    });
 
    $(".card").hover(function(){
        $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });

    //ketika tombol pinjam diklik, maka ganti konten pop up menjadi form untuk pinjam
    $("#buttonPinjam").click(function(){
        $("#pinjamBarang").fadeIn();
        $("#buttonRequestPinjam").show();
        $("#buttonBackToDetailCard").fadeIn();
        $("#buttonPinjam").hide();
        $("#detailBarangCard").fadeOut();
        $("#inputDate").val(getDateNow());
        $("#inputTotalOrder").val(1);
        $("#keteranganPinjam").val("");
    });

    //tombol untuk kembali dari form untuk pinjam ke popup detail barang
    $("#buttonBackToDetailCard").click(function(){
        $("#pinjamBarang").fadeOut();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").fadeOut();
        $("#buttonPinjam").show();
        $("#detailBarangCard").fadeIn();
    });

    //tombol kirim diklik (membuat request peminjaman barang)
    $("#buttonRequestPinjam").click(function(){
        var kodeBarang = $("#formKodePinjam").text();
        var tgPinjam = $("#inputDate").val();
        var jumlahBarang = $("#inputTotalOrder").val();
        var keteranganPinjam = $("#keteranganPinjam").val();
        var url;
        if(confirm("Kirim permintaan pinjam sejumlah "+jumlahBarang+" untuk tanggal "+changeDateFormat(tgPinjam)+"?")){
            if(keteranganPinjam=="")
                url = window.location + "/requestPinjam/" + kodeBarang + "/" + tgPinjam + "/" + jumlahBarang + "/" + null;
            else
                url = window.location + "/requestPinjam/" + kodeBarang + "/" + tgPinjam + "/" + jumlahBarang + "/" + keteranganPinjam;

            //dapatkan id transaksi setelah membuat transaksi baru
            var idTransaksi = ajaxSendRequestPinjam(url);

            //kalau superior dan request pinjamnya berhasil, requestnya langsung di-approve, dan sub barang langsung dipesankan
            if(window.location.pathname == "/superior" && idTransaksi!=0){
                ajaxBookingSubBarang(kodeBarang, jumlahBarang, idTransaksi);
            }

            $('#modalDetailPinjam').modal('close');
        }
    });

    //ketika ada card barang yang diklik
    $( document ).on("click",".productCard",function () {
        var idBarang = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
        $("#pinjamBarang").hide();
        $("#buttonRequestPinjam").hide();
        $("#buttonBackToDetailCard").hide();
        $("#buttonPinjam").show();
        $("#detailBarangCard").show();
          ajaxGetProductDetail(idBarang);
        ajaxGetFormOrder(idBarang);
    });

    //ketika merubah dropdown urutkan
    $( document ).on("change","#selectUrutkan",function (){
        getProductBySortAndSearch();
    });

    //ketika merubah dropdown kategori
    $( document ).on("change","#selectKategori",function (){
        getProductBySortAndSearch();
    });

    //ketika search barang
    $( document ).on("click","#iconSearch",function (){
        getProductBySortAndSearch();
    });
});

//menampilkan kategori yang tersedia
function ajaxGetSelectKategori(){
    $.ajax({
        type : "GET",
        url : "/api/getAllCategory",
        success: function(result){
            $("#selectKategori").html('<option value="0">Semua Kategori</option>');
            //tampilkan semua kategori dalam dropdown
            for(var i = 0; i < result.length; i++){
                $("#selectKategori").append(
                    '<option value="'+result[i].id+'">'+result[i].name+'</option>'
                );
            }
            $("#selectKategori").trigger('contentChanged');
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxGetSelectKategori");
        }
    });
}

//membuat url untuk sorting dan searching
function getProductBySortAndSearch() {
    var url;
    var keyword = $("#inputSearch").val();
    var indexSortSelected = $("#selectUrutkan").prop('selectedIndex');
    var idCategorySelected = $("#selectKategori option:selected").val();
    if(indexSortSelected==0){
        url = window.location+"/sortByName/" + idCategorySelected + "/" + keyword;
    }
    else if(indexSortSelected==1){
        url = window.location+"/sortByCode/" + idCategorySelected + "/" + keyword;
    }
    ajaxGetProductCustom(url);
}

//tampilkan semua product
function ajaxGetAllProduct(){
    $.ajax({
        type : "GET",
        url : window.location + "/getAllProduct",
        success: function(result){
            $("#daftarProduk").html('');
            //tampilkan setiap barang dalam bentuk card
            for(var i = 0; i < result.length; i++){
                $("#daftarProduk").append('' +
                    '<a class="col s6 l2 m3 modal-trigger productCard" href="#modalDetailPinjam">\n' +
                    '<div class="card">\n' +
                    '<div class="card-image" style="padding:10px">\n' +
                    '<div class="kontainerImgCard" style="' +
                    'background-image: url(http://127.0.0.1:8000/images/barang/'+result[i].gambar+');">' +
                    '</div>' +
                    '</div>\n' +
                    '<div class="card-content">\n' +
                    '<p>'+result[i].kode+'</p>\n' +
                    '<p style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">'+result[i].nama+'</p>\n' +
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

//dapatkan detail barang (lewat kode barang)
function ajaxGetProductDetail(idBarang) {

    //inisialisasi variabel untuk tampungan jumlah semua sub barang dan semua jumlah sub barang yang tesedia
    var allSubBarang = 0;
    var readySubBarang = 0;

    //hitung total sub kuantitas barang
    $.ajax({
        type : "GET",
        url : window.location + "/countAllSubBarang/" + idBarang,
        success: function(result){
            allSubBarang = result;
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        },
        async:false
    });

    //hitung total kuantitas sub barang yang tersedia saja
    $.ajax({
        type : "GET",
        url : window.location + "/countReadySubBarang/" + idBarang,
        success: function(result){
            readySubBarang = result;
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        },
        async:false
    });

    //tampilkan popup detail barang sesuai barang yang di klik
    $.ajax({
        type : "GET",
        url : window.location + "/getDetailProduct/" + idBarang,
        success: function(result){
            $("#detailBarangCard").html('' +
                '<h4 class="headerModal">Detail Barang</h4>' +
                '<div class="valign-wrapper">\n' +
                '<div class="kontainerImgModalBarang" id="detailFotoBarang"></div>' +
                '<div style="width:70%">' +
                '<table class="tableNoBorder smallPadding">\n' +
                '<tr>\n' +
                '<td class="tdAtrib" width="150px">Kode</td>\n' +
                '<td class="tdInfo">'+result.kode+'</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Nama Barang</td>\n' +
                '<td class="tdInfo">'+result.nama+'</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Kategori</td>\n' +
                '<td class="tdInfo">'+result.category.name+'</td>\n' +
                '</tr>' +
                '<tr>\n' +
                '<td class="tdAtrib">Kuantitas</td>\n' +
                '<td class="tdInfo" id="totalSubBarang">' + allSubBarang + ' unit</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Kuantitas Tersedia</td>\n' +
                '<td class="tdInfo" id="totalSubBarangTersedia">' + readySubBarang + ' unit</td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="tdAtrib">Deskripsi</td>\n' +
                '<td class="tdInfo">'+result.deskripsi+'</td>\n' +
                '</tr>\n' +
                '</table>\n' +
                '</div>' +
                '</div>');
          $("#detailFotoBarang").css({
            'background-image': 'url("http://127.0.0.1:8000/images/barang/'+result.gambar+'")'
          });
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

//buat form untuk order
function ajaxGetFormOrder(idBarang) {

    //menyiapkan form untuk order (mengosongi inputan dan tampilkan tanggal hari ini)
    $("#dateOrderNow").text(changeDateFormat(getDateNow())); //fungsi changeDateFormat() dan getDateNow() ada di basePage.js
    $('#inputDate').val(getDateNow());
    $('#inputTotalOrder').val(1);
    $('#keteranganPinjam').val("");
    $("#formKodePinjam").text(idBarang);

    //hitung sub barang yang ready
    $.ajax({
        type: "GET",
        url : window.location + "/countReadySubBarang/" + idBarang,
        success: function (result) {
            //keperluan error handling dalam penginputan input
            $(":input").bind('keyup mouseup blur focusout', function () {
                if($('#inputTotalOrder').val() > result){
                    window.alert("Barang yang tersedia hanya "+result.toString()+" unit");
                    $('#inputTotalOrder').val(result);
                }

                if(new Date($('#inputDate').val()) < new Date(getDateNow())) {
                    window.alert("Tanggal peminjaman tidak bisa dilakukan sebelum hari ini (" + changeDateFormat(getDateNow())+ ")");
                    $('#inputDate').val(getDateNow());
                }
            });
        },
        error: function (e) {
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
                    '<img src="http://127.0.0.1:8000/images/barang/'+result[i].gambar+'" style="height:203px; width:100%">\n' +
                    '</div>\n' +
                    '<div class="card-content">\n' +
                    '<p>'+result[i].kode+'</p>\n' +
                    '<p style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">'+result[i].nama+'</p>\n' +
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

//membuat dan menyimpan request pinjam ke db
function ajaxSendRequestPinjam(url) {
    var idTransaksi=0;
    if($('#inputTotalOrder').val() <= 0){
        window.alert("Jumlah minimal untuk dipinjam 1 unit");
        $('#inputTotalOrder').val(1);
    } else {
      $.ajax({
        type: "POST",
        url: url,
        success: function (result) {
          idTransaksi = result;
          window.alert("Permintaan pinjam berhasil");
        },
        error: function (e) {
          console.log("ERROR: ", e);
          window.alert("error");
        },
        async: false
      });
      return idTransaksi;
    }
}

//booking sub barang jika request peminjaman sudah disetujui
function ajaxBookingSubBarang(kodeBarang, jumlahBarang, idTransaksi) {

    //deklarasi dan inisialisasi variabel yang dibutuhkan
    var sukses = 0; //untuk cek booking-nya sukses atau tidak
    var listSubBarang; //list sub barang yang akan dibooking

    $.ajax({
        type : "POST",
        url : window.location + "/createDetailTransaksi/" + kodeBarang + "/" +jumlahBarang + "/" + idTransaksi,
        success: function(result){
            sukses=1;
            listSubBarang= result; //result berisi list subBarang yang akan dibooking
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error createDetailTransaksi");
        },
        async: false
    });

    //kalau bookingnya sukses, ubah status subBarang menjadi dipinjam (Boolean false)
    if(sukses ==1){
        for(var i =0;i<listSubBarang.length;i++){
            $.ajax({
                type : "GET",
                url : "/api/getSubBarangByKodeSubBarang/" + listSubBarang[i].kodeSubBarang,
                success: function(result){
                    $.ajax({
                        type : "PUT",
                        url : window.location + "/changeStateSubBarangToBorrowed",
                        contentType: 'application/json',
                        data: JSON.stringify(result),
                        success: function() {
                        },
                        error: function (e) {
                            console.log("ERROR: ", e);
                            window.alert("error ubah status sub barang");
                        }
                    });
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                    window.alert("error getSubBarang");
                }
            });
        }
    }
}