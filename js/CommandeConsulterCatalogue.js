$( document ).ready(function() {
    init();
    chargerCategorie();
    chargerProd(1);
});


function init (){
    let ligne = $('<select>');
    ligne.attr('id',"LSTCATEG");
    ligne.attr('onchange',"chargerProd(this.value)");

    let tableau = $('<table>');
    tableau.attr('id',"LSTPDT");
    tableau.attr('style','border:1px solid black;');
    tableau.append('<tr><th>ID</th><th>NOM</th><th>PU</th></tr>');


    $('body').append(ligne);
    $('body').append(tableau);

};

function chargerCategorie(){
    $.ajax({
        url:"ressources/json/categorieProduit.json",
        dataType :"json",
        success:function(data){
            data.forEach(function(element){
                $('select').append("<option value="+element.id+" >"+element.libelle+"</option>")
            })
        }
    });

};

function chargerProd(id){
    $('table').empty();

    //let tableau = $('<table>');
    $('table').append('<tr><th>ID</th><th>NOM</th><th>PU</th></tr>');
    $.ajax({
        url:"ressources/json/produits.json",
        dataType :"json",
        success:function(data){
            data.forEach(function(element){
                if (id == element.categorie.id){
                    $('table').append('<tr><th>'+element.id+'</th><th>'+element.libelle+'</th><th>'+element.prixVente+'</th></tr>')
                }
            })
        }
    });
}

function getEltById (idRechercher, idProduit, element){


    if (idRechercher == idProduit){
        $('table').append('<tr><th>'+idRechercher+'</th><th>'+element.libelle+'</th><th>'+element.prixVente+'</th></tr>')
    }
}

