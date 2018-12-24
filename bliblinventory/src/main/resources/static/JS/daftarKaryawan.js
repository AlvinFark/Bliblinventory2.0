$( document ).ready(function() {

    ajaxGetUsers("",0);

    $('select').formSelect();
    $('.modal').modal();
    $('.datepicker').datepicker();
 
    $(".card").hover(function(){
        $(this).addClass('z-depth-3');}, function(){$(this).removeClass('z-depth-3');
    });

  $("#triggerDetailKaryawan, #buttonBackToDetailKaryawan").click(function(){
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
                '<a class="col s6 l2 m3 modal-trigger" id="triggerDetailKaryawan" href="#modalDetailKaryawan">\n' +
                '<div class="card">\n' +
                '<div class="card-image" style="padding:15px">\n' +
                '<img src="../images/users/'+result[i].id+'.jpg" style="border-radius:2px; border: 1px solid rgb(212, 212, 212)">\n' +
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

    $( document ).on("click","#triggerDetailKaryawan",function () {
      var idKaryawan = jQuery(this).children(".card").children(".card-content").children("p:first-child").text();
      ajaxGetDetailKaryawan(idKaryawan);
    });

    function convertDate(date) {
      var d = date.getDate();
      var m = date.getMonth(); m += 1;
      var y = date.getFullYear();
      var dateIndo = d + ' ';
      switch (m) {
        case 1: dateIndo = dateIndo + 'Januari'; break;
        case 2: dateIndo = dateIndo + 'Februari'; break;
        case 3: dateIndo = dateIndo + 'Maret'; break;
        case 4: dateIndo = dateIndo + 'April'; break;
        case 5: dateIndo = dateIndo + 'Mei'; break;
        case 6: dateIndo = dateIndo + 'Juni'; break;
        case 7: dateIndo = dateIndo + 'Juli'; break;
        case 8: dateIndo = dateIndo + 'Agustus'; break;
        case 9: dateIndo = dateIndo + 'September'; break;
        case 10: dateIndo = dateIndo + 'Oktober'; break;
        case 11: dateIndo = dateIndo + 'November'; break;
        case 12: dateIndo = dateIndo + 'Desember'; break;
      }
      dateIndo = dateIndo + ' ' + y;
      return dateIndo;
    }

    function ajaxGetDetailKaryawan(id) {
      $.ajax({
        type: "GET",
        url: "/api/users/id/" + id,
        success: function (result) {
          console.log(result)
          var roleuser;
          var roleapi=((result || {}).roles[0] || {}).name;
          if (roleapi=="ROLE_EMPLOYEE"){roleuser="Staff";}
          else if (roleapi=="ROLE_SUPERIOR"){roleuser="Superior";}
          else {roleuser="Admin";};
          // language=HTML
          $("#modalDetailKaryawan").html('' +
            '<div id="detailKaryawan" class="modal-content">\n' +
            '<h4 class="headerModal">Detail Karyawan</h4>\n' +
            '<div class="valign-wrapper">\n' +
            '<div style="margin-right:20px;">\n' +
            '<img class="imgEmployee" src="../images/users/'+id+'.jpg"/>\n' +
            '</div>\n' +
            '<div>\n' +
            '<table class="tableNoBorder smallPadding">\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="100px">Nama</td>\n' +
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
            '<script>$("#ubahDetailKaryawan").hide();\n' +
            '$("#buttonBackToDetailKaryawan").hide();\n' +
            '$("#buttonSimpanUbahanKaryawan").hide();' +
            '  $("#triggerDetailKaryawan, #buttonBackToDetailKaryawan").click(function(){\n' +
            '        $("#detailKaryawan").fadeIn();\n' +
            '        $("#ubahDetailKaryawan").hide();\n' +
            '        $("#buttonUbahDetailKaryawan").show();\n' +
            '        $("#buttonBackToDetailKaryawan").hide();\n' +
            '        $("#buttonSimpanUbahanKaryawan").hide();\n' +
            '    });\n' +
            '    $("#buttonUbahDetailKaryawan").click(function(){\n' +
            '        $("#detailKaryawan").hide();\n' +
            '        $("#ubahDetailKaryawan").fadeIn();\n' +
            '        $("#buttonUbahDetailKaryawan").hide();\n' +
            '        $("#buttonBackToDetailKaryawan").fadeIn();\n' +
            '        $("#buttonSimpanUbahanKaryawan").show();\n' +
            '    });\n</script>\n'+
            '<h4 class="headerModal">Ubah Detail Karyawan</h4>\n' +
            '<div class="valign-wrapper" style="width:100%">\n' +
            '<table class="tableNoBorder smallPadding">\n' +
            '<tr>\n' +
            '<td class="tdAtrib" width="100px">ID</td>\n' +
            '<td class="tdInfo">KASR2178US</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Nama</td>\n' +
            '<td>\n' +
            '<textarea name="NamaKaryawan" cols="30" rows="1">Dwight Schrute</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jenis Kelamin</td>\n' +
            '<td>\n' +
            '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
            '<select>\n' +
            '<option disabled value="0">Jenis Kelamin</option>\n' +
            '<option value="1">Perempuan</option>\n' +
            '<option value="1">Laki-laki</option>\n' +
            '</select>\n' +
            '</div>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Alamat</td>\n' +
            '<td>\n' +
            '<textarea class="formLarge" name="AlamatKaryawan" cols="30" rows="1">Jalan Dunder</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Tanggal Lahir</td>\n' +
            '<td class="tdInfo">25 Maret 1990</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">Jabatan</td>\n' +
            '<td>\n' +
            '<div class="input-field containerSelect valign-wrapper" style="background-color:transparent">\n' +
            '<select>\n' +
            '<option disabled value="0">Jabatan</option>\n' +
            '<option value="1">Staff</option>\n' +
            '<option value="1">Superior</option>\n' +
            '</select>\n' +
            '</div>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">No HP</td>\n' +
            '<td>\n' +
            '<textarea name="hpKaryawan" cols="30" rows="1">08724925121</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="tdAtrib">email</td>\n' +
            '<td>\n' +
            '<textarea name="emailKaryawan" cols="30" rows="1">dwight@mifflin.com</textarea>\n' +
            '</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="modal-footer">\n  ' +
            '<a href="#!" class="modal-close btn-flat left">tutup</a>\n  ' +
            '<a id="buttonBackToDetailKaryawan" href="#" class="btn-flat left">kembali</a>\n  ' +
            '<a id="buttonUbahDetailKaryawan" href="#ubahDetailKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">ubah</a>\n  ' +
            '<a id="buttonSimpanUbahanKaryawan" class="waves-effect waves-light btn" style="margin-right: 4px;">simpan</a>\n' +
            '</div>');
        },
        error : function(e) {
          console.log("ERROR: ", e);
          window.alert("error");
        }
      });
    }
});
