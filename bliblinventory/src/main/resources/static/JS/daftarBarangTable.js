$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();

  ajaxGetBarangTable('',0);

    var indexSatuan = 0;

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
        url : "employee/sortByName/"+keyword,
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
              '  <td><p><label><input id="checkBoxBarang' + i + '" type="checkbox"/><span></span></label></p></td>\n' +
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
          var kategoriBarang;
          var idKategoriBarang = ((result || {}).category || {}).id;
          switch (idKategoriBarang) {
            case 1 : {kategoriBarang="Elektronik"; break;}
            case 2 : {kategoriBarang="Perkakas Kantor"; break;}
          }
          $("#kodeBarangTable").html(kode);
          $("#namaBarangTable").html(result.nama);
          $("#kategoriBarangTable").html(kategoriBarang);
          $("#hargaBeliBarangTable").html(result.hargaBeli);
          $("#deskripsiBarangTable").html(result.deskripsi);

          $("#ubahNamaBarang").val(result.nama);
          $("#ubahHargaBeliBarang").val(result.hargaBeli);
          $("#ubahdeskripsiBarang").val(result.deskripsi);
          $("#ubahKategoriBarang").val(kategoriBarang);

          $("#tombolSimpanEditan").click(function () {
            var keyword = $("#ubahKategoriBarang").val();
            var jsonUbahKaryawan = {
              "kode" : $("#kodeBarangTable").text(),
              "nama" : $("#ubahNamaBarang").val(),
              "hargaBeli" : $("#ubahHargaBeliBarang").val(),
              "deskripsi" : $("#ubahdeskripsiBarang").val(),
              "gambar" : "default.jpg"
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

    });

    $("#triggerTambahBarangSatuan").click(function () {
      indexSatuan++;
      $("#tambahBarangSatuan").append('' +
        '  <div class="valign-wrapper" style="margin-top: 5px">\n' +
        '    <div class="tdAtrib" style="width:100px;">ID Satuan</div>\n' +
        '    <textarea id="barangSatuan'+ indexSatuan +'" name="satuan" cols="30" rows="1" style="height:30px; padding: 5px 0 0 5px;"></textarea>\n' +
        '  </div>\n');
    });


    $("#searchBarang").keypress(function(e) {
      if(e.which == 13) {
        ajaxGetBarangTable($("#searchBarang").val(),$("#filterBarang").prop('selectedIndex'));
      }
    });
  
    $( document ).on("change","#filterBarang",function (){
      ajaxGetBarangTable($("#searchBarang").val(),$("#filterBarang").prop('selectedIndex'));
    });
  
    $("#btnRefreshListList").click(function() {
      ajaxGetBarangTable($("#searchBarang").val(),$("#filterBarang").prop('selectedIndex'));
    });

});
