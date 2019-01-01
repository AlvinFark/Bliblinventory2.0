$(document).ready(function(){
    $('.tabs').tabs();

    if(window.location.pathname == "/employee"){
        checkActiveTab();
    }
    else if(window.location.pathname == "/superior"){
        $("#tabOrderList").hide();
        url=window.location + "/getOrderList/approved";
        ajaxGetOrderList(url);
    }

    $("#tabOrderList").click(function (){
        checkActiveTab();
    });

    $( document ).on("click",".btnBatal",function () {
        var idTransaksi = (this.id).substring(3);
        ajaxCancelRequestPinjam(idTransaksi);
    });

});

function checkActiveTab() {
    var url;
    if($("#tabMenunggu").hasClass("active")){
        url=window.location + "/getOrderList/waiting";
    }
    else if ($("#tabDisetujui").hasClass("active")){
        url=window.location + "/getOrderList/approved";
    }
    else if ($("#tabDitolak").hasClass("active")){
        url=window.location + "/getOrderList/rejected";
    }
    ajaxGetOrderList(url);
}

function ajaxGetOrderList(url) {
    $.ajax({
        type : "GET",
        url : url,
        success: function(result){
            $("#myOrderList").html("");
            for(var i=0; i<result.length; i++){
                $("#myOrderList").append(
                    '<div class="card cardOrderList">\n' +
                        '<div class="card-image">\n' +
                            '<img class="imageOrderList" src="http://127.0.0.1:8000/images/barang/'+result[i].barang.gambar+'">\n' +
                        '</div>\n' +
                        '<table class="tableNoBorder infoOrderList">\n' +
                            '<tr>\n' +
                                '<td class="tdAtrib" width="150">Kode</td>\n' +
                                '<td class="tdInfo">'+result[i].barang.kode+'</td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                                '<td class="tdAtrib">Nama Barang</td>\n' +
                                '<td class="tdInfo">'+result[i].barang.nama+'</td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                                '<td class="tdAtrib">Untuk Tanggal</td>\n' +
                                '<td class="tdInfo">'+ changeDateFormat(result[i].tgPinjam) +'</td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                                '<td class="tdAtrib">Jumlah</td>\n' +
                                '<td class="tdInfo">'+result[i].jumlah+'</td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                                '<td class="tdInfo" style="display: none">'+result[i].idTransaksi+'</td>\n' +
                            '</tr>\n' +
                        '</table>\n' +
                        '<div class="right-align rightSideOrderList"> '+
                            changeDateFormat(result[i].tgOrder.substring(0,10))+' '+result[i].tgOrder.substring(11)+
                            '<br/><br/><br/>' +
                            '<p class="infoAssigned" style="display: none">Sudah di-assign</p>\n' +
                            '<a id="btn'+result[i].idTransaksi+'" class="waves-light btn btnBatal" style="display: none; width:100px; margin-left:50px;"> batal</a> </div>\n' +

                    '</div>'
                );
                if(result[i].statusTransaksi=="diassign"){
                    $(".infoAssigned:last").css("display","block");
                }
                else if(result[i].statusTransaksi=="disetujui" || result[i].statusTransaksi=="menunggu"){
                    $(".btnBatal:last").css("display","block");
                }
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

function ajaxCancelRequestPinjam(idTransaksi){
    $.ajax({
        type : "GET",
        url : "api/getTransaksiByIdTransaksi/" + idTransaksi,
        success: function(result){
            editTransaksiNotExist(idTransaksi, result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetail");
        }
    });
}

function editTransaksiNotExist(idTransaksi, result) {
    $.ajax({
        type : "PUT",
        url : "api/editTransaksiNotExist",
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function() {
            //jika status disetujui, maka subBarang sudah dipesan, jadi harus ubah notexist pada detail transaksi, dan ubah status subBarang
            if(result.statusTransaksi=="disetujui")
                editDetailTransaksiNotExistAndStatusSubBarangReady(idTransaksi);
            //kalau status menunggu, load lagi daftar request pinjamannya
            else
                checkActiveTab();
        },
        error: function (e) {
            console.log("ERROR: ", e);
            window.alert("error editTransaksiNotExist");
        }
    });
}

function editDetailTransaksiNotExistAndStatusSubBarangReady(idTransaksi){
    $.ajax({
        type : "GET",
        url : "api/getDetailTransaksiByIdTransaksi/" + idTransaksi,
        success: function(result){
            for(var i=0; i<result.length; i++){
                editDetailTransaksiNotExist(result[i]);
                editStatusSubBarangReady(result[i].subBarang);
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error editDetailTransaksiNotExistAndStatusSubBarangNotReady");
        }
    });
}

function editDetailTransaksiNotExist(detailTransaksi) {
    $.ajax({
        type : "PUT",
        url : "api/editDetailTransaksiNotExist",
        contentType: 'application/json',
        data: JSON.stringify(detailTransaksi),
        success: function() {
        },
        error: function (e) {
            console.log("ERROR: ", e);
            window.alert("error editDetailTransaksiNotExist");
        }
    });
}

function editStatusSubBarangReady(subBarang) {
    $.ajax({
        type : "PUT",
        url : "api/editStatusSubBarangReady",
        contentType: 'application/json',
        data: JSON.stringify(subBarang),
        success: function() {
            //load ulang daftar permintaan pinjam
            if(window.location.pathname == "/employee"){
                checkActiveTab();
            }
            else if(window.location.pathname == "/superior"){
                $("#tabOrderList").hide();
                url=window.location + "/getOrderList/approved";
                ajaxGetOrderList(url);
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
            window.alert("error editStatusSubBarangReady");
        }
    });
}