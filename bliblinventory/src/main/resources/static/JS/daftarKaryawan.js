$( document ).ready(function() {

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
          for(var i = 0; i < result.length; i++){
            var roleuser, filterRole;
            var roleapi=((result[i] || {}).roles[0] || {}).name;
            if (roleapi=="ROLE_EMPLOYEE"){roleuser="Staff"; filterRole=1;}
            else if (roleapi=="ROLE_SUPERIOR"){roleuser="Superior"; filterRole=2;}
            else {roleuser="Admin"; filterRole=3;};
            if ((filter==0||filterRole==filter)&&result[i].isActive==1){
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