$( document ).ready(function() {

    $('.modal').modal();
    $('.datepicker').datepicker();

    ajaxGetBarangTable('',0);

    $.ajax({
      type: "GET",
      url: "/category",
      success: function (result) {
        for (var i=0; i<result.length; i++){
          $(".kategoriSelectorTable").append('<option value="'+result[i].name+'">'+result[i].name+'</option>')
        }
        $(".kategoriSelectorTable").trigger('contentChanged');
      }
    });

    $('select').on('contentChanged', function() {
      $(this).formSelect();
    });

    $("#clickTambahSatuan").click(function(){
        $("#editBarangTable").hide();
        $("#tambahSatuanTable").show();
        $("#detailBarangTable").hide();
        $("#backToDetailTable").show();
        $("#tombolSimpanEditan").hide();
        $("#tombolSimpanSatuan").show();
        $("#tombolEditBarang").hide();
        $("#clickTambahSatuan").hide();
    });

    function ajaxGetBarangTable(keyword, filter) {
      var count=0;
      $.ajax({
        type : "GET",
        url : "employee/sortByName/"+ filter + "/" +keyword,
        success: function(result) {
          count=result.length;
          $("#tabelDaftarBarang").html('');
          for (var i = 0; i < result.length; i++) {
            var kategoriBarang;
            var idKategoriBarang = ((result[i] || {}).category || {}).id;
            switch (idKategoriBarang) {
              case 1 : {kategoriBarang="Elektronik"; break;}
              case 2 : {kategoriBarang="Perkakas Kantor"; break;}
            }
            document.getElementById("tabelDaftarBarang").innerHTML += '' +
              '<tr>\n' +
              '  <td id="kodeBarang'+i+'" class="kodeBarangTable">' + result[i].kode + '</td>\n' +
              '  <td>' + result[i].nama + '</td>\n' +
              '  <td>' + kategoriBarang + '</td>\n' +
              '  <td>' + result[i].hargaBeli + '</td>\n' +
              '  <td width=100px>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small triggerModalTable clickEditTable" href="#modalDetailBarangTable"><i class="material-icons">edit</i></a>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small triggerModalTable clickDetailTable" href="#modalDetailBarangTable"><i class="material-icons">search</i></a>\n' +
              '  </td>\n' +
              '</tr>\n';
          }
          $(".clickDetailTable").click(function(){
            $("#editBarangTable").hide();
            $("#tambahSatuanTable").hide();
            $("#detailBarangTable").show();
            $("#backToDetailTable").hide();
            $("#tombolSimpanEditan").hide();
            $("#tombolSimpanSatuan").hide();
            $("#tombolEditBarang").show();
            $("#clickTambahSatuan").show();
          });

          $(".clickEditTable").click(function(){
            $("#editBarangTable").show();
            $("#tambahSatuanTable").hide();
            $("#detailBarangTable").hide();
            $("#backToDetailTable").show();
            $("#tombolSimpanEditan").show();
            $("#tombolSimpanSatuan").hide();
            $("#tombolEditBarang").hide();
            $("#clickTambahSatuan").hide();
          });
        }
      });
    }

    $(document).on("click", ".triggerModalTable", function(){
      kode = jQuery(this).parent("td").parent("tr"). children(".kodeBarangTable").text();
      $.ajax({
        type : "GET",
        url : "employee/getDetailProduct/"+kode,
        success: function(result) {
          $("#imgModalBarang").css({
            'background-image': 'url("images/barang/'+result.gambar+'")'
          });
          var kategoriBarang = ((result || {}).category || {}).name;

          $("#kodeBarangTable").html(kode);
          $("#namaBarangTable").html(result.nama);
          $("#kategoriBarangTable").html(kategoriBarang);
          $("#hargaBeliBarangTable").html(result.hargaBeli);
          $("#deskripsiBarangTable").html(result.deskripsi);
          $("#gambarBarangTable").html(result.gambar);

          $("#ubahNamaBarang").val(result.nama);
          $("#ubahHargaBeliBarang").val(result.hargaBeli);
          $("#ubahdeskripsiBarang").val(result.deskripsi);
          $("#ubahKategoriBarang").val(kategoriBarang);

          $('#ubahKategoriBarang option[value="'+kategoriBarang+'"]').prop('selected', true);
          $(".kategoriSelectorTable").trigger('contentChanged');

          $("#tombolSimpanEditan").click(function () {
            var keyword = $("#ubahKategoriBarang").val();
            var gambar = $("#ubahGambarProduk").val();
            if (gambar=="") {gambar = result.gambar};
            var jsonUbahKaryawan = {
              "kode" : $("#kodeBarangTable").text(),
              "nama" : $("#ubahNamaBarang").val(),
              "hargaBeli" : $("#ubahHargaBeliBarang").val(),
              "deskripsi" : $("#ubahdeskripsiBarang").val(),
              "gambar" : gambar,
              "isExist" : true
            };
            $.ajax({
              type : "PUT",
              url : "/api/barang/"+keyword,
              contentType: 'application/json',
              data: JSON.stringify(jsonUbahKaryawan),
              success: function(result) {
                alert('data barang berhasil diubah, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
              },
              error: function (result) {
                alert(JSON.stringify(result))
              }
            });
          });

          $("#tombolHapusBarang").click(function () {
            var gambar = result.gambar;
            var keyword = $("#ubahKategoriBarang").val();
            var jsonUbahKaryawan = {
              "kode" : $("#kodeBarangTable").text(),
              "nama" : $("#ubahNamaBarang").val(),
              "hargaBeli" : $("#ubahHargaBeliBarang").val(),
              "deskripsi" : $("#ubahdeskripsiBarang").val(),
              "gambar" : gambar,
              "isExist" : false
            };
            $.ajax({
              type : "PUT",
              url : "/api/barang/"+keyword,
              contentType: 'application/json',
              data: JSON.stringify(jsonUbahKaryawan),
              success: function(result) {
                alert('data barang berhasil diubah, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
              },
              error: function (result) {
                alert(JSON.stringify(result))
              }
            });
          });

        }
      });
      $.ajax({
        type: "GET",
        url: "/employee/countAllSubBarang/" + kode,
        success: function (result1) {
          $("#totalUnitTable").html(result1);
        }
      });
      $.ajax({
        type: "GET",
        url: "/employee/countReadySubBarang/" + kode,
        success: function (result2) {
          $("#unitTersediaTable").html(result2);
        }
      });
      $.ajax({
        type: "GET",
        url: "/api/barang/" + kode + "/subbarang",
        success: function (result3) {
          $("#tabelDaftarBarangSatuan").html('');
          for (var i=0; i<result3.length; i++){
            var status;
            var peminjam = '';
            if (result3[i].statusSubBarang){status="Tersedia"; peminjam='-'} else {status="Dipinjam"};
            $("#tabelDaftarBarangSatuan").append('' +
              '<tr class="rowDetailSubBarang">\n' +
              '  <td class="idDetailSubBarang">'+ result3[i].kodeSubBarang+'</td>\n' +
              '  <td>'+ status +'</td>\n' +
              '  <td class="namaPeminjam">'+ peminjam +'</td>\n' +
              '  <td class="tanggalPinjam">'+ peminjam +'</td>\n' +
              '  <td width=100px>\n' +
              '    <a class="waves-effect waves-light btn right btn-small modal-trigger triggerDeleteSubBarang" href="#modalDetailRequest"><i class="material-icons">delete</i></a>\n' +
              '  </td>\n' +
              '</tr>')
          }
          $( ".rowDetailSubBarang" ).each(function() {
            if ($(this).children(".namaPeminjam").text()!="-") {
              var kodeDetailSubBarang = $(this).children(".idDetailSubBarang").text();
              $.ajax({
                type: "GET",
                url: "api/transaksi/subbarang/" + kodeDetailSubBarang,
                success: function (result4) {
                  var nama = ((result4 || {}).user || {}).name;
                  $('td.idDetailSubBarang:contains("'+ kodeDetailSubBarang +'")').parent('tr').children('.namaPeminjam').html(nama);
                  $('td.idDetailSubBarang:contains("'+ kodeDetailSubBarang +'")').parent('tr').children('.tanggalPinjam').html(result4.tgPinjam);
                }
              });
            }
          });
          $(document).on("click", ".triggerDeleteSubBarang", function(){
            var kodeSubBarang = $(this).parent("td").parent("tr.rowDetailSubBarang").children(".idDetailSubBarang").text();
            var jsonSubBarang = {
              "kodeSubBarang" : kodeSubBarang,
              "isExist" : true
            };
            $.ajax({
              type: "PUT",
              url: "/api/subbarang/" + kodeSubBarang,
              contentType: 'application/json',
              data: JSON.stringify(jsonSubBarang),
              success: function(result) {
                alert('barang satuan berhasil dihapus, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
              }
            });
          });
        }
      });
    });

    $(document).on("click", "#submitBarangBaru", function(){
      var keyword = $("#kategoriBarangBaru").val();
      var path = $("#gambarBarangBaru").val();
      var fileGambar = path.split('\\').pop();
      var jsonKaryawanBaru = {
        "kode" : $("#idBarangBaru").val(),
        "nama" : $("#namaBarangBaru").val(),
        "hargaBeli" : $("#hargaBarangBaru").val(),
        "deskripsi" : $("#deskripsiBarangBaru").val(),
        "gambar" : fileGambar,
        "isExist" : true
      };
      $.ajax({
        type : "PUT",
        url : "/api/barang/"+keyword,
        contentType: 'application/json',
        data: JSON.stringify(jsonKaryawanBaru),
        success: function(result) {
          alert('barang baru berhasil ditambahkan, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
        },
        error: function (result) {
          alert(JSON.stringify(result))
        }
      });
    });

    $("#triggerTambahBarangSatuan").click(function () {
      $("#tambahBarangSatuan").append('' +
        '  <div class="valign-wrapper" style="margin-top: 5px">\n' +
        '    <div class="tdAtrib" style="width:100px;">ID Satuan</div>\n' +
        '    <textarea class="barangSatuan" name="satuan" cols="30" rows="1" style="height:30px; padding: 5px 0 0 5px;"></textarea>\n' +
        '  </div>\n');
    });


});
