$( document ).ready(function() {

  $('.modal').modal();

  $('select').on('contentChanged', function() {
    $(this).formSelect();
  });

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

  $( document ).on("click",".triggerDetailKaryawan",function () {
    $("#detailKaryawan").fadeIn();
    $("#ubahDetailKaryawan").hide();
    $("#buttonUbahDetailKaryawan").show();
    $("#buttonHapusKaryawan").show();
    $("#buttonBackToDetailKaryawan").hide();
    $("#buttonSimpanUbahanKaryawan").hide();
    var idKaryawan = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
    ajaxGetDetailKaryawan(idKaryawan);
  });

  $( document ).on("change","#ubahRole",function (){
    var role=$("#ubahRole").prop('selectedIndex');
    if (role==0){
      $(".ubahSuperior").show();} else {
      $(".ubahSuperior").hide();
    }
  });

  $('#formGantiGambarKaryawan').on('submit',(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type:'POST',
      url: "/api/upload/users/",
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
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

  $('#formGambarKaryawanBaru').on('submit',(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type:'POST',
      url: "/api/upload/users/",
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
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

  $( document ).on("click","#buttonYaGanti",function () {
    $('.hideGantiPassword').show();
    $('.buttonYaGanti').hide();
  });

  $( document ).on("click","#buttonCancelGanti",function () {
    $('.hideGantiPassword').hide();
    $('#gantiPassword').val('');
    $('.buttonYaGanti').show();
  });

  var passworddetail;
  var gambardetail;

  $("#buttonSimpanUbahanKaryawan").click(function(){
    $('#formGantiGambarKaryawan').submit();
    var id=$('#detailIdKaryawan').text();
    var name=$('#ubahNamaKaryawan').val();
    var gender=$("#ubahGenderKaryawan").val();
    var address=$("#alamatKaryawan").val();
    var dob=$("#ubahTanggalLahir").val();
    var roleId=$("#ubahRole").val();
    var superiorId=$("#selectUbahSuperior").val();
    if (roleId!=2||superiorId=="undefined"){superiorId="0"};
    var hp=$("#hpKaryawan").val();
    var email=$("#emailKaryawan").val();
    var uname=$("#detailUsernameKaryawan").text();
    var path = $("#gantiFotoKaryawan").val();
    var gambar = path.split('\\').pop();
    if (gambar=="") {
      gambar = gambardetail
    };
    var password = $('#gantiPassword').val();
    var passbaru;
    if (password=="") {
      password = passworddetail;
      passbaru = false;
    } else {
      passbaru = true;
    }
    var jsonUbahDetail={
      "name" : name,
      "username" : uname,
      "gender" : gender,
      "address" : address,
      "dateOfBirth" : dob,
      "phoneNumber" : hp,
      "email" : email,
      "password" : password,
      "superiorId" : superiorId,
      "roleId" : roleId,
      "isActive" : true,
      "gambar" : gambar,
      "passwordBaru" : passbaru
    };
    $.ajax({
      type: "PUT",
      url: "/api/users/id/" + id,
      contentType: 'application/json',
      data: JSON.stringify(jsonUbahDetail),
      success: function(result) {
        alert('detail karyawan berhasil diubah');
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      }
    });
  });

  $("#buttonHapusKaryawan").click(function(){
    var id=$('#detailIdKaryawan').text();
    var name=$('#ubahNamaKaryawan').val();
    var gender=$("#ubahGenderKaryawan").val();
    var address=$("#alamatKaryawan").val();
    var dob=$("#ubahTanggalLahir").val();
    var roleId=$("#ubahRole").val();
    var superiorId=$("#selectUbahSuperior").val();
    if (roleId!=2||superiorId=="undefined"){superiorId="0"};
    var hp=$("#hpKaryawan").val();
    var email=$("#emailKaryawan").val();
    var uname=$("#detailUsernameKaryawan").val();
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
        alert('data karyawan ' + name + ' berhasil dihapus');
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      }
    });
  });

  function ajaxGetDetailKaryawan(id) {
    $('.hideGantiPassword').hide();
    $('#gantiPassword').val('');
    $('.buttonYaGanti').show();
    $.ajax({
      async: false,
      type: "GET",
      url: "/api/users/id/" + id,
      success: function (result) {
        console.log(result);
        var roleuser, roleid;
        passworddetail = result.password;
        gambardetail = result.gambar;
        var roleapi=((result || {}).roles[0] || {}).name;
        if (roleapi=="ROLE_EMPLOYEE"){
          roleuser="Staff";
          roleid=2;
        } else if (roleapi=="ROLE_SUPERIOR"){
          roleuser="Superior";
          roleid=1;
        } else {
          roleuser="Admin";
          roleid=3;
        };
        var usersuperiorid=result.superiorId;
        var usersuperior;
        $.ajax({
          async : false,
          type: "GET",
          url: "/api/users/id/" + usersuperiorid,
          success: function (result1) {
            usersuperior = result1.name;
          }
        });
        $("#detailFotoKaryawan").css({
          'background-image': 'url("http://127.0.0.1:8000/images/users/'+result.gambar+'")'
        });

        $("#detailIdKaryawan").html(result.id);
        $("#detailUsernameKaryawan").html(result.username);
        $("#detailNamaKaryawan").html(result.name);
        $("#detailGenderKaryawan").html(result.gender);
        $("#detailAlamatKaryawan").html(result.address);
        $("#detailDoBKaryawan").html(result.dateOfBirth);
        $("#detailRoleKaryawan").html(roleuser);
        if (roleuser=="Staff"){
          $(".superior").attr("hidden",false);
          $(".ubahSuperior").attr("hidden",false);
          $("#detailSuperiorKaryawan").html(usersuperior);
        } else {
          $(".superior").attr("hidden",true);
          $(".ubahSuperior").attr("hidden",true);
        }
        $("#detailHpKaryawan").html(result.phoneNumber);
        $("#detailEmailKaryawan").html(result.email);

        $("#ubahNamaKaryawan").val(result.name);
        $('#ubahGenderKaryawan option[value="'+result.gender+'"]').prop('selected', true);
        $("#alamatKaryawan").val(result.address);
        $("#ubahTanggalLahir").val(result.dateOfBirth);
        $('#ubahRole option[value="'+roleid+'"]').prop('selected', true);
        $('#selectUbahSuperior option[value="'+usersuperiorid+'"]').prop('selected', true);
        $("#hpKaryawan").val(result.phoneNumber);
        $("#emailKaryawan").val(result.email);

      },
      error : function(e) {
        console.log("ERROR: ", e);
        window.alert("error");
      }
    });
  };

  ajaxGetUsers("",0);

  $('select').formSelect();
  $('.modal').modal();

  $(".card").hover(function(){
      $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
  });

  var roleawalkb=$("#roleKaryawanBaru").prop('selectedIndex');
  if (roleawalkb==0){
    $(".tambahSuperior").show();} else {
    $(".tambahSuperior").hide();
  }

  $( document ).on("change","#roleKaryawanBaru",function (){
    var rolekb=$("#roleKaryawanBaru").prop('selectedIndex');
    if (rolekb==0){
      $(".tambahSuperior").show();} else {
      $(".tambahSuperior").hide();
    }
  });

  function ajaxGetUsers(keyword, filter){
    passworddetail = "";
    gambardetail = "";
    $.ajax({
      type : "GET",
      url : "/api/users/"+keyword,
      success: function(result){
        $("#daftarKaryawan").html('');
        $("#selectUbahSuperior").html('');
        $("#IdSuperiorKaryawanBaru").html('');
        for(var i = 0; i < result.length; i++){
          var roleuser, filterRole;
          var roleapi=((result[i] || {}).roles[0] || {}).name;
          if (roleapi=="ROLE_EMPLOYEE"){
            roleuser="Staff";
            filterRole=1;
          } else if (roleapi=="ROLE_SUPERIOR"){
            roleuser="Superior";
            filterRole=2;
            $("#selectUbahSuperior").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
            $("#IdSuperiorKaryawanBaru").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
          } else {
            roleuser="Admin";
            filterRole=3;
          };
          if ((filter==0||filterRole==filter)&&result[i].isActive==1){
            $("#daftarKaryawan").append('' +
              '<a class="col s6 l2 m3 modal-trigger triggerDetailKaryawan" id="" href="#modalDetailKaryawan">\n' +
              '<div class="card">\n' +
              '<div class="card-image" style="padding:15px">\n' +
              '<div class="kontainerImgCard" style="' +
              'background-image: url(http://127.0.0.1:8000/images/users/'+result[i].gambar+');">' +
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

  $("#btnRefreshListKaryawan").click(function() {
    ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
  });

  $("#btnKirimKaryawanBaru").click(function(){
    $('#formGambarKaryawanBaru').submit();
    var nname=$('#namaKaryawanBaru').val();
    var ngender=$("#genderKaryawanBaru").val();
    var naddress=$("#alamatKaryawanBaru").val();
    var ndob=$("#dobKaryawanBaru").val();
    var nroleId=$("#roleKaryawanBaru").val();
    var npassword=$("#passwordKaryawanBaru").val();
    var nsuperiorId=$("#IdSuperiorKaryawanBaru").val();
    if (nroleId!=2||nsuperiorId=="undefined"){nsuperiorId="0"};
    var nhp=$("#hpKaryawanBaru").val();
    var nemail=$("#emailKaryawanBaru").val();
    var nuname=$("#usernameKaryawanBaru").val();
    var path = $("#gambarKaryawanBaru").val();
    var fileGambar = path.split('\\').pop();
    var jsonTambahKaryawan={
      "name" : nname,
      "username" : nuname,
      "gender" : ngender,
      "address" : naddress,
      "dateOfBirth" : ndob,
      "phoneNumber" : nhp,
      "email" : nemail,
      "password" : npassword,
      "superiorId" : nsuperiorId,
      "roleId" : nroleId,
      "gambar" :fileGambar
    };
    $.ajax({
      type: "POST",
      url: "/api/auth/signup",
      contentType: 'application/json',
      data: JSON.stringify(jsonTambahKaryawan),
      success: function(result) {
        alert('karyawan baru berhasil ditambahkan');
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      },
      error: function (result) {
        alert(JSON.stringify(result))
      }
    });
  });

});