$( document ).ready(function() {

  //inisialisasi dependency
  $('.modal').modal();
  $('select').on('contentChanged', function() {
    $(this).formSelect();
  });

  //panggil fungsi untuk menampilkan semua karyawan
  ajaxGetUsers("",0);

  //inisialisasi hide and show untuk button
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
    $('.hideGantiPassword').hide();
    $('#gantiPassword').val('');
    $('#buttonYaGanti').show();
  });

  //ketika card karyawan di klik
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

  //setting form superior untuk perubahan role user
  $( document ).on("change","#ubahRole",function (){
    var role=$("#ubahRole").prop('selectedIndex');
    if (role==0){
      $(".ubahSuperior").show();} else {
      $(".ubahSuperior").hide();
    }
  });

  //setting form untuk opsi ganti password
  $( document ).on("click","#buttonYaGanti",function () {
    $('.hideGantiPassword').show();
    $('#buttonYaGanti').hide();
  });
  $( document ).on("click","#buttonCancelGanti",function () {
    $('.hideGantiPassword').hide();
    $('#gantiPassword').val('');
    $('#buttonYaGanti').show();
  });

  //membuat password dan gambar global untuk keperluan pemanggilan fungsi
  var gambardetail;

  //action menyimpan hasil ubahan detail karyawan ketika di klik button simpan
  $("#buttonSimpanUbahanKaryawan").click(function(){
    //ambil data input detail baru
    var id=$('#detailIdKaryawan').text();
    console.log(id);
    var name=$('#ubahNamaKaryawan').val();
    var gender=$("#ubahGenderKaryawan").val();
    var address=$("#alamatKaryawan").val();
    var dob=$("#ubahTanggalLahir").val();
    var roleId=$("#ubahRole").val();
    var superiorId=$("#selectUbahSuperior").val();
    //set superiorid ke default jika role bukan staff
    if (roleId!=2||superiorId=="undefined"){superiorId="0"};
    var hp=$("#hpKaryawan").val();
    var email=$("#emailKaryawan").val();
    var uname=$("#detailUsernameKaryawan").text();
    //ambil ekstensi input gambar
    var path = $("#gantiFotoKaryawan").val();
    var gambar = path.split('.').pop();
    //nilai variabel gambar jika tidak ada input
    if (gambar=="") {gambar = gambardetail.split('.').pop();};
    var password = $('#gantiPassword').val();
    var passbaru;   //pointer untuk backend, memberitahu password diubah/tidak
    if (password=="") {
      //password mock yang tidak digunakan
      password = "password";
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
    //fungsi upload gambar karyawan
    $("#formGantiGambarKaryawan").ajaxSubmit({url: "/api/upload/users/" + id + "." + gambar, type: 'post'})
    //send ubahan detail karyawan
    $.ajax({
      type: "PUT",
      url: "/api/users/id/" + id,
      async: false,
      contentType: 'application/json',
      data: JSON.stringify(jsonUbahDetail),
      success: function(result) {
        alert('detail karyawan berhasil diubah');
        //reset tampilan
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      }
    });
  });

  //fungsi hapus karyawan
  $("#buttonHapusKaryawan").click(function(){
    //ambil detail karyawan, walaupun tidak terpakai untuk memenuhi syarat not null
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
      "isActive" : false
    };
    //konfirmasi penghapusan
    var c = confirm("Hapus karyawan "+ name + "?"); //konfirmasi hapus
    if (c) {
      $.ajax({
        type: "PUT",
        url: "/api/users/id/" + id,
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(jsonUbahDetail),
        success: function (result) {
          alert('data karyawan ' + name + ' berhasil dihapus');
          ajaxGetUsers($("#searchKaryawan").val(), $("#filterKaryawan").prop('selectedIndex'));
        }
      });
    }
  });

  //meminta detail karyawan dari modal yang di klik
  function ajaxGetDetailKaryawan(id) {
    //kosongkan form dari detail karyawan sebelumnya
    $('#ubahNamaKaryawan').val("");
    $("#ubahGenderKaryawan").val("");
    $("#alamatKaryawan").val("");
    $("#ubahTanggalLahir").val(null);
    $("#ubahRole").val("");
    $("#selectUbahSuperior").val("");
    $("#hpKaryawan").val("");
    $("#emailKaryawan").val("");
    $("#detailUsernameKaryawan").val("");
    $('#gantiPassword').val("");
    $("#gantiFotoKaryawan").val(null);
    $.ajax({
      async: false,
      type: "GET",
      url: "/api/users/id/" + id,
      success: function (result) {
        var roleuser, roleid;
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
        //ambil nama superior
        $.ajax({
          async : false,
          type: "GET",
          url: "/api/users/id/" + usersuperiorid,
          success: function (result1) {
            usersuperior = result1.name;
          }
        });
        //ambil foto karyawan
        $("#detailFotoKaryawan").css({
          'background-image': 'url("http://127.0.0.1:8000/images/users/'+result.gambar+'?'+ new Date().getTime() +'")'
        });
        //tampilkan data ke tabel detail karyawan
        $("#detailIdKaryawan").html(result.id);
        $("#detailUsernameKaryawan").html(result.username);
        $("#detailNamaKaryawan").html(result.name);
        $("#detailGenderKaryawan").html(result.gender);
        $("#detailAlamatKaryawan").html(result.address);
        $("#detailDoBKaryawan").html(result.dateOfBirth);
        $("#detailRoleKaryawan").html(roleuser);
        //tampilkan nama superior jika rolenya staff
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

        //masukkan data ke form supaya tidak perlu tulis ulang, jika hanya ingin ubah sedikit
        $("#ubahNamaKaryawan").val(result.name);
        $('#ubahGenderKaryawan option[value="'+result.gender+'"]').prop('selected', true); //buat gender otomatis ter select sesuai data sebelumnya
        $("#alamatKaryawan").val(result.address);
        $("#ubahTanggalLahir").val(result.dateOfBirth);
        $('#ubahRole option[value="'+roleid+'"]').prop('selected', true);
        $('#selectUbahSuperior option[value="'+usersuperiorid+'"]').prop('selected', true);
        $("#hpKaryawan").val(result.phoneNumber);
        $("#emailKaryawan").val(result.email);

      },
      error : function(e) {
        console.log("ERROR: ", e);
      }
    });
  };

  //efek depth ketika kursor kearah card karyawan
  $(".card").hover(function(){
      $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
  });

  //ketika role karyawan baru diubah, form superior muncul/hilang
  $(".tambahSuperior").show();
  $( document ).on("change","#roleKaryawanBaru",function (){
    var rolekb=$("#roleKaryawanBaru").prop('selectedIndex');
    if (rolekb==0){
      $(".tambahSuperior").show();} else {
      $(".tambahSuperior").hide();
    }
  });

  //fungsi menampilkan list karyawan berdasarkan keyword search dan filter role
  function ajaxGetUsers(keyword, filter){
    //kosongkan nilai variabel global
    gambardetail = "";
    //ajax untuk ambil
    $.ajax({
      type : "GET",
      url : "/api/users/"+keyword,
      success: function(result){
        //kosongkan daftar sebelumnya, kosongkan list superior
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
            //jika role nya superior, masukkan ke pilihan superior
            roleuser="Superior";
            filterRole=2;
            $("#selectUbahSuperior").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
            $("#IdSuperiorKaryawanBaru").append('<option value="'+result[i].id+'">'+result[i].name+'</option>')
          } else {
            roleuser="Admin";
            filterRole=3;
          };
          //jika sesuai dengan filter dan keyword, buar card nya
          if ((filter==0||filterRole==filter)&&result[i].isActive==1){
            $("#daftarKaryawan").append('' +
              '<a class="col s6 l2 m3 modal-trigger triggerDetailKaryawan" id="" href="#modalDetailKaryawan">\n' +
              '<div class="card">\n' +
              '<div class="card-image" style="padding:15px">\n' +
              '<div class="kontainerImgCard" style="' +
              'background-image: url(http://127.0.0.1:8000/images/users/'+result[i].gambar+'?' + new Date().getTime() +');">' +
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
      }
    });
    //kosongkan value untuk karyawan baru
    $('#namaKaryawanBaru').val('');
    $("#genderKaryawanBaru").val('');
    $("#alamatKaryawanBaru").val('');
    $("#dobKaryawanBaru").val('');
    $("#passwordKaryawanBaru").val('');
    $("#hpKaryawanBaru").val('');
    $("#emailKaryawanBaru").val('');
    $("#usernameKaryawanBaru").val('');
    $("#gambarKaryawanBaru").val(null);
  }

  //update list ketika : 1. keyword di ketik, 2. filter diubah
  $("#searchKaryawan").keyup(function(e) {
      ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
  });
  $( document ).on("change","#filterKaryawan",function (){
    ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
  });

  //fungsi ketika button untuk submit karyawan baru di klik
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
    var path = $("#gambarKaryawanBaru").val();
    var fileGambar = path.split('.').pop();
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
    //post karyawan baru
    $.ajax({
      type: "POST",
      url: "/api/auth/signup",
      contentType: 'application/json',
      async : false,
      data: JSON.stringify(jsonTambahKaryawan),
      success: function(result) {
          //ambil data karyawan yang dibuat tadi
          $.ajax({
            async: false,
            type: "PUT",
            url: "/api/users/usernameforgambar/" + nuname,
            success: function (result1) {
              //upload gambar dengan parameter dari data tadi
              $("#formGambarKaryawanBaru").ajaxSubmit({url: "/api/upload/users/" + result1.gambar, type: 'post'});//submit
            }
          });
        alert('karyawan baru berhasil ditambahkan');
        ajaxGetUsers($("#searchKaryawan").val(),$("#filterKaryawan").prop('selectedIndex'));
      },
      error: function (result) {
        alert(JSON.stringify(result))
      }
    });
  });

});