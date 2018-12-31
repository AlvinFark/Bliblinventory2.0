$( document ).ready(function() {
    ajaxGetAllPermintaanPembelian();

    $('select').formSelect();
    $('.modal').modal();

    //ketika merubah dropdown urutkan
    $( document ).on("change","#selectSortBy",function (){
        ajaxGetRequestListBySortAndSearch();
    });

    //ketika klik icon search
    $( document ).on("click","#iconSearch",function (){
        ajaxGetRequestListBySortAndSearch();
    });

    //ketika ada checkbox yang diklik
    $( document ).on("click",".cbx",function (){
        //kalau checkbox All di klik, semua ikut checked / unchecked
        if(this.id == "cbxAll"){
            if ($("#cbxAll").is(':checked'))
                $(".cbx").prop('checked', true);
            else
                $(".cbx").prop('checked', false);
        }
        //kalau ada checkbox yang unchecked, checkbox all menjadi unchecked juga
        else{
            if( !$(this).is(':checked') && $("#cbxAll").is(':checked'))
                $("#cbxAll").prop('checked', false);
        }

        //kalau ada yang di check, tombol sudah dibeli diklik
        if ($('.cbx').filter(':checked').length > 0) {
            if($('.cbx').filter(':checked').length == 1 && $("#cbxAll").is(':checked'))
                $("#cbxAll").prop('checked', false);
            else
                $("#btnSudahDibeli").removeClass("disabled");
        }
        //kalau tdk ada yang di check, tombol sudah dibeli disabled
        else
            $("#btnSudahDibeli").addClass("disabled");

        //kalo semua dicheck, checklist for all di cek juga
        var selectedAllPermintaan=true;
        $( ".cbxBody" ).each(function() {
            if( !$(this).is(':checked')){ selectedAllPermintaan=false};
        })
        if (selectedAllPermintaan){
            $("#cbxAll").prop('checked', true);
        }

        //kalau cuma ada checklist All, tombol Sudah Dibeli disabled
        if($('.cbx').length == 1)
            $("#btnSudahDibeli").addClass("disabled");
    });

    //ketika klik button detail
    $( document ).on("click",".btnDetail",function (){
        var idPermintaanPembelian = (this.id).substring(6);
        ajaxGetDetailRequestOrder(idPermintaanPembelian);
    });

    //pencet tombol Sudah Dibeli pada detail transaksi (popup)
    $( document ).on("click","#buttonSudahBeliFromDetail",function (){
        var idPermintaanPembelian = $("#detailIdTransaksi").text();
        ajaxUpdateIsBoughtPermintaanBeli(idPermintaanPembelian);
    });

    //pencet tombol Sudah Dibeli secara bulk
    $( document ).on("click","#btnSudahDibeli",function (){
        $('.cbx').filter(':checked').each(function() {
            if (this.id!="cbxAll"){
                var idPermintaanPembelian = (this.id).substring(3);
                ajaxUpdateIsBoughtPermintaanBeli(idPermintaanPembelian);
            }
        });
    });
});

function createContentListPermintaanPembelian(result) {
    $("#listPermintaanPembelian").html('');
    for(var i=0; i<result.length; i++){
        $("#listPermintaanPembelian").append(
            '<tr>\n' +
            '<td><p><label><input type="checkbox" id="cbx'+result[i].idPermintaanPembelian+'" class="cbx cbxBody" /><span></span></label></p></td>\n' +
            '<td>'+result[i].idPermintaanPembelian+'</td>\n' +
            '<td>'+result[i].user.name+'</td>\n' +
            '<td>'+result[i].namaBarang+'</td>\n' +
            '<td>'+result[i].category.name+'</td>\n' +
            '<td>'+result[i].jumlahBarang+'</td>\n' +
            '<td>'+changeDateFormat((result[i].tgOrder).substring(0,10))+'</td>\n' +
            '<td width=1px><a id="detail'+result[i].idPermintaanPembelian+'" class="waves-effect waves-light btn right modal-trigger btnDetail" href="#modalDetailPermintaanPembelian">Detail</a></td>\n' +
            '</tr>'
        );
    }
}

function ajaxGetAllPermintaanPembelian() {
    $.ajax({
        type : "GET",
        url : "api/getAllPemintaanPembelianBelumDibeli",
        success: function(result){
            createContentListPermintaanPembelian(result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxGetAllPermintaanPembelian");
        },
        async: false
    });
}

function ajaxGetRequestListBySortAndSearch(){
    var keyword = $("#inputCari").val();
    var indexSortSelected = $("#selectSortBy").prop('selectedIndex');
    var indexSearchSelected = $("#selectSearchBy").prop('selectedIndex');
    var url = "api/filterPermintaanPembelian/" + indexSortSelected + "/" + indexSearchSelected + "/" + keyword;
    $.ajax({
        type : "GET",
        url : url,
        success: function(result){
            createContentListPermintaanPembelian(result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        },
        async:false
    });
    $("#cbxAll").prop('checked', false);
    $("#btnSudahDibeli").addClass("disabled");
}

function ajaxGetDetailRequestOrder(idPermintaanPembelian) {
    $.ajax({
        type : "GET",
        url : "api/getPermintaanPembelianById/" + idPermintaanPembelian,
        success: function(result){
            $("#detailNamaKaryawanDetail").html(result.user.name);
            $("#detailIdTransaksi").html(result.idPermintaanPembelian);
            $("#detailTgOrder").html(changeDateFormat((result.tgOrder).substring(0,10)) + " " + (result.tgOrder).substring(11));
            $("#detailNamaBarang").html(result.namaBarang);
            $("#detailNamaKategori").html(result.category.name);
            $("#detailJumlah").html(result.jumlahBarang);
            if(result.keterangan == "null")
                $("#detailKeterangan").html("-");
            else
                $("#detailKeterangan").html(result.keterangan);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        },
        async:false
    });
}

function ajaxUpdateIsBoughtPermintaanBeli(idPermintaanPembelian) {
    $.ajax({
        type : "GET",
        url : "api/getPermintaanPembelianById/" + idPermintaanPembelian,
        success: function(result){
            $.ajax({
                type : "PUT",
                url : "api/updateIsBoughtPermintaanPembelian",
                contentType: 'application/json',
                data: JSON.stringify(result),
                success: function() {
                    $("#modalDetailPermintaanPembelian").modal('close');
                    $(".cbx").prop('checked', false);
                    ajaxGetRequestListBySortAndSearch();
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                    window.alert("error updateIsBoughtPermintaanPembelian");
                },
                async: false
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetail");
        },
        async: false
    });
}
