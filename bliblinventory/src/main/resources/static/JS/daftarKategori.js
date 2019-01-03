$( document ).ready(function() {

    //get semua Kategory
    getAllCategory();

    //inisialisasi dependency
    $('.modal').modal();
    $('.datepicker').datepicker();

    var kategoriDetail;

    $("#tombolSimpanEditan").click(function () {
        simpanEditanKategori();
    });

    $(document).on("click", "#submitKategoriBaru", function(){
        createNewCategory();
    });

    $("#triggerTambahKategoriSatuan").click(function () {
        $("#tambahKategoriSatuan").append('' +
            '  <div class="valign-wrapper" style="margin-top: 5px">\n' +
            '    <div class="tdAtrib" style="width:100px;">ID Satuan</div>\n' +
            '    <textarea class="kategoriSatuan" name="satuan" cols="30" rows="1" style="height:30px; padding: 5px 0 0 5px;"></textarea>\n' +
            '  </div>\n');
    });

    $("#btnTambahKategori").click(function (){
       $("#namaKategoriBaru").val("");
    });
});

//get list semua kategori
function getAllCategory() {
    $.ajax({
        type: "GET",
        url: window.location + "/getAllCategory",
        success: function (result) {
            $("#tabelDaftarKategori").html("");
            for (var i=0; i<result.length; i++){
                $("#tabelDaftarKategori").append('<tr style="height: 61px;">\n' +
                    '  <td class="kodeKategoriTable">' + result[i].id + '</td>\n' +
                    '  <td>' + result[i].name + '</td>\n' +
                    '  <td width=100px>\n' +
                    '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickEditTables" href="#modalDetailKategoriTable" id="detailKategoriEdit'+result[i].id+'"><i class="material-icons">edit</i></a>\n' +
                    '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickDetailTables" href="#modalDetailKategoriTable" id="detailKategoriInfo'+result[i].id+'"><i class="material-icons">info_outline</i></a>\n' +
                    '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickHapusKategori" id="detailKategoriHapus'+result[i].id+'"><i class="material-icons">delete</i></a>\n' +
                    '  </td>\n' +
                    '</tr>\n');
            }
            $(".clickDetailTables").click(function(){
                $("#editKategoriTable").hide();
                $("#tambahSatuanTable").hide();
                $("#detailKategoriTable").show();
                $("#tombolSimpanEditan").hide();
                $("#tombolSimpanSatuan").hide();
                var idKategori = (this.id).substring(18);
                getDetailKategory(idKategori);
            });

            $(".clickEditTables").click(function(){
                $("#editKategoriTable").show();
                $("#tambahSatuanTable").hide();
                $("#detailKategoriTable").hide();
                $("#tombolSimpanEditan").show();
                $("#tombolSimpanSatuan").hide();
                var idKategori = (this.id).substring(18);
                createFormEditKategori(idKategori);
            });

            $(".clickHapusKategori").click(function(){
                var idKategori = (this.id).substring(19);
                //deleteKategori(idKategori);
            });
        }
    });
}

function getDetailKategory(idKategori) {
    $.ajax({
        type : "GET",
        url : "api/getDetailCategory/"+idKategori,
        success: function(result){
            $("#kodeKategoriTable").html(result.id);
            $("#namaKategoriTable").html(result.name);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetailCategory");
        },
        async:false
    });
}

function createFormEditKategori(idKategori) {
    $("#ubahNamaKategori").html("");
    $("#ubahKodeKategoriTable").html("");

    $.ajax({
        type : "GET",
        url : "api/getDetailCategory/"+idKategori,
        success: function(result){
            $("#ubahKodeKategoriTable").html(result.id);
            $("#ubahNamaKategori").val(result.name);
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetailCategory");
        },
        async:false
    });
}

function simpanEditanKategori() {
    var idKategori = $("#ubahKodeKategoriTable").html();
    var namaKategoriBaru = $("#ubahNamaKategori").val();
    $.ajax({
        type : "GET",
        url : "api/getDetailCategory/"+idKategori,
        success: function(result){
            $.ajax({
                type: "PUT",
                url: "/api/editKategori/" + namaKategoriBaru,
                contentType: 'application/json',
                data: JSON.stringify(result),
                success: function(result2) {
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                    window.alert("error editKategori");
                },
                async:false
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetailCategory");
        },
        async:false
    });
    getAllCategory();
}

function createNewCategory() {
    var namaKategoriBaru = $("#namaKategoriBaru").val();
    $.ajax({
        type : "POST",
        url : "api/createNewCategory/"+namaKategoriBaru,
        success: function(result){
            window.alert("Penambahan berhasil");
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        },
        async: false
    });
    getAllCategory();
}