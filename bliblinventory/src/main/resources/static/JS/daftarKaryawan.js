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

  $("#buttonSimpanUbahanKaryawan").click(function(){
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
        alert('data karyawan ' + name + ' berhasil dihapus. Silahkan klik GO untuk merefresh list karyawan');
      }
    });
  });

  function ajaxGetDetailKaryawan(id) {
    $.ajax({
      type: "GET",
      url: "/api/users/id/" + id,
      success: function (result) {
        console.log(result);
        var roleuser, roleid;
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
        var usersuperior=((result || {}).superior || {}).name;
        var usersuperiorid=((result || {}).superior || {}).id;
        $("#detailFotoKaryawan").css({
          'background-image': 'url("http://127.0.0.1:8000/bliblinventoryimages/users/'+result.gambar+'")'
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
      $.ajax({
        type : "GET",
        url : "/api/users/"+keyword,
        success: function(result){
          $("#daftarKaryawan").html('');
          $("#selectUbahSuperior").html('');
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
                'background-image: url(http://127.0.0.1:8000/bliblinventoryimages/users/'+result[i].gambar+');">' +
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
      "roleId" : nroleId
    };
    $.ajax({
      type: "POST",
      url: "/api/auth/signup",
      contentType: 'application/json',
      data: JSON.stringify(jsonTambahKaryawan),
      success: function(result) {
        alert('karyawan baru berhasil ditambahkan, silahkan klik tombol "GO" untuk merefresh daftar karyawan');
      },
      error: function (result) {
        alert(JSON.stringify(result))
      }
    });
  });

});