$( document ).ready(function() {
  $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
  $('.sidenav').sidenav();
  $("#includeDaftarBarangTable").load("daftarBarangTable.html"); 
  $("#includeDaftarKaryawan").load("daftarKaryawan.html"); 
  $("#includePengembalianBarang").load("pengembalianBarang.html"); 
  $("#includePermintaanKaryawan").load("permintaanKaryawan.html"); 
  $("#includeDaftarKaryawan").hide(); 
  $("#includePengembalianBarang").hide(); 
  $("#includePermintaanKaryawan").hide(); 
  
  $("#klikDaftarBarang").click(function(){
    $("#includeDaftarBarangTable").fadeIn();
    $("#includeDaftarKaryawan").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikDaftarKaryawan").click(function(){
    $("#includeDaftarKaryawan").fadeIn();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikPengembalianBarang").click(function(){
    $("#includeDaftarKaryawan").fadeOut();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeIn();
    $("#includePermintaanKaryawan").fadeOut();
  });
  $("#klikPermintaanKaryawan").click(function(){
    $("#includeDaftarKaryawan").fadeOut();
    $("#includeDaftarBarangTable").fadeOut();
    $("#includePengembalianBarang").fadeOut();
    $("#includePermintaanKaryawan").fadeIn();
  });

  $( "#includeDaftarKaryawan" ).ready(function() {

    ajaxGetUsers("",0);

    $('select').formSelect();
    $('.modal').modal();

    $(".card").hover(function(){
      $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });

    $( document ).ready(function() {
      $("#ubahDetailKaryawan").hide();
      $("#buttonBackToDetailKaryawan").hide();
      $("#buttonSimpanUbahanKaryawan").hide();

      $(".triggerDetailKaryawan, #buttonBackToDetailKaryawan").click(function(){
        $("#detailKaryawan").fadeIn();
        $("#ubahDetailKaryawan").hide();
        $("#buttonUbahDetailKaryawan").show();
        $("#buttonBackToDetailKaryawan").hide();
        $("#buttonSimpanUbahanKaryawan").hide();
      });
      $("#buttonUbahDetailKaryawan").click(function(){
        $("#detailKaryawan").hide();
        $("#ubahDetailKaryawan").fadeIn();
        $("#buttonUbahDetailKaryawan").hide();
        $("#buttonBackToDetailKaryawan").fadeIn();
        $("#buttonSimpanUbahanKaryawan").show();
      });

    });

    function ajaxGetUsers(keyword, filter){
      $.ajax({
        type : "GET",
        url : "/api/users/"+keyword,
        success: function(result){
          $("#daftarKaryawan").html('');
          for(var i = 0; i < result.length; i++){
            var roleuser, filterRole;
            var roleapi=((result[i] || {}).roles[0] || {}).name;
            if (roleapi=="ROLE_EMPLOYEE"){roleuser="Staff"; filterRole=1;}
            else if (roleapi=="ROLE_SUPERIOR"){roleuser="Superior"; filterRole=2;}
            else {roleuser="Admin"; filterRole=3;};
            if (filter==0||filterRole==filter){
              $("#daftarKaryawan").append('' +
                '<a class="col s6 l2 m3 modal-trigger triggerDetailKaryawan" id="" href="#modalDetailKaryawan">\n' +
                '<div class="card">\n' +
                '<div class="card-image" style="padding:15px">\n' +
                '<div class="kontainerImgCard" style="' +
                'background-image: url(/images/users/'+result[i].id+'.jpg);">' +
                '</div>' +
                '</div>\n' +
                '<div class="card-content">\n' +
                '<p style="margin-bottom:0" hidden>'+result[i].id+'</p>\n' +
                '<h6 style="margin-bottom:0">'+result[i].name+'</h6>\n' +
                '<p>'+roleuser+'</p>\n' +
                '</div>\n' +
                '</div>\n' +
                '</a>');
            }

          }
        },
        error : function(e) {
          console.log("ERROR: ", e);
          window.alert("error");
        }
      });
    }

    $("#searchKaryawan").keypress(function(e) {
      if(e.which == 13) {
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      }
    });

    $( document ).on("change","#filterKaryawan",function (){
      ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
    });

    $( document ).on("click",".triggerDetailKaryawan",function () {
      var idKaryawan = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
      ajaxGetDetailKaryawan(idKaryawan);
    });

    $("#btnRefreshListKaryawan").click(function() {
      ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
    });

    function ajaxGetDetailKaryawan(id) {
      $.ajax({
        type: "GET",
        url: "/api/users/id/" + id,
        success: function (result) {
          console.log(result);
          var roleuser;
          var optStaff="";
          var optSuperior="";
          var optAdmin="";
          var optPria="";
          var optWanita="";
          var infoSuperior="";
          var roleapi=((result || {}).roles[0] || {}).name;
          var usersuperior=((result || {}).superior || {}).name;
          var usersuperiorid=((result || {}).superior || {}).id;
          if (roleapi=="ROLE_EMPLOYEE"){roleuser="Staff"; optStaff=" selected";
            infoSuperior='' +
              '<tr>\n' +
              '<td class="tdAtrib">Nama Superior</td>\n' +
              '<td class="tdInfo" id="infoSuperior">'+usersuperior+'</td>\n' +
              '</tr>\n';
          }
          else if (roleapi=="ROLE_SUPERIOR"){roleuser="Superior"; optSuperior=" selected";}
          else {roleuser="Admin"; optAdmin=" selected";};
          if (result.gender=="Pria"){optPria=" selected";}
          else {optWanita=" selected";};
          $("#modalDetailKaryawan").html('' +
            '<div id="detailKaryawan" class="modal-content" style="padding: 5px 30px 5px 30px !important">\n' +
            '<h4 class="headerModal">Detail Karyawan</h4>\n' +
            '<div class="valign-wrapper">\n' +
            '<div style="margin-right:20px;">\n' +
            '<img class="imgEmployee" src="../images/users/'+id+'.jpg"/>\n' +
            '</div>\n' +
            '<div>\n' +
            '<table class="tableNoBorder smallPadding">\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="150px">ID Karyawan</td>\n' +
            '<textarea hidden id="idKaryawan" cols="30" rows="1">'+result.id+'</textarea>\n' +
            '<td class="tdInfo">'+result.id+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="150px">Username</td>\n' +
            '<td class="tdInfo">'+result.username+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="150px">Nama</td>\n' +
            '<td class="tdInfo">'+result.name+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jenis Kelamin</td>\n' +
            '<td class="tdInfo">'+result.gender+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Alamat</td>\n' +
            '<td class="tdInfo">'+result.address+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Tanggal Lahir</td>\n' +
            '<td class="tdInfo">'+result.dateOfBirth+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jabatan</td>\n' +
            '<td class="tdInfo">'+roleuser+'</td>\n' +
            '</tr>\n' +
            infoSuperior +
            '<tr>\n' +
            '<td class="tdAtrib">No HP</td>\n' +
            '<td class="tdInfo">'+result.phoneNumber+'</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">email</td>\n' +
            '<td class="tdInfo">'+result.email+'</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div id="ubahDetailKaryawan" class="modal-content">\n' +
            '<h4 class="headerModal">Ubah Detail Karyawan</h4>\n' +
            '<div class="valign-wrapper" style="width:100%">\n' +
            '<table class="tableNoBorder smallPadding">\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="120px">Nama</td>\n' +
            '<td>\n' +
            '<textarea id="ubahNamaKaryawan" cols="30" rows="1">'+result.name+'</textarea>\n' +
            '<textarea hidden id="ubahUsernameKaryawan" cols="30" rows="1">'+result.username+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jenis Kelamin</td>\n' +
            '<td>\n' +
            '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
            '<select id="ubahGenderKaryawan">\n' +
            '<option'+optPria+' value="Pria">Pria</option>\n' +
            '<option'+optWanita+' value="Wanita">Wanita</option>\n' +
            '</select>\n' +
            '</div>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Alamat</td>\n' +
            '<td>\n' +
            '<textarea class="formLarge" id="alamatKaryawan" cols="30" rows="1">'+result.address+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Tanggal Lahir</td>\n' +
            '<td>\n' +
            '<textarea id="ubahTanggalLahir" cols="30" rows="1">'+result.dateOfBirth+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jabatan</td>\n' +
            '<td>\n' +
            '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
            '<select id="ubahRole">\n' +
            '<option'+optStaff+' value="2">Staff</option>\n' +
            '<option'+optSuperior+' value="1">Superior</option>\n' +
            '<option'+optAdmin+' value="3">Admin</option>\n' +
            '</select>\n' +
            '</div>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">ID Superior</td>\n' +
            '<td>\n' +
            '<textarea id="ubahNamaSuperior" cols="10" rows="1">'+usersuperiorid+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">No HP</td>\n' +
            '<td>\n' +
            '<textarea id="hpKaryawan" cols="30" rows="1">'+result.phoneNumber+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">email</td>\n' +
            '<td>\n' +
            '<textarea id="emailKaryawan" cols="30" rows="1">'+result.email+'</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Foto</td>\n' +
            '<td>\n' +
            '<input id="gantiFotoKaryawan" type="file" name="file" multiple style="padding:0">\n' +
            '</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="modal-footer">\n  ' +
            '<a href="#!" class="modal-close btn-flat left">tutup</a>\n  ' +
            '<a id="buttonBackToDetailKaryawan" href="#" class="btn-flat left">kembali</a>\n  ' +
            '<a id="buttonHapusKaryawan" href="#hapusKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">hapus</a>\n  ' +
            '<a id="buttonUbahDetailKaryawan" href="#ubahDetailKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">ubah</a>\n  ' +
            '<a id="buttonSimpanUbahanKaryawan" class="modal-close waves-effect waves-light btn" style="margin-right: 4px;">simpan</a>\n' +
            '</div>' +
            '<script type="text/javascript" src="../js/detailUbahKaryawan.js"></script>\n' +
            '<script type="text/javascript" src="../materialize/js/materialize.min.js"></script>\n' +
            '<link type="text/css" rel="stylesheet" href="../css/styles.css">\n' +
            '<link type="text/css" rel="stylesheet" href="../materialize/css/materialize.min.css"\tmedia="screen,projection"/>\n');
        },
        error : function(e) {
          console.log("ERROR: ", e);
          window.alert("error");
        }
      });
    };

    function ajaxPostKaryawanBaru(id) {
      $("#modalDetailKaryawan").html('' +
        '<div id="tambahKaryawanBaru" class="modal-content">\n' +
        '<h4 class="headerModal">Tambah Karyawan Baru</h4>\n' +
        '<div class="valign-wrapper" style="width:100%">\n' +
        '<table class="tableNoBorder smallPadding">\n' +
        '<tr>\n' +
        '<td class="tdAtrib" width="120px">Nama</td>\n' +
        '<td>\n' +
        '<textarea id="namaKaryawanBaru" cols="30" rows="1"></textarea>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Username</td>\n' +
        '<td>\n' +
        '<textarea id="usernameKaryawanBaru" cols="30" rows="1"></textarea>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Jenis Kelamin</td>\n' +
        '<td>\n' +
        '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
        '<select id="genderKaryawanBaru">\n' +
        '<option value="Pria">Pria</option>\n' +
        '<option value="Wanita">Wanita</option>\n' +
        '</select>\n' +
        '</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Alamat</td>\n' +
        '<td>\n' +
        '<textarea class="formLarge" id="alamatKaryawanBaru" cols="30" rows="1"></textarea>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Tanggal Lahir</td>\n' +
        '<td class="tdInfo" id="tanggalLahirKaryawanBaru">xxx</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Jabatan</td>\n' +
        '<td>\n' +
        '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
        '<select id="ubahRole">\n' +
        '<option'+optStaff+' value="Employee">Staff</option>\n' +
        '<option'+optSuperior+' value="Superior">Superior</option>\n' +
        '<option'+optAdmin+' value="Admin">Admin</option>\n' +
        '</select>\n' +
        '</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="ubahSuperior tdAtrib">Nama Superior</td>\n' +
        '<td class="ubahSuperior">\n' +
        '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
        '<select id="ubahNamaSuperior">\n' +
        '<option selected value="'+ usersuperior +'">'+ usersuperior +'</option>\n' +
        '</select>\n' +
        '</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">No HP</td>\n' +
        '<td>\n' +
        '<textarea id="hpKaryawan" cols="30" rows="1">'+result.phoneNumber+'</textarea>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">email</td>\n' +
        '<td>\n' +
        '<textarea id="emailKaryawan" cols="30" rows="1">'+result.email+'</textarea>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="tdAtrib">Foto</td>\n' +
        '<td>\n' +
        '<input id="gantiFotoKaryawan" type="file" name="file" multiple style="padding:0">\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="modal-footer">\n  ' +
        '<a href="#!" class="modal-close btn-flat left">tutup</a>\n  ' +
        '<a id="buttonBackToDetailKaryawan" href="#" class="btn-flat left">kembali</a>\n  ' +
        '<a id="buttonUbahDetailKaryawan" href="#ubahDetailKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">ubah</a>\n  ' +
        '<a id="buttonSimpanUbahanKaryawan" class="modal-close waves-effect waves-light btn" style="margin-right: 4px;">simpan</a>\n' +
        '</div>' +
        '<script type="text/javascript" src="../js/detailUbahKaryawan.js"></script>\n' +
        '<script type="text/javascript" src="../materialize/js/materialize.min.js"></script>\n' +
        '<link type="text/css" rel="stylesheet" href="../css/styles.css">\n' +
        '<link type="text/css" rel="stylesheet" href="../materialize/css/materialize.min.css"\tmedia="screen,projection"/>\n');

    };

  });

  $(document).ready(function(){
    $('select').formSelect();
    $( "#ubahTanggalLahir").datepicker();

    $("#ubahDetailKaryawan").hide();
    $("#buttonBackToDetailKaryawan").hide();
    $("#buttonSimpanUbahanKaryawan").hide();

    $(".triggerDetailKaryawan, #buttonBackToDetailKaryawan").click(function(){
      $("#detailKaryawan").fadeIn();
      $("#ubahDetailKaryawan").hide();
      $("#buttonUbahDetailKaryawan").show();
      $("#buttonHapusKaryawan").show();
      $("#buttonBackToDetailKaryawan").hide();
      $("#buttonSimpanUbahanKaryawan").hide();
    });

    $("#buttonUbahDetailKaryawan").click(function(){
      $("#detailKaryawan").hide();
      $("#ubahDetailKaryawan").fadeIn();
      $("#buttonUbahDetailKaryawan").hide();
      $("#buttonHapusKaryawan").hide();
      $("#buttonBackToDetailKaryawan").fadeIn();
      $("#buttonSimpanUbahanKaryawan").show();
    });

    var roleawal=$("#ubahRole").prop('selectedIndex');
    if (roleawal==0){
      $(".ubahSuperior").show();} else {
      $(".ubahSuperior").hide();
    }

    $( document ).on("change","#ubahRole",function (){
      var role=$("#ubahRole").prop('selectedIndex');
      if (role==0){
        $(".ubahSuperior").show();} else {
        $(".ubahSuperior").hide();
      }
    });

    $("#buttonSimpanUbahanKaryawan").click(function(){
      var id=$('#idKaryawan').val();
      var name=$('#ubahNamaKaryawan').val();
      var gender=$("#ubahGenderKaryawan").val();
      var address=$("#alamatKaryawan").val();
      var dob=$("#ubahTanggalLahir").val();
      var roleId=$("#ubahRole").val();
      var superiorId=$("#ubahNamaSuperior").val();
      if (roleId!=2||superiorId=="undefined"){superiorId="0"};
      var hp=$("#hpKaryawan").val();
      var email=$("#emailKaryawan").val();
      var uname=$("#ubahUsernameKaryawan").val();
      var jsonUbahDetail={
        "name" : name,
        "username" : uname,
        "gender" : gender,
        "address" : address,
        //"dateOfBirth" : dob,
        "phoneNumber" : hp,
        "email" : email,
        "password" : hp,
        "superiorId" : superiorId,
        "roleId" : roleId
      };
      $.ajax({
        type: "PUT",
        url: "/api/users/id/" + id,
        contentType: 'application/json',
        data: JSON.stringify(jsonUbahDetail),
        success: function(result) {
          alert('detail karyawan berhasil diubah, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
        }
      });
    });
  });


});