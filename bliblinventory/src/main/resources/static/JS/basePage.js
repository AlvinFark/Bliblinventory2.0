$( document ).ready(function() {
    if(window.location.pathname == "/employee"){
        $("body").load("homeEmployee.html");
        ajaxGetAllProduct();
    }
    else if(window.location.pathname == "/admin")
        $("body").load("homeAdmin.html");
    else
        $("body").load("homeSuperior.html");

    function ajaxGetAllProduct(){
        $.ajax({
            type : "GET",
            url : window.location + "/getAllProduct",
            success: function(result){
                $("#includeDaftarBarangCard").load("daftarBarangCard.html",function () {
                    $("#daftarProduk").html('');
                    for(var i = 0; i < result.length; i++){
                        $("#daftarProduk").append('' +
                            '<a class="col s6 l2 m3 modal-trigger" href="#modalDetailPinjam">\n' +
                            '<div class="card">\n' +
                            '<div class="card-image">\n' +
                            '<img src="'+result[i].gambar+'">\n' +
                            '</div>\n' +
                            '<div class="card-content">\n' +
                            '<p>'+result[i].kode+'</p>\n' +
                            '<p>'+result[i].nama+'</p>\n' +
                            '</div>\n' +
                            '</div>\n' +
                            '</a>');
                    }
                });
            },
            error : function(e) {
                console.log("ERROR: ", e);
                window.alert("error");
            }
        });
    }
});