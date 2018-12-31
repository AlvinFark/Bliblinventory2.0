$( document ).ready(function() {
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.datepicker').datepicker();
    $('.modal').modal();
    $('select').formSelect();

    $('select').on('contentChanged', function() {
        $(this).formSelect();
    });

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
    else if(page == 4){
        page4();
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

    $("#klikDaftarPermintaanPembelian").click(function(){
        $.session.set('page','4');
        page4();
    });

    $("#klikLogout").click(function(){
        $.session.remove('page');
    });

    $("#klikPermintaanPembelian").click(function(){
        buatFormPemintaanPembelian();
    });

    $("#btnKirimRequestBeli").click(function(){
        var namaBarang = $('#namaBarangRequestBeli').val();
        var idKategori = $("#selectKategoryRequestBeli option:selected").val();
        var jumlah = $('#jumlahBarangRequestBeli').val();
        var keterangan = $('#keteranganRequestBeli').val();

        if (namaBarang == ""){
            window.alert("Nama barang masih kosong");
        }
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

function page4(){
    $("#includePageContent").load("permintaanPembelianList.html");
    $("#inputSearch").hide();
    $("#iconSearch").hide();
}

function buatFormPemintaanPembelian() {
    $('#jumlahBarangRequestBeli').val(1);
    $('#keteranganRequestBeli').val("");
    $('#namaBarangRequestBeli').val("");
    $("#tgOrderRequestBeli").html(changeDateFormat(getDateNow()));
    ajaxGetDropDownKategori();
    $(":input").bind('keyup mouseup blur focusout', function () {
        if($('#jumlahBarangRequestBeli').val() < 1){
            window.alert("Minimal jumlah barang 1");
            $('#jumlahBarangRequestBeli').val(1);
        }
    });
}

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