$(document).ready(function () {
    init();
    chargerCategorie();
    chargerProd(1);
});


function init() {


    let rechercherSelect = $('<select>');
    rechercherSelect.attr('id',"rechercher");

    let categorie = $('<p>');
    categorie.text("Catégorie : ");

    let ligne = $('<select>');
    ligne.attr('id', "LSTCATEG");
    ligne.attr('onchange', "chargerProd(this.value)");

    categorie.append(ligne);
    //var text = document.createTextNode("  Rechercher par : ");
    //categorie.append(text);


    let tableau = $('<table>');
    tableau.attr('id', "liste");
    tableau.addClass("table");
    tableau.addClass("table-striped");
    tableau.append("<tr><th scope='col'>ID</th><th scope='col'>Image</th><th scope='col'> NOM</th><th scope='col'>PU</th></tr>");


    //$('body').append(ligne);
    $('body').append(categorie);
    $('body').append(tableau);

};

function chargerCategorie() {
    $.ajax({
        url: "ressources/json/categorieProduit.json",
        dataType: "json",
        success: function (data) {
            data.forEach(function (element) {
                $('#LSTCATEG').append("<option value="+ element.id +" >" + element.libelle + "</option>")
            })
        }
    });

};

function chargerProd(id) {
    $("#liste").empty();

    //let tableau = $('<table>');
    $("#liste").append("<thead><tr><th scope='col'>ID</th><th scope='col'>Image</th><th scope='col'> NOM</th><th scope='col'>PU</th></tr></thead>");
    $.ajax({
        url: "ressources/json/produits.json",
        dataType: "json",
        success: function (data) {
            data.forEach(function (element) {
                if (id == element.categorie.id) {
                    if (element.image == null || element.image == "") {
                        var url = "ressources/img/no_image.png";
                    }else{
                        var url = element.image;
                    }
                    $("#liste").append("<tr scope='row'>" +
                        '<td>' + element.id + '</td>' +
                        '<td><img width="auto" height="50px" src='+url+'></td>' +
                        '<td>' + element.libelle + '</td>' +
                        '<td>' + element.prixVente + '</td></tr>')
                }
            })
        }
    });
}


