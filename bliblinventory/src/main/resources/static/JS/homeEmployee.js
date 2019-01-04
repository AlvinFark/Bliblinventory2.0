$( document ).ready(function() {

  $.ajax({
    type: "GET",
    url: "/api/users/id/" + $.session.get('id'),
    success: function (result9) {
      var rolee = ((result9 || {}).roles[0] || {}).name;
      if(rolee != "ROLE_EMPLOYEE"){
        $('body').html("");
        alert("Anda tidak memiliki akses ke halaman ini, anda akan ter redirect ke halaman home anda");
        if (rolee == "ROLE_ADMIN"){
          window.location.replace("http://localhost:8080/admin");
        } else {
          window.location.replace("http://localhost:8080/superior");
        }
      }
    },
    async:false
  });

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
        page1(); //menampilkan page daftar barang
    }
    else if(page == 2){
        page2(); //menampilkan page daftar permintaan pinjaman barang
    }
    else if(page == 3){
        page3(); //menampilkan page daftar permintaan pembelian barang
    }

    //menu Daftar Barang, me-load kontennya menjadi halaman daftar barang
    $("#klikDaftarBarang").click(function(){
        $.session.set('page','1');
       page1();
    });

    //menu Daftar Order, me-load kontennya menjadi halaman daftar peminjaman yang pernah dilakukan
    $("#klikDaftarOrder").click(function(){
        $.session.set('page','2');
        page2();
    });

    //menu Daftar Permintaan Pembelian, me-load kontennya menjadi halaman daftar permintaan pembelian yang pernah dilakukan
    $("#klikDaftarPermintaanPembelian").click(function(){
        $.session.set('page','3');
        page3();
    });

    //klik logo Bliblinventory, me-load kontennya menjadi halaman awal (daftar barang)
    $(".imgLogo").click(function(){
        $.session.set('page','1');
        page1();
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
            if(confirm("Kirim permintaan pembelian "+namaBarang+"?")) {
                if (keterangan == "")
                    url = "api/createPermintaanPembelian/" + namaBarang + "/" + idKategori + "/" + jumlah + "/" + null;
                else
                    url = "api/createPermintaanPembelian/" + namaBarang + "/" + idKategori + "/" + jumlah + "/" + keterangan;
                ajaxCreatePermintaanPembelian(url, namaBarang);
                $("#modalPermintaanPembelian").modal("close");
            }
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

//menampilkan page daftar permintaan pembelian barang
function page3(){
    $("#includePageContent").load("permintaanPembelianList.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

//menginisialisasi form permintaan pembelian
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
        url : "/api/getAllCategory",
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