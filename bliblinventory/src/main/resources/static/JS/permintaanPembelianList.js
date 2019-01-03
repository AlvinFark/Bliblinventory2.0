$(document).ready(function(){
    //inisialisasi elemen yang ada
    $('.tabs').tabs();

    //cek tab yang aktif untuk load data sesuai dengan tabnya
    checkActiveTab();

    //ketika klik tab, cek tab yang aktif untuk load data sesuai dengan tabnya
    $("#tabOrderList").click(function (){
        checkActiveTab();
    });

    //ketika klik tombol batal, cancel permintaan pembelian
    $( document ).on("click",".btnBatalPermintaanBeli",function () {
        var idPermintaanPembelian = (this.id).substring(3);
        if(confirm("Yakin akan membatalkan permintaan pembelian ini?")) {
            ajaxCancelRequestBeli(idPermintaanPembelian);
        }
    });

});

//cek tab yang aktif untuk load data sesuai dengan tabnya
function checkActiveTab() {
    var url;
    if($("#tabMenunggu").hasClass("active")){
        url="api/getPermintaanPinjam/belumDibeli";
    }
    else if ($("#tabSudahDibeli").hasClass("active")){
        url="api/getPermintaanPinjam/sudahDibeli";
    }
    ajaxGetDaftarPermintaanPembelian(url);
}

//get daftar permintaan pembelian sesuai dengan tab yang aktif
function ajaxGetDaftarPermintaanPembelian(url) {
    $.ajax({
        type : "GET",
        url : url,
        success: function(result){
            $("#myOrderList").html("");
            for(var i=0; i<result.length; i++){
                if(result[i].keterangan == "null"){
                    result[i].keterangan = "-";
                }
                $("#myOrderList").append(
                    '<div class="card cardOrderList" style="height: auto">\n' +
                    '<table class="tableNoBorder infoOrderList" style="padding: 20px;padding-left: 50px; width: 1000px">\n' +
                    '<tr>\n' +
                    '<td class="tdAtrib" width="150">No. Order</td>\n' +
                    '<td class="tdInfo">'+result[i].idPermintaanPembelian+'</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="tdAtrib">Nama Barang</td>\n' +
                    '<td class="tdInfo">'+result[i].namaBarang+'</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="tdAtrib">Kategori Barang</td>\n' +
                    '<td class="tdInfo">'+result[i].category.name+'</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="tdAtrib">Jumlah Barang</td>\n' +
                    '<td class="tdInfo">'+result[i].jumlahBarang+'</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="tdAtrib">Keterangan</td>\n' +
                    '<td class="tdInfo">'+result[i].keterangan+'</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="tdInfo" style="display: none">'+result[i].idPermintaanPembelian+'</td>\n' +
                    '</tr>\n' +
                    '</table>\n' +
                    '<div class="right-align rightSideOrderList"> '+
                    changeDateFormat(result[i].tgOrder.substring(0,10))+' '+result[i].tgOrder.substring(11)+
                    '<br/><br/><br/><br/><br/>' +
                    '<a id="btn'+result[i].idPermintaanPembelian+'" class="waves-light btn btnBatalPermintaanBeli" style="display: none; width:100px; margin-left:50px;"> batal</a> </div>\n' +

                    '</div>'
                );
            }
            if(url=="api/getPermintaanPinjam/belumDibeli"){
                $(".btnBatalPermintaanBeli").css("display","block");
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getPermintaanPinjam");
        },
        async:false
    });
}

//meng-cancel permintaan pembelian barang
function ajaxCancelRequestBeli(idPermintaanPembelian) {
    $.ajax({
        type : "GET",
        url : "api/getPermintaanPembelianById/" + idPermintaanPembelian,
        success: function(result){
            $.ajax({
                type : "PUT",
                url : "api/deletePermintaanPembelian",
                contentType: 'application/json',
                data: JSON.stringify(result),
                success: function() {
                    checkActiveTab();
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                    window.alert("error deletePermintaanPembelian");
                }
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getPermintaanPembelianById");
        }
    });
}