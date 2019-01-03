$(document).ready(function() {
    $("#btnLogin").click(function(){
        var token;
        $username = $("#inputUsername").val();
        $password = $("#inputPassword").val();
        console.log($username);
        console.log($password);
        $.ajax({
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({'usernameOrEmail': $username, 'password': $password}),
            url: window.location+'api/auth/signin/',
            success: function (response) {//response is value returned from php (for your example it's "bye bye"
                //window.location.replace(window.location+'homeEmployee');
                token = response.accessToken;
                getUserDetail($username);
            }
        });
    });
});

function getUserDetail(username) {
    $.ajax({
        type:'POST',
        url: "/api/auth/userRole/" + username,
        cache:false,
        contentType: false,
        processData: false,
        async : false,
        success:function(data){
            console.log("success");
            console.log(data);

        },
        error: function(data){
            console.log("error");
            console.log(data);
        }
    });
}