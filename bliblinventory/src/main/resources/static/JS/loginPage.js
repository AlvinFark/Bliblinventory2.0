$(document).ready(function() {
  $.session.remove('id');
  var idLogin;
  var roleLogin;
    $("#btnLogin").click(function(){
        $username = $("#inputUsername").val();
        $password = $("#inputPassword").val();
        $.ajax({
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({'usernameOrEmail': $username, 'password': $password}),
            url: '/api/auth/signin/',
            async: false,
            success: function (response) {
                console.log(response);
                $.ajax({
                  type: "GET",
                  url: "/api/users/username/" + $username,
                  success: function (result1) {
                    idLogin = result1.id;
                    $.session.set('id',idLogin);
                    roleLogin = ((result1 || {}).roles[0] || {}).name;
                    console.log(idLogin);
                    if(roleLogin == "ROLE_EMPLOYEE")
                      window.location.replace("http://localhost:8080/employee");
                    else if(roleLogin = "ROLE_ADMIN")
                      window.location.replace("http://localhost:8080/admin");
                    else
                      window.location.replace("http://localhost:8080/superior");
                  },
                  async:false
                });
            }
        });
    });
});

function getUserDetail(username) {

}