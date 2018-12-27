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

  $( document ).ready(function() {

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

    $( document ).on("click",".triggerDetailKaryawan",function () {
      var idKaryawan = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
      ajaxGetDetailKaryawan(idKaryawan);
    });

    function afterModal(){
      $('select').formSelect();

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
          "dateOfBirth" : dob,
          "phoneNumber" : hp,
          "email" : email,
          "password" : hp,
          "superiorId" : superiorId,
          "roleId" : roleId,
          "isActive" : true
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

      $("#buttonHapusKaryawan").click(function(){
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
          "dateOfBirth" : dob,
          "phoneNumber" : hp,
          "email" : email,
          "password" : hp,
          "superiorId" : superiorId,
          "roleId" : roleId,
          "isActive" : false
        };
        $.ajax({
          type: "PUT",
          url: "/api/users/id/" + id,
          contentType: 'application/json',
          data: JSON.stringify(jsonUbahDetail),
          success: function(result) {
            alert('data karyawan ' + name + ' berhasil dihapus. Silahkan klik GO untuk merefresh list karyawan');
          }
        });
      });

    }

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
            '<div class="kontainerImgModal" style="' +
            'background-image: url(/images/users/'+result.id+'.jpg);">' +
            '</div>' +
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
            '<td class="tdInfo">\n' +
            '<form>\n' +
            '<input id="ubahNamaKaryawan" name="name" value="'+result.name+'">\n' +
            '</form>\n' +
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
            '<td class="tdInfo">\n' +
            '<form>\n' +
            '<input id="alamatKaryawan" name="alamat" value="'+result.address+'">\n' +
            '</form>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Tanggal Lahir</td>\n' +
            '<td class="tdInfo">\n' +
            '<form>\n' +
            '<input id="ubahTanggalLahir" type="date" name="dob" value="'+result.dateOfBirth+'">\n' +
            '</form>\n' +
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
            '<tr class="ubahSuperior">\n' +
            '<td class="tdAtrib ubahSuperior">ID Superior</td>\n' +
            '<td class="tdInfo ubahSuperior">\n' +
            '<form class="ubahSuperior">\n' +
            '<input class="ubahSuperior" id="ubahNamaSuperior" name="idsups" value="'+usersuperiorid+'">\n' +
            '</form>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">No HP</td>\n' +
            '<td class="tdInfo">\n' +
            '<form>\n' +
            '<input id="hpKaryawan" name="hpkar" value="'+result.phoneNumber+'">\n' +
            '</form>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">email</td>\n' +
            '<td class="tdInfo">\n' +
            '<form>\n' +
            '<input id="emailKaryawan" name="email" value="'+result.email+'">\n' +
            '</form>\n' +
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
            '<a id="buttonHapusKaryawan" href="#hapusKaryawan" class="modal-close waves-effect waves-light btn" style="margin-right: 4px;">hapus</a>\n  ' +
            '<a id="buttonUbahDetailKaryawan" href="#ubahDetailKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">ubah</a>\n  ' +
            '<a id="buttonSimpanUbahanKaryawan" class="modal-close waves-effect waves-light btn" style="margin-right: 4px;">simpan</a>\n' +
            '</div>' +
            '<script type="text/javascript" src="../materialize/js/materialize.min.js"></script>\n' +
            '<script type="text/javascript" src="../js/detailUbahKaryawan.js"></script>\n' +
            '<link type="text/css" rel="stylesheet" href="../css/styles.css">\n' +
            '<link type="text/css" rel="stylesheet" href="../materialize/css/materialize.min.css"\tmedia="screen,projection"/>\n');
            afterModal();
        },
        error : function(e) {
          console.log("ERROR: ", e);
          window.alert("error");
        }
      });
    };
  });

  $(document).ready(function(){
    $('select').formSelect();

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