pourcent = 100;
function init(){
    /*slider*/
    let tableau = $('<div>');
    tableau.attr('id', "resizable");
    tableau.attr('class',"ui-widget-content");
    tableau.append("<h3 class=\"ui-widget-header\" id='change'>"+$("h3").width()+"</h3>");

    $("#change").text(pourcent);

    let sommef1 = $('<p>');
    sommef1.attr('id','sommeFactureF1');
    sommef1.append(( $("#change").text() * $("#sommeFacture").text())/pourcent );


    let tableau2 = $('<div>');
    tableau2.attr('id', "resizable2");
    tableau2.attr('class',"ui-widget-content");
    tableau2.append("<h3 class=\"ui-widget-header\" id='change2'>"+$("h3").width()+"</h3>");
    $("#change2").text(pourcent);

    let sommef2 = $('<p>');
    sommef2.attr('id','sommeFactureF2');
    sommef2.append(( $("#change2").text() * $("#sommeFacture").text())/pourcent );

    let th = $('<tr>');
    th.attr('id',"premiereLigne");

    let td  = $('<td>');
    td.append(" ");
    th.append(td);

    let tr = $('<tr>');

    let td4 = $('<td>');
    td4.append("reglement 1");
    tr.append(td4);

    let td5 = $('<td>');
    td5.append(tableau);
    td5.append(sommef1);
    tr.append(td5);

    let td6 = $('<td>');
    td6.append(tableau2);
    td6.append(sommef2);
    tr.append(td6);

    let somme = $('<p>');
    somme.attr('id','sommeFacture');
    //somme.append("850");
    $('#container').append(somme);

    let table = $('<table>');
    table.attr('id','table');
    $('#container').append(table);
    table.append(th);
    table.append(tr);

    let valider = $('<button>');
    valider.append("valider");
    valider.attr('id','valider');
    $('#container').append(valider);
}

$( function() {
    $( "#resizable" ).resizable({
        maxHeight: 10,
        maxWidth: 202,
        minHeight: 10,
        minWidth: 102,
        resize : function( event, ui ) {
            //$("#change").removeChild();
            $("#change").text( $("#resizable").width()-pourcent);

            $('#sommeFactureF1').text(( $("#change").text() * $("#sommeFacture").text())/pourcent);
        }
    });
} );
$( function() {
    $( "#resizable2" ).resizable({
        maxHeight: 10,
        maxWidth: 202,
        minHeight: 10,
        minWidth: 102,
        resize : function( event, ui ) {
            //$("#change").removeChild();
            $("#change2").text( $("#resizable2").width()-pourcent);
            $('#sommeFactureF2').text(( $("#change2").text() * $("#sommeFacture").text())/pourcent);
        }
    });
} );
init();
function getJson() {
    chemin = "/coopagri/ressources/json/Facture.json";
    $.ajax({
        url: chemin,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("#sommeFacture").append(data.prix);
            $.each(data.produits, function (i, donne) {
                $("#premiereLigne").append("<td>"+donne.fournisseur.raison_social+"</td>");
            });
        },
        error: function (p1, p2) {
            console.log(p1, p2);
        }
    });
}
getJson();
$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});

$('#valider').click(function(){
    if ( parseInt($("#change2").text(),10) + parseInt($("#change").text(),10) <= 100){
        alert("YES");
    }else {
        alert("erreur valeur trop volumineuse");
    }
});
