$(document).ready(function() {
    $("#btnLogin").click(function(){
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
                window.location.replace(window.location+'homeEmployee');
            }
        });
    });
});