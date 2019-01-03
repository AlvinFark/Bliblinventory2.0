$(document).ready(function(){

    //inisialisasi elemen yang ada
    $('.tabs').tabs();

    //jika employee, maka cek tab yang dipilih untuk menentukan isi yang harus diload
    if(window.location.pathname == "/employee"){
        checkActiveTab();
    }
    //jika superior, maka tab-nya ditiadakan (hidden), karena superior pasti permintaan pinjamannya disetujui
    else if(window.location.pathname == "/superior"){
        $("#tabOrderList").hide();
        url=window.location + "/getOrderList/approved";
        ajaxGetOrderList(url);
    }

    //kalau ada tab yang diklik, cek tab apa yang aktif untuk menentukan isi yang harus di-load
    $("#tabOrderList").click(function (){
        checkActiveTab();
    });

    //ketika tombol batal diklik, maka cancel reqeuest pinjam
    $( document ).on("click",".btnBatal",function () {
        var idTransaksi = (this.id).substring(3);
        if(confirm("Yakin akan membatalkan permintaan pinjaman ini?")){
            ajaxCancelRequestPinjam(idTransaksi);
        }
    });

});

//cek tab yang aktif untuk load daftar sesuai tab nya
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

//get daftar request
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

                //inisialisasi variabel untuk jumlah sub barang yang sudah dikembalikan
                var jumlahDikembalikan=0;

                //get jumlah sub barang yang sudah dikembalikan
                $.ajax({
                    type: "GET",
                    url: "/api/getJumlahDikembalikanByIdTransaksi/"+result[i].idTransaksi,
                    success: function (result2) {
                        jumlahDikembalikan=result2;
                    },
                    error: function(e) {
                        console.log("ERROR: ", e);
                        window.alert("error getDetailTransaksiByIdTransaksi");
                    },
                    async:false
                });

                //kalau statusnya sudah di-assign, tampilkan keterangan barangnya
                if(result[i].statusTransaksi=="diassign"){
                    $(".infoAssigned:last").css("display","block");
                    //kalau semua barang sudah dikembalikan
                    if (jumlahDikembalikan==result[i].jumlah){
                        $(".infoAssigned:last").html("Semua unit sudah dikembalikan");
                    }
                    //kalau ada yanng sudah dikembalikan tp belum semua
                    else if (jumlahDikembalikan>0){
                        $(".infoAssigned:last").html(jumlahDikembalikan+" unit sudah dikembalikan");
                    }
                }
                //kalau status disetujui atau menunggu, bisa dibatalkan permintaan pinjamannya
                else if(result[i].statusTransaksi=="disetujui" || result[i].statusTransaksi=="menunggu"){
                    $(".btnBatal:last").css("display","block");
                }
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error ajaxGetOrderList");
        }
    });
}

//cancel permintaan pinjaman (ketika status permintaan peminjaman menunggu atau disetujui (belum diassign))
function ajaxCancelRequestPinjam(idTransaksi){
    $.ajax({
        type : "GET",
        url : "api/getTransaksiByIdTransaksi/" + idTransaksi,
        success: function(result){
            //soft delete transaksi (permintaan pinjaman)
            editTransaksiNotExist(idTransaksi, result);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetail");
        }
    });
}

//soft delete transaksi (permintaan pinjaman)
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

//soft delete detail transaksi dan ubah status subBarang jadi "menunggu"
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

//soft delete detail transaksi
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

//ubah status sub barang jadi ready (true)
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