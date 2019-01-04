$( document ).ready(function() {

  $.ajax({
    type: "GET",
    url: "/api/users/id/" + $.session.get('id'),
    success: function (result9) {
      var rolee = ((result9 || {}).roles[0] || {}).name;
      if(rolee != "ROLE_ADMIN"){
        $('body').html("");
        alert("Anda tidak memiliki akses ke halaman ini, anda akan ter redirect ke halaman home anda");
        if (rolee == "ROLE_EMPLOYEE"){
          window.location.replace("http://localhost:8080/employee");
        } else {
          window.location.replace("http://localhost:8080/superior");
        }
      }
    },
    async:false
  });

  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.modal').modal();
    $("#inputSearch").hide();
    $("#iconSearch").hide();

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

    $("#klikDaftarKategori").click(function(){
        page6();
    });

    $(".imgLogo").click(function(){
        page1();
    });

    $("#klikLogout").click(function(){
      $.session.remove('id');
    });

    $("#klikRequestBeliBarang").click(function(){
        createFormBeli();
    });

    $("#klikTambahBulk").click(function () {
        $("#fileExcel").val(null);
        $("#fileGambar").val(null);
        $("#btnUpdateBulk").prop("disabled",true);
    });

    $("#fileExcel").change(function () {
       cekInput();
    });

    $("#fileGambar").change(function () {
        cekInput();
    });

    $("#klikBackupRestore").click(function () {
        $("#dbRestore").val(null);
        $("#btnRestore").prop("disabled",true);
    });

    $("#dbRestore").change(function () {
        if($("#dbRestore").val())
            $("#btnRestore").prop("disabled",false);
        else $("#btnRestore").prop("disabled",true);
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

    $('#formTambahBulk').on('submit',(function(e) {
        $("#btnUpdateBulk").prop("disabled",true);
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type :'POST',
            url : "/api/upload/bulk",
            data : formData,
            async : false,
            cache : false,
            contentType : false,
            dataType : "text",
            processData : false,
            success:function(data){
                console.log("success");
                console.log(data);
                $('#modalTambahBulk').modal('close');
                page1();
                if(data == "success")
                    alert("Berhasil menambahkan barang secara bulk");
                else if(data == "notExcel")
                    alert("Periksa kembali file excel yang diinputkan");
                else if(data == "notZip")
                    alert("Periksa kembali file zip yang diinputkan");
                else alert("Gagal menambahkan barang secara bulk");
            },
            error: function(data){
                console.log("error");
                console.log(data);
                $('#modalTambahBulk').modal('close');
                alert("Gagal menambahkan barang secara bulk");
            }
        });
    }));

    $('#btnBackup').on('click', function () {
        $.ajax({
            url: '/api/backup',
            method: 'GET',
            dataType : 'text',
            success: function (data) {
                 var a = document.createElement('a');
                // var url = window.URL.createObjectURL(data);
                var s = "http://127.0.0.1:8000/backup/" + data;
                a.href = s;
                a.download = data;
                a.click();
                // window.URL.revokeObjectURL(url);
            }
        });
    });

    $('#formRestore').on('submit',(function(e) {
        $("#btnRestore").prop("disabled",true);
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type :'POST',
            url : "/api/restore",
            data : formData,
            cache : false,
            contentType : false,
            processData : false,
            success:function(data){
                console.log("success");
                console.log(data);
                $('#modalBackup').modal('close');
                alert("Restore database berhasil");
            },
            error: function(data){
                console.log("error");
                console.log(data);
                $('#modalBackup').modal('close');
                alert("Restore database gagal");
            }
        });
    }));

    //download excel format tambah barang bulk
    $("#btnDownloadFormatTambahBarangBulk").click(function(){
        $.ajax({
            type : "GET",
            url : "api/downloadFormatTambahBarangBulk",
            success: function(result){

            },
            error : function(e) {
                console.log("ERROR: ", e);
            },
            async:false
        });
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

function page6(){
    $("#includePageContent").load("daftarKategori.html");
}

function cekInput() {
    if($("#fileExcel").val() && $("#fileGambar").val())
        $("#btnUpdateBulk").prop("disabled",false);
    else $("#btnUpdateBulk").prop("disabled",true);
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
        url : "/api/getAllCategory",
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
        },
        async:false
    });
}