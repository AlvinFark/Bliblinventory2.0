$( document ).ready(function() {
    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();

  ajaxGetBarangTable('',0);

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
    })

    $("#clickTambahSatuan").click(function(){
        $("#editBarangTable").hide();
        $("#tambahSatuanTable").show();
        $("#detailBarangTable").hide();
        $("#backToDetailTable").show();
        $("#tombolSimpanEditan").hide();
        $("#tombolSimpanSatuan").show();
        $("#tombolEditBarang").hide();
        $("#clickTambahSatuan").hide();
    })

    function ajaxGetBarangTable(keyword, filter) {
      $.ajax({
        type : "GET",
        url : "employee/sortByName/"+keyword,
        success: function(result){
          $("#tabelDaftarBarang").html('');
          for(var i = 0; i < result.length; i++){
            var kategoriBarang=((result[i] || {}).category || {}).name;
            var totalSubBarang;
            var subBarangTersedia;
            $("#tabelDaftarBarang").append('' +
              '<tr>\n' +
              '  <td><p><label><input id="checkBoxBarang'+ i +'" type="checkbox"/><span></span></label></p></td>\n' +
              '  <td>'+ result[i].kode +'</td>\n' +
              '  <td>'+ result[i].nama +'</td>\n' +
              '  <td>'+ result[i].kategoriBarang +'</td>\n' +
              '  <td>'+ result[i].hargaBeli +'</td>\n' +
              '  <td id="totalSubBarangTable">'+ totalSubBarang +'</td>\n' +
              '  <td id="subBarangTersediaTable">'+ subBarangTersedia +'</td>\n' +
              '  <td width=100px>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickEditTable" href="#modalDetailBarangTable"><i class="material-icons">edit</i></a>\n' +
              '    <a class="waves-effect waves-light btn right modal-trigger kotak-small clickDetailTable" href="#modalDetailBarangTable"><i class="material-icons">search</i></a>\n' +
              '  </td>\n' +
              '</tr>\n')
            $.ajax({
              type : "GET",
              url : "/employee/countAllSubBarang/" +result[i].kode,
              success: function(result1){
                totalSubBarang = result1;
                $("#totalSubBarangTable").html(result1);
              }
            });
            $.ajax({
              type : "GET",
              url : "/employee/countReadySubBarang/" +result[i].kode,
              success: function(result2){
                subBarangTersedia = result2;
                $("#subBarangTersediaTable").html(result2);
              }
            });
          }
        }
      })
    }

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
