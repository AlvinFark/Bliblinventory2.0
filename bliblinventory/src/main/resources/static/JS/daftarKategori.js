$( document ).ready(function() {

    //get semua Kategory
    getAllCategory();

    //inisialisasi dependency
    $('.modal').modal();
    $('.datepicker').datepicker();

    //simpan kategori hasil editan
    $("#tombolSimpanEditan").click(function () {
        simpanEditanKategori();
    });

    //buat kategori baru ketika klik tambah kategori
    $(document).on("click", "#submitKategoriBaru", function(){
        createNewCategory();
    });

    $("#btnTambahKategori").click(function (){
       $("#namaKategoriBaru").val("");
    });
});

//get list semua kategori
function getAllCategory() {
    $.ajax({
        type: "GET",
        url: "api/getAllCategory",
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
                if(confirm("Hapus kategori ini?")) {
                    var idKategori = (this.id).substring(19);
                    deleteKategori(idKategori);
                }
            });
        }
    });
}

//get detail kategori berdasar id kategori
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

//buat form untuk edit kategori
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

//simpan hasil edit kategori
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

//buat kategori baru dan simpan ke database
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

//hapus kategori
function deleteKategori(idKategori) {
    $.ajax({
        type : "GET",
        url : "api/getTotalBarangWithCategory/"+idKategori,
        success: function(result){
            //kalau ada barang yang masih menggunakan kategori ini, tidak bisa dihapus
            if (result>0) {
                window.alert("Tidak bisa menghapus. Masih ada barang yang menggunakan kategori ini");
            }
            else{
                $.ajax({
                    type : "GET",
                    url : "api/getDetailCategory/"+idKategori,
                    success: function(result2){
                        $.ajax({
                            type: "PUT",
                            url: "/api/hapusKategori",
                            contentType: 'application/json',
                            data: JSON.stringify(result2),
                            success: function(result3) {
                                window.alert("Berhasil dihapus");
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
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error getDetailCategory");
        },
        async:false
    });
}