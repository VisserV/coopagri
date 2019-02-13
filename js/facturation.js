jsonFacture = './ressources/json/facture.json';
$(document).ready(function () {
    $.ajax({
        url: jsonFacture,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            $.each(data,function (i,donne) {
                
            });
        }
    });
}