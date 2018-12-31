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

    $("#klikPermintaanPembelian").click(function(){
        buatFormPemintaanPembelian();
    });

    $("#btnKirimRequestBeli").click(function(){
        if ($('#namaBarangRequestBeli').val() == ""){
            window.alert("Nama barang masih kosong");
        }
        else{
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

function buatFormPemintaanPembelian() {
    $('#jumlahBarangRequestBeli').val(1);
    $('#keteranganRequestBeli').val("");
    $('#namaBarangRequestBeli').val("");
    $("#tgOrdeRequestBeli").html(changeDateFormat(getDateNow()));
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