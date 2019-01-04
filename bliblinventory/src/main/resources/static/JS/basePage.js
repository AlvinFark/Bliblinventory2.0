$( document ).ready(function() {
    if(window.location.pathname == "/")
        $("body").load("login.html");
    else if(window.location.pathname == "/employee")
        $("body").load("homeEmployee.html");
    else if(window.location.pathname == "/admin")
        $("body").load("homeAdmin.html");
    else
        $("body").load("homeSuperior.html");
    var id;
    var role;
});

//dapatkan tanggal hari ini (yyyy-mm-dd)
function getDateNow() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;
    return output;
}

//ubah format date (dd Month yyyy)
function changeDateFormat(date){
    var day = date.substring(8);
    var month = date.substring(5,7);
    var year = date.substring(0,4);
    switch (month) {
        case "01": month = "Januari"; break;
        case "02": month = "Februari"; break;
        case "03": month = "Maret"; break;
        case "04": month = "April"; break;
        case "05": month = "Mei"; break;
        case "06": month = "Juni"; break;
        case "07": month = "Juli"; break;
        case "08": month = "Agustus"; break;
        case "09": month = "September"; break;
        case "10": month = "Oktober"; break;
        case "11": month = "November"; break;
        case "12": month = "Desember"; break;
    }
    date = day + " " + month + " " + year;
    return date;
}