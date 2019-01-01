$( document ).ready(function() {

  $('.modal').modal();
  $('.datepicker').datepicker();

  refreshList("user","user","All","");

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
          if (status=="diassign"&&result[i].tgKembali=="1970-01-01T00:00:00"&&param.toLowerCase().includes(keyword)&&(filterKategori=="All"||filterKategori==kategoriBarang)){
            document.getElementById("tabelKembaliBarang").innerHTML += '' +
              '<tr>\n' +
              '  <td class="checkboxTd"><p><label><input type="checkbox" id="cbxback'+result[i].idDetailTransaksi+'" class="cbxBack cbxBackBody" /><span></span></label></p></td>\n' +
              '  <td>'+idSubBarang+'</td>\n' +
              '  <td>'+idBarang+'</td>\n' +
              '  <td>'+namaBarang+'</td>\n' +
              '  <td>'+kategoriBarang+'</td>\n' +
              '  <td>'+namaUser+'</td>\n' +
              '  <td>'+tanggalPinjam+'</td>\n' +
              '  <td width=10px><a class="waves-effect waves-light btn btn-small right btnTerima" id="terima'+result[i].idDetailTransaksi+'">terima</a></td>\n' +
              '</tr>\n';
          }
        }
      }
    });
  }

  $.ajax({
    type: "GET",
    url: "/category",
    success: function (result) {
      $("#selectKategoriPengembalian").html('<option value="All">Semua Kategori</option>');
      for (var i=0; i<result.length; i++){
        $("#selectKategoriPengembalian").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
      }
    }
  });

  $( document ).on("click",".cbxBack",function (){
    //kalau checkbox All di klik, semua ikut checked / unchecked
    if(this.id == "cbxAllBack"){
      if ($("#cbxAllBack").is(':checked'))
        $(".cbxBack").prop('checked', true);
      else
        $(".cbxBack").prop('checked', false);
    }
    //kalau ada checkbox yang unchecked, checkbox all menjadi unchecked juga
    else{
      if( !$(this).is(':checked') && $("#cbxAllBack").is(':checked'))
        $("#cbxAllBack").prop('checked', false);
    }

    //kalau ada yang di check, tombol setujui dan tolak bisa diklik
    if ($('.cbxBack').filter(':checked').length > 0) {
      $("#terimaTerpilih").removeClass("disabled");
    }
    //kalau tdk ada yang di check, tombol setujui dan tolak disabled
    else{
      $("#terimaTerpilih").addClass("disabled");
    }
    var selectedAll=true;
    $( ".cbxBackBody" ).each(function() {
      if( !$(this).is(':checked')){ selectedAll=false};
    })
    if (selectedAll){
      $("#cbxAllBarang").prop('checked', true);
    }
  });
  
  $( document ).on("change",".refreshpermintaan-trigger",function (){
    refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
  });
  $("#searchInputPengembalian").keypress(function(e) {
    if(e.which == 13) {
      refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
    }
  });

  $( document ).on("click",".btnTerima",function (){
    var kode = (this.id).substring(6);
    terimaTransaksi(kode);
    refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
  })

  $( document ).on("click","#terimaTerpilih",function (){
    $('.cbxBack').filter(':checked').each(function() {
      if (this.id!="cbxAllBack"){
        var kode = (this.id).substring(7);
        terimaTransaksi(kode);
      }
    });
    refreshList($("#selectSortPengembalian").val(),$("#selectSearchPengembalian").val(),$("#selectKategoriPengembalian").val(),$("#searchInputPengembalian").val());
  });

  function terimaTransaksi(kode) {
    $.ajax({
      type: "PUT",
      url: "/api/detailtransaksi/kembali/" + kode,
      success: function(result) {
        alert(result);
      }
    });
  }

});