$( document ).ready(function() {
    //inisialisasi elemen-elemen pada awal homeEmployee.js di-load
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.datepicker').datepicker();
    $('.modal').modal();
    $('select').formSelect();

    //jika isi dropdown berubah, maka me-load ulang tampilan dropdown-nya
    $('select').on('contentChanged', function() {
        $(this).formSelect();
    });

    //mendapatkan session
    var page = $.session.get('page');
    //supaya kalau refresh, tetap berada di page-nya
    if(page == null || page == 1) {
        page1(); //menampilkan page daftar barang inventaris
    }
    else if(page == 2){
        page2(); //menampilkan page daftar permintaan peminjaman barang
    }
    else if(page == 3){
        page3(); //menampilkan page daftar permintaan pinjaman karyawan bawahannya
    }
    else if(page == 4){
        page4(); //menampilkan page daftar permintaan pembelian barang
    }

    //menu Daftar Barang, me-load kontennya menjadi halaman daftar barang
    $("#klikDaftarBarang").click(function(){
        $.session.set('page','1');
        page1();
    });

    //menu Daftar Order, me-load kontennya menjadi halaman daftar peminjaman
    $("#klikDaftarOrder").click(function(){
        $.session.set('page','2');
        page2();
    });

    //klik logo Bliblinventory, me-load kontennya menjadi halaman awal (daftar barang)
    $("#imgLogo").click(function(){
        $.session.set('page','1');
        page1();
    });

    //menu Daftar Order Karyawan, me-load kontennya menjadi halaman daftar peminjaman karyawan bawahannya
    $("#klikDaftarOrderKaryawan").click(function(){
        $.session.set('page','3');
        page3();
    });

    //menu Daftar Permintaan Pembelian, me-load kontennya menjadi halaman daftar permintaan pembelian bawahannya
    $("#klikDaftarPermintaanPembelian").click(function(){
        $.session.set('page','4');
        page4();
    });

    //menu Logout untuk menghapus session
    $("#klikLogout").click(function(){
        $.session.remove('page');
    });

    //menu Permintaan Pembelian untuk membuat form untuk permintaan pembelian
    $("#klikPermintaanPembelian").click(function(){
        buatFormPemintaanPembelian();
    });

    //tombol kirim pada form permintaan pembelian untuk mengirim permintaan pembelian
    $("#btnKirimRequestBeli").click(function(){
        var namaBarang = $('#namaBarangRequestBeli').val();
        var idKategori = $("#selectKategoryRequestBeli option:selected").val();
        var jumlah = $('#jumlahBarangRequestBeli').val();
        var keterangan = $('#keteranganRequestBeli').val();

        //pengecekan jika inputan nama barang masih kosong
        if (namaBarang == ""){
            window.alert("Nama barang masih kosong");
        }
        //jika data sudah valid (nama barang sudah tidak kosong), buat permintaan pembelian
        else{
            if(keterangan == "")
                url = "api/createPermintaanPembelian/"+namaBarang+"/"+idKategori+"/"+jumlah+"/"+null;
            else
                url = "api/createPermintaanPembelian/"+namaBarang+"/"+idKategori+"/"+jumlah+"/"+keterangan;
            ajaxCreatePermintaanPembelian(url, namaBarang);
            $("#modalPermintaanPembelian").modal("close");
        }
    });
});

//menampilkan page daftar barang
function page1(){
    $("#includePageContent").load("daftarBarangCard.html");
    $("#inputSearch").show();
    $("#iconSearch").show();
}

//menampilkan page daftar permintaan pinjaman barang
function page2(){
    $("#includePageContent").load("orderList.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

//menampilkan page daftar permintaan pinjaman karyawan bawahannya
function page3(){
    $("#includePageContent").load("permintaanKaryawan.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

//menampilkan page daftar permintaan pembelian barang
function page4(){
    $("#includePageContent").load("permintaanPembelianList.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

//keperluan untuk error handling pengisian form permintaan pembelian
function buatFormPemintaanPembelian() {
    $('#jumlahBarangRequestBeli').val(1);
    $('#keteranganRequestBeli').val("");
    $('#namaBarangRequestBeli').val("");
    $("#tgOrderRequestBeli").html(changeDateFormat(getDateNow()));
    ajaxGetDropDownKategori();

    //keperluan untuk error handling pengisian form permintaan pembelian
    $(":input").bind('keyup mouseup blur focusout', function () {
        if($('#jumlahBarangRequestBeli').val() < 1){
            window.alert("Minimal jumlah barang 1");
            $('#jumlahBarangRequestBeli').val(1);
        }
    });
}

//mendapatkan kategori untuk diisi ke dropdown yang ada
function ajaxGetDropDownKategori() {
    $.ajax({
        type : "GET",
        url : window.location + "/getAllCategory",
        success: function(result){
            $("#selectKategoryRequestBeli").html('');
            //tampilkan semua kategori dalam dropdown
            for(var i = 0; i < result.length; i++){
                $("#selectKategoryRequestBeli").append(
                    '<option value="'+result[i].id+'">'+result[i].name+'</option>'
                );
            }
            $("#selectKategoryRequestBeli").trigger('contentChanged');
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxGetSelectKategori");
        },
        async:false
    });
}

//membuat permintaan pembelian ke DB
function ajaxCreatePermintaanPembelian(url, namaBarang) {
    $.ajax({
        type : "POST",
        url : url,
        success: function(result){
            window.alert("Permintaan pembelian " + namaBarang +" berhasil");
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxCreatePermintaanPembelian");
        },
        async: false
    });
}