$( document ).ready(function() {
    getAllPermintaanPinjam();

    $('select').formSelect();
    $('.modal').modal();

    //ketika merubah dropdown urutkan
    $( document ).on("change","#selectSortBy",function (){
        getRequestListBySortAndSearch();
    });

    //ketika klik icon search
    $( document ).on("click","#iconSearch",function (){
        getRequestListBySortAndSearch();
    });
});

function getAllPermintaanPinjam() {
    $.ajax({
        type : "GET",
        url : window.location + "/getAllEmployeeRequest",
        success: function(result){
            $("#listPermintaanPinjam").html('');
            for(var i=0; i<result.length; i++){
                $("#listPermintaanPinjam").append(
                    '<tr>\n' +
                        '<td><p><label><input type="checkbox" /><span></span></label></p></td>\n' +
                        '<td>'+result[i].idTransaksi+'</td>\n' +
                        '<td>'+result[i].user.name+'</td>\n' +
                        '<td>'+result[i].barang.nama+'</td>\n' +
                        '<td>'+changeDateFormat(result[i].tgPinjam)+'</td>\n' +
                        '<td>'+result[i].jumlah+'</td>\n' +
                        '<td>'+changeDateFormat((result[i].tgOrder).substring(0,10))+'</td>\n' +
                        '<td width=1px><a class="waves-effect waves-light btn right modal-trigger kotak-small" href="#modalDetailRequest"><i class="material-icons">search</i></a></td>\n' +
                    '</tr>'
                );
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
            window.alert("error");
        }
    });
}

function getRequestListBySortAndSearch(){
    var url;
    var keyword = $("#inputCari").val();
    var indexSortSelected = $("#selectSortBy").prop('selectedIndex');
    var indexSearchSelected = $("#selectSearchBy").prop('selectedIndex');
    window.alert("on process");
    /*
    if(indexSortSelected==1){
        url = window.location+"/sortByName/" + indexCategorySelected + "/" + keyword;
    }
    else if(indexSortSelected==2){
        url = window.location+"/sortByCode/" + indexCategorySelected + "/" + keyword;
    }
    ajaxGetProductCustom(url);*/
}