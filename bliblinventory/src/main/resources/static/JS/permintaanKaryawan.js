$( document ).ready(function() {
    //YG UNTUK ADMIN BELUM

    if(window.location.pathname == "/superior")
        ajaxSetAllPermintaanPinjam();

    $('select').formSelect();
    $('.modal').modal();

    //ketika merubah dropdown urutkan
    $( document ).on("change","#selectSortBy",function (){
        if(window.location.pathname == "/superior")
            ajaxGetRequestListBySortAndSearch();
    });

    //ketika klik icon search
    $( document ).on("click","#iconSearch",function (){
        if(window.location.pathname == "/superior")
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

        //kalau ada yang di check, tombol setujui dan tolak bisa diklik
        if ($('.cbx').filter(':checked').length > 0) {
            $("#btnSetujui").removeClass("disabled");
            $("#btnTolak").removeClass("disabled");
        }
        //kalau tdk ada yang di check, tombol setujui dan tolak disabled
        else{
            $("#btnSetujui").addClass("disabled");
            $("#btnTolak").addClass("disabled");
        }
    });

    //ketika klik button detail
    $( document ).on("click",".btnDetail",function (){
        var idTransaksi = (this.id).substring(6);
        ajaxGetDetailRequestOrder(idTransaksi);
    });
});

function ajaxSetAllPermintaanPinjam() {
    $.ajax({
        type : "GET",
        url : window.location + "/getAllEmployeeRequest",
        success: function(result){
            createContentListPermintaanPinjam(result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

function ajaxGetRequestListBySortAndSearch(){
    var keyword = $("#inputCari").val();
    var indexSortSelected = $("#selectSortBy").prop('selectedIndex');
    var indexSearchSelected = $("#selectSearchBy").prop('selectedIndex');
    var url = window.location+"/filterEmployeeRequest/" + indexSortSelected + "/" + indexSearchSelected + "/" + keyword;
    $.ajax({
        type : "GET",
        url : url,
        success: function(result){
            createContentListPermintaanPinjam(result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

function ajaxGetDetailRequestOrder(idTransaksi) {
    $.ajax({
        type : "GET",
        url : window.location + "/getDetailRequest/" + idTransaksi,
        success: function(result){
            $("#detailNamaKaryawan").html(result.user.name);
            $("#detailIdTransaksi").html(result.idTransaksi);
            $("#detailTgOrder").html(changeDateFormat((result.tgOrder).substring(0,10)) + " " + (result.tgOrder).substring(11));
            $("#detailNamaBarang").html(result.barang.nama);
            $("#detailNamaKategori").html(result.barang.category.name);
            $("#detailTgPinjam").html(changeDateFormat(result.tgPinjam));
            $("#detailJumlah").html(result.jumlah);
            if(result.keterangan == "null")
                $("#detailKeterangan").html("-");
            else
                $("#detailKeterangan").html(result.keterangan);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

function  createContentListPermintaanPinjam(result) {
    $("#listPermintaanPinjam").html('');
    for(var i=0; i<result.length; i++){
        $("#listPermintaanPinjam").append(
            '<tr>\n' +
            '<td><p><label><input type="checkbox" id="cbx'+result[i].idTransaksi+'" class="cbx" /><span></span></label></p></td>\n' +
            '<td>'+result[i].idTransaksi+'</td>\n' +
            '<td>'+result[i].user.name+'</td>\n' +
            '<td>'+result[i].barang.nama+'</td>\n' +
            '<td>'+changeDateFormat(result[i].tgPinjam)+'</td>\n' +
            '<td>'+result[i].jumlah+'</td>\n' +
            '<td>'+changeDateFormat((result[i].tgOrder).substring(0,10))+'</td>\n' +
            '<td width=1px><a id="detail'+result[i].idTransaksi+'" class="waves-effect waves-light btn right modal-trigger btnDetail" href="#modalDetailRequest">Detail</a></td>\n' +
            '</tr>'
        );
    }
}