$(document).ready(function(){
    $('.tabs').tabs();
    checkActiveTab();
    $("#tabOrderList").click(function (){
        checkActiveTab();
    });

    if(window.location.pathname == "/superior"){
        $("#tabOrderList").hide();
        url=window.location + "/getOrderList/approved";
        ajaxGetOrderList(url);
    }

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
                            '<img class="imageOrderList" src="'+result[i].barang.gambar+'">\n' +
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
                        '<div class="right-align tanggalOrderList">'+ changeDateFormat(result[i].tgOrder.substring(0,10))+' '+result[i].tgOrder.substring(11)+'</div>\n' +
                    '</div>'
                );
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}