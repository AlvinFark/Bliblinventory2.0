$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();

  ajaxGetBarangTable('',0);

  $("#editBarangTable").hide();
  $("#tambahSatuanTable").hide();
  $("#detailBarangTable").show();
  $("#backToDetailTable").hide();
  $("#tombolSimpanEditan").hide();
  $("#tombolSimpanSatuan").hide();
  $("#tombolEditBarang").show();
  $("#clickTambahSatuan").show();

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
      $.ajax({
        type : "GET",
        url : "employee/sortByName/"+keyword,
        success: function(result) {
          $("#tabelDaftarBarang").html('');
          for (var i = 0; i < result.length; i++) {
            var kategoriBarang;
            var idKategoriBarang = ((result[i] || {}).category || {}).id;
            switch (idKategoriBarang) {
              case 1 : {kategoriBarang="Elektronik"; break;}
              case 2 : {kategoriBarang="Perkakas Kantor"; break;}
            }
            var totalSubBarang;
            var subBarangTersedia;
            document.getElementById("tabelDaftarBarang").innerHTML += '' +
              '<tr>\n' +
              '  <td><p><label><input id="checkBoxBarang' + i + '" type="checkbox"/><span></span></label></p></td>\n' +
              '  <td>' + result[i].kode + '</td>\n' +
              '  <td>' + result[i].nama + '</td>\n' +
              '  <td>' + kategoriBarang + '</td>\n' +
              '  <td>' + result[i].hargaBeli + '</td>\n' +
              '  <td id="totalSubBarang' + i + '">a</td>\n' +
              '  <td id="subBarangTersedia' + i + '">a</td>\n' +
              '  <td width=100px>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickEditTable" href="#modalDetailBarangTable"><i class="material-icons">edit</i></a>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickDetailTable" href="#modalDetailBarangTable"><i class="material-icons">search</i></a>\n' +
              '  </td>\n' +
              '</tr>\n';
          }
          setTimeout(function () {
            for (var i = 0; i < result.length; i++) {
              $.ajax({
                type: "GET",
                url: "/employee/countAllSubBarang/" + result[i].kode,
                success: function (result1) {
                  $("td[id=" + "totalSubBarang" + i + "]").append(result1);
                }
              });
              $.ajax({
                type: "GET",
                url: "/employee/countReadySubBarang/" + result[i].kode,
                success: function (result2) {
                  $("td[id=" + "subBarangTersedia" + i + "]").append(result2);
                }
              });
            }
          }, 5000);
        }
      });

    }

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
