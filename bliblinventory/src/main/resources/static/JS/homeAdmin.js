$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.modal').modal();

    $('select').on('contentChanged', function() {
        $(this).formSelect();
    });

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

    $("#klikRequestBeliBarang").click(function(){
        createFormBeli();
    });

    //print request beli barang
    $("#btnRequestBeliBarang").click(function(){
        var idDataValid = cekDataFormBeli();
        if(idDataValid==1){
            var namaBarang = $("#inputNamaBarangBeli").val();
            var namaBrand = $("#inputNamaBrandBeli").val();
            var namaSupplier = $("#inputSupplierBeli").val();
            var kuantitas = $("#inputKuantitasBeli").val();
            var catatan = $("#inputCatatanBeli").val();
            var namaKategori = $("#selectKategoriBeli option:selected").html();
            printFormRequestBeli(namaBarang,namaBrand,namaSupplier,kuantitas, namaKategori, changeDateFormat(getDateNow()), catatan);
            $("#modalBeliProduk").modal("close");
        }
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


function cekDataFormBeli() {
    if($("#inputNamaBarangBeli").val() == "" || $("#inputNamaBrandBeli").val() == "" || $("#inputSupplierBeli").val() == ""){
        window.alert("Data tidak lengkap");
        return 0;
    }
    else if ($("#inputKuantitasBeli").val() < 1){
        window.alert("Kuantitas barang minimal 1");
        return 0;
    }
    else
        return 1;
}

function createFormBeli() {
    $("#inputNamaBarangBeli").val("");
    $("#inputNamaBrandBeli").val("");
    $("#inputSupplierBeli").val("");
    $("#inputKuantitasBeli").val(1);
    $("#inputCatatanBeli").val("");
    $.ajax({
        type : "GET",
        url : window.location + "/getAllCategory",
        success: function(result){
            $("#selectKategoriBeli").html('');
            //tampilkan semua kategori dalam dropdown
            for(var i = 0; i < result.length; i++){
                $("#selectKategoriBeli").append(
                    '<option value="'+result[i].id+'">'+result[i].name+'</option>'
                );
            }
            $("#selectKategoriBeli").trigger('contentChanged');
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxGetSelectKategori");
        },
        async:false
    });
}

function printFormRequestBeli(namaBarang,namaBrand,namaSupplier,kuantitas, namaKategori, tanggal, catatan) {
    $.ajax({
        type : "GET",
        url : "api/printRequestBeli/"+namaBarang+"/"+namaBrand+"/"+namaSupplier+"/"+kuantitas+"/"+namaKategori+"/"+tanggal+"/"+catatan,
        success: function(result){

        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error printRequestBeli");
        },
        async:false
    });
}