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
        for (var i=0; i<result.length; i++){
          $("#selectorKategoriTable").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
        }
        $("#ubahKategoriBarang").append('<option value="tambahKategoriBaru">tambah kategori...</option>')
        $("#kategoriBarangBaru").append('<option value="tambahKategoriBaru">tambah kategori...</option>')
      }
    });

  $( document ).on("click",".cbxBarang",function (){
    //kalau checkbox All di klik, semua ikut checked / unchecked
    if(this.id == "cbxAllBarang"){
      if ($("#cbxAllBarang").is(':checked'))
        $(".cbxBarang").prop('checked', true);
      else
        $(".cbxBarang").prop('checked', false);
    }
    //kalau ada checkbox yang unchecked, checkbox all menjadi unchecked juga
    else{
      if( !$(this).is(':checked') && $("#cbxAllBarang").is(':checked'))
        $("#cbxAllBarang").prop('checked', false);
    }

    //kalau ada yang di check, tombol setujui dan tolak bisa diklik
    if ($('.cbxBarang').filter(':checked').length > 0) {
      $("#btnDeleteSelectedBarang").removeClass("disabled");
    }
    //kalau tdk ada yang di check, tombol setujui dan tolak disabled
    else{
      $("#btnDeleteSelectedBarang").addClass("disabled");
    }
    var selectedAll=true;
    $( ".cbxBarangBody" ).each(function() {
      if( !$(this).is(':checked')){ selectedAll=false};
    })
    if (selectedAll){
      $("#cbxAllBarang").prop('checked', true);
    }
  });

    function deleteBarang(kode) {
      $.ajax({
        type : "GET",
        async : false,
        url : "/api/barang/"+kode+"/subbarang",
        success: function (result1) {
          for (var i=0; i<result1.length; i++){
            var kodeSubBarang = result1[i].kodeSubBarang;
            var jsonSubBarang = {
              "kodeSubBarang" : kodeSubBarang,
              "isExist" : false
            };
            $.ajax({
              async: false,
              type: "PUT",
              url: "/api/subbarang/" + kodeSubBarang,
              contentType: 'application/json',
              data: JSON.stringify(jsonSubBarang),
              complete: function(result3) {
              }
            })
          }
          $.ajax({
            async: false,
            type : "PUT",
            url : "/api/barang/delete/" + kode,
            complete: function(result2) {
              alert(result2.responseText);
            }
          });
        }
      });
    }

    function ajaxGetBarangTable(keyword, filter) {
      $(".tambahKategoriBaru").hide();
      var count=0;
      $.ajax({
        type : "GET",
        url : "employee/sortByName/"+ filter + "/" +keyword,
        success: function(result) {
          count=result.length;
          $("#tabelDaftarBarang").html('');
          for (var i = 0; i < result.length; i++) {
            var kategoriBarang = ((result[i] || {}).category || {}).name;
            document.getElementById("tabelDaftarBarang").innerHTML += '' +
              '<tr style="height: 61px;">\n' +
              '  <td class="checkboxTd"><p><label><input type="checkbox" id="cbxbarang'+result[i].kode+'" class="cbxBarang cbxBarangBody" /><span></span></label></p></td>\n' +
              '  <td id="kodeBarang'+i+'" class="kodeBarangTable">' + result[i].kode + '</td>\n' +
              '  <td>' + result[i].nama + '</td>\n' +
              '  <td>' + kategoriBarang + '</td>\n' +
              '  <td class="totalUnitTable"></td>\n' +
              '  <td class="unitTersediaTable"></td>\n' +
              '  <td>' + result[i].hargaBeli + '</td>\n' +
              '  <td width=100px>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small triggerModalTable clickTambahSatuan" href="#modalDetailBarangTable"><i class="material-icons">add</i></a>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small triggerModalTable clickEditTable" href="#modalDetailBarangTable"><i class="material-icons">edit</i></a>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small triggerModalTable clickDetailTable" href="#modalDetailBarangTable"><i class="material-icons">search</i></a>\n' +
              '  </td>\n' +
              '</tr>\n';
          }
          $(".clickTambahSatuan").click(function(){
            $("#editBarangTable").hide();
            $("#tambahSatuanTable").show();
            $("#detailBarangTable").hide();
            $("#backToDetailTable").show();
            $("#tombolSimpanEditan").hide();
            $("#tombolSimpanSatuan").show();
            $("#tombolEditBarang").hide();
            $("#tombolTambahSatuan").hide();
          });
          $(".clickDetailTable").click(function(){
            $("#editBarangTable").hide();
            $("#tambahSatuanTable").hide();
            $("#detailBarangTable").show();
            $("#backToDetailTable").hide();
            $("#tombolSimpanEditan").hide();
            $("#tombolSimpanSatuan").hide();
            $("#tombolEditBarang").show();
            $("#tombolTambahSatuan").show();
          });

          $(".clickEditTable").click(function(){
            $("#editBarangTable").show();
            $("#tambahSatuanTable").hide();
            $("#detailBarangTable").hide();
            $("#backToDetailTable").show();
            $("#tombolSimpanEditan").show();
            $("#tombolSimpanSatuan").hide();
            $("#tombolEditBarang").hide();
            $("#tombolTambahSatuan").hide();
          });
          $( ".kodeBarangTable" ).each(function() {
            var kode = $(this).text();
            $.ajax({
              type: "GET",
              url: "/employee/countAllSubBarang/" + kode,
              success: function (result1) {
                $("td:contains(" + kode + ")").parent("tr").children("td.totalUnitTable").html(result1);
                $.ajax({
                  type: "GET",
                  url: "/employee/countReadySubBarang/" + kode,
                  success: function (result2) {
                    $("td:contains(" + kode + ")").parent("tr").children("td.unitTersediaTable").html(result2);
                    if ($("td:contains(" + kode + ")").parent("tr").children("td.totalUnitTable").text()!=$("td:contains(" + kode + ")").parent("tr").children("td.unitTersediaTable").text()){
                    };
                  }
                });
              }
            })
          });
        }
      }),async=false;

    }

    $( document ).on("change","#selectorKategoriTable",function (){
      ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
    });

    $("#searchTabelBarang").keyup(function(e) {
        ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
    });

  $( document ).on("click","#btnDeleteSelectedBarang",function (){
    $('.cbxBarang').filter(':checked').each(function() {
      if (this.id!="cbxAllBarang"){
        var kode = (this.id).substring(9);
        deleteBarang(kode);
      }
    });
    ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
  });

  var barangDetail;

  $("#tombolSimpanEditan").click(function () {
    var keyword = $("#ubahKategoriBarang").val();
    var path = $("#fileUploadGantiFotoBarang").val();
    var gambar = path.split('.').pop();
    if (gambar=="") {
      gambar = barangDetail.split('.').pop();
    };
    var jsonUbahBarang = {
      "kode" : $("#kodeBarangTable").text(),
      "nama" : $("#ubahNamaBarang").val(),
      "hargaBeli" : $("#ubahHargaBeliBarang").val(),
      "deskripsi" : $("#ubahdeskripsiBarang").val(),
      "gambar" : gambar,
      "isExist" : true
    };
    if (keyword=="tambahKategoriBaru"){
      keyword = $("#formTambahKategoriEdit").val();
      var jsonKategoriBaru = {
        "name" : keyword
      };
      $.ajax({
        type : "POST",
        url : "/api/category/",
        contentType : 'application/json',
        data : JSON.stringify(jsonKategoriBaru),
        async : false
      })
    }
    $('#formGantiFotoBarang').on('submit',(function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        type:'POST',
        url: "/api/upload/barang/" + kode + "." + gambar,
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        async: false,
        success:function(data){
          console.log("success");
          console.log(data);
        },
        error: function(data){
          console.log("error");
          console.log(data);
        }
      });
    }));
    $('#formGantiFotoBarang').submit();
    $.ajax({
      type : "PUT",
      async : false,
      url : "/api/barang/"+keyword,
      contentType: 'application/json',
      data: JSON.stringify(jsonUbahBarang),
      success: function(result) {
      },
      error: function (result) {
        alert(JSON.stringify(result))
      }
    });
    alert('data barang berhasil diubah');
    ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
  });

  $("#tombolHapusBarang").click(function () {
    var kode = $("#kodeBarangTable").text();
    deleteBarang(kode);
    ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());

  });

  $(document).on("click", ".triggerModalTable", function(){
      $(".tambahKategoriEdit").hide();
      kode = jQuery(this).parent("td").parent("tr"). children(".kodeBarangTable").text();
      $.ajax({
        type : "GET",
        url : "employee/getDetailProduct/"+kode,
        success: function(result) {
          $("#imgModalBarang").css({
            'background-image': 'url("http://127.0.0.1:8000/images/barang/'+result.gambar+'")'
          });

          barangDetail = result.gambar;
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

        }
      });
      $.ajax({
        type: "GET",
        url: "/employee/countAllSubBarang/" + kode,
        success: function (result1) {
          $("#totalUnitTable").html(result1);
          $.ajax({
            type: "GET",
            url: "/employee/countReadySubBarang/" + kode,
            success: function (result2) {
              $("#unitTersediaTable").html(result2);
              if ($("#totalUnitTable").text()!=0&&$("#unitTersediaTable").text()==0){
                $("#tombolHapusBarang").hide();
              } else {
                $("#tombolHapusBarang").show();
              }
            }
          });
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
              '  <td class="tdDeleteSubBarang" width=100px>\n' +
              '    <a class="waves-effect waves-light btn right btn-small modal-close triggerDeleteSubBarang">hapus <i class="material-icons">delete</i></a>\n' +
              '  </td>\n' +
              '</tr>')
          }
          $( ".rowDetailSubBarang" ).each(function() {
            if ($(this).children(".namaPeminjam").text()!="-") {
              $(this).children(".tdDeleteSubBarang").children(".triggerDeleteSubBarang").hide();
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
            };
          });
        }
      });
    });

  $(document).on("click", ".triggerDeleteSubBarang", function(){
    var kodeSubBarang = $(this).parent("td").parent("tr.rowDetailSubBarang").children(".idDetailSubBarang").text();
    var jsonSubBarang = {
      "kodeSubBarang" : kodeSubBarang,
      "isExist" : false
    };
    $.ajax({
      type: "PUT",
      url: "/api/subbarang/" + kodeSubBarang,
      contentType: 'application/json',
      data: JSON.stringify(jsonSubBarang),
      success: function(result7) {
        alert(result7);
        ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
      }
    });
  });

  $( document ).on("change","#ubahKategoriBarang",function (){
    var selcategory=$("#ubahKategoriBarang").val();
    if (selcategory=="tambahKategoriBaru"){
      $(".tambahKategoriEdit").show();} else {
      $(".tambahKategoriEdit").hide();
    }
  });

  $( document ).on("change","#kategoriBarangBaru",function (){
    var selcategory=$("#kategoriBarangBaru").val();
    if (selcategory=="tambahKategoriBaru"){
      $(".tambahKategoriBaru").show();} else {
      $(".tambahKategoriBaru").hide();
    }
  });

    $(document).on("click", "#submitBarangBaru", function(){
      var keyword = $("#kategoriBarangBaru").val();
      var path = $("#gambarBarangBaru").val();
      var fileGambar = path.split('.').pop();
      var jsonBarangBaru = {
        "kode" : "blablabla",
        "nama" : $("#namaBarangBaru").val(),
        "hargaBeli" : $("#hargaBarangBaru").val(),
        "deskripsi" : $("#deskripsiBarangBaru").val(),
        "gambar" : fileGambar,
        "isExist" : true
      };
      if (keyword=="tambahKategoriBaru"){
        keyword = $("#formTambahKategoriBaru").val();
        var jsonKategoriBaru = {
          "name" : keyword
        };
        $.ajax({
          type : "POST",
          url : "/api/category/",
          contentType : 'application/json',
          data : JSON.stringify(jsonKategoriBaru),
          async : false
        })
      }
      $.ajax({
        async : false,
        type : "PUT",
        url : "/api/barang/tambah/"+keyword,
        contentType: 'application/json',
        data: JSON.stringify(jsonBarangBaru),
        success: function(result) {
          $('#formGambarBarangBaru').on('submit',(function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            $.ajax({
              type:'POST',
              url: "/api/upload/barang/" + result.gambar,
              data:formData,
              cache:false,
              contentType: false,
              processData: false,
              async : false,
              success:function(data){
                console.log("success");
                console.log(data);
              },
              error: function(data){
                console.log("error");
                console.log(data);
              }
            });
          }));
          $('#formGambarBarangBaru').submit();
          var kodeBarang = result.kode;
          for (var i=1; i<=$("#jumlahBarangBaru").val(); i++){
            var str = "" + i;
            var kodeSubBarang = kodeBarang + ('0000'+str).substring(str.length);
            $.ajax({
              async: false,
              type: "POST",
              url: "/api/barang/" + kodeBarang + "/" + kodeSubBarang,
              success: function (result) {
              }
            });
          }
          alert('barang baru berhasil ditambahkan');
          ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
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

    $(document).on("click", "#tombolSimpanSatuan", function () {
      var kodeBarang = $("#kodeBarangTable").text();
      $.ajax({
        type: "GET",
        url: "/employee/countTotalSubBarang/" + kodeBarang,
        success: function (result1) {
          var amount = $("#jumlahTambahSatuan").val();
          var kodeBarang = $("#kodeBarangTable").text();
          amount = parseInt(amount, 10) + parseInt(result1, 10);
          for (var i=parseInt(result1, 10)+1; i<=amount; i++){
            var str = "" + i;
            var kodeSubBarang = kodeBarang + ('0000'+str).substring(str.length);
            $.ajax({
              async: false,
              type: "POST",
              url: "/api/barang/" + kodeBarang + "/" + kodeSubBarang,
              success: function (result) {
                alert('sub barang baru berhasil ditambahkan');
              }
            });
          }
          ajaxGetBarangTable($("#searchTabelBarang").val(),$("#selectorKategoriTable").val());
        }
      });
    })

    //untuk print daftar barang
    $("#btnPrintDaftarBarang").click(function () {
        $.ajax({
            type : "GET",
            url : "api/printDaftarBarang",
            success: function(result){

            },
            error : function(e) {
                console.log("ERROR: ", e);
                window.alert("error printDaftarBarang");
            },
            async:false
        });
    });
});
