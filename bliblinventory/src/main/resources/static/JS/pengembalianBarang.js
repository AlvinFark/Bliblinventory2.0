$( document ).ready(function() {

  $('.modal').modal();
  $('.datepicker').datepicker();

  $('select').on('contentChanged', function() {
    $(this).formSelect();
  });

  function refreshList(sort, filter, filterKategori, keyword){
    if (keyword!="") {
      keyword = keyword.toLowerCase();
    }
    $.ajax({
      type : "GET",
      url : "/api/permintaan/",
      success: function(result) {
        function compareUser(a,b) {
          var userA = (((a || {}).transaksi || {}).user || {}).name.toUpperCase();
          var userB = (((b || {}).transaksi || {}).user || {}).name.toUpperCase();
          var comparison = 0;
          if (userA > userB) {comparison = 1;} else if (userA < userB) {comparison = -1;}
          return comparison;
        }
        function compareBarang(a,b) {
          var barangA = (((a || {}).transaksi || {}).barang || {}).nama.toUpperCase();
          var barangB = (((b || {}).transaksi || {}).barang || {}).nama.toUpperCase();
          var comparison = 0;
          if (barangA > barangB) {
            comparison = 1;
          } else if (barangA < barangB) {
            comparison = -1;
          }
          return comparison;
        }
        var arrObject = result;
        if (sort=="user"){
          arrObject.sort(compareUser);
        } else {
          arrObject.sort(compareBarang);
        }
        $("#tabelKembaliBarang").html('');
        for (var i = 0; i < arrObject.length; i++) {
          var idSubBarang = ((arrObject[i] || {}).subBarang || {}).kodeSubBarang;
          var idBarang = (((arrObject[i] || {}).subBarang || {}).barang || {}).kode;
          var namaBarang = (((arrObject[i] || {}).subBarang || {}).barang || {}).nama;
          var kategoriBarang = ((((arrObject[i] || {}).subBarang || {}).barang || {}).category || {}).name;
          var namaUser = (((arrObject[i] || {}).transaksi || {}).user || {}).name;
          var tanggalPinjam = ((arrObject[i] || {}).transaksi || {}).tgPinjam;
          var status = ((arrObject[i] || {}).transaksi || {}).statusTransaksi;
          var param;
          if (filter=="user"){param=namaUser} else {param=namaBarang};
          if (status=="diassign"&&param.toLowerCase().includes(keyword)&&(filterKategori=="All"||filterKategori==kategoriBarang)){
            document.getElementById("tabelKembaliBarang").innerHTML += '' +
              '<tr>\n' +
              '  <td>'+idSubBarang+'</td>\n' +
              '  <td>'+idBarang+'</td>\n' +
              '  <td>'+namaBarang+'</td>\n' +
              '  <td>'+kategoriBarang+'</td>\n' +
              '  <td>'+namaUser+'</td>\n' +
              '  <td>'+tanggalPinjam+'</td>\n' +
              '  <td width=10px><a class="waves-effect waves-light btn btn-small right modal-trigger" href="#modalTerimaConfirm">terima</a></td>\n' +
              '</tr>\n';
          }
        }
      }
    });
  }
  refreshList("user","user","All","");
  $( document ).on("change",".refreshpermintaan-trigger",function (){
    refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
  });
  $("#searchInputPengembalian").keypress(function(e) {
    if(e.which == 13) {
      refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
    }
  });

});