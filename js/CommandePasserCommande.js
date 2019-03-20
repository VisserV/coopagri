$(document).ready(function () {
    init();
    chargerCategorie();
    chargerProd(1);
});


function init() {


    let rechercherSelect = $('<select>');
    rechercherSelect.attr('id',"rechercher");

    let categorie = $('<p>');
    categorie.attr('id', 'idCategorie');
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
    tableau.append("<th scope='col'>ID</th><th scope='col'>Image</th><th scope='col'> NOM</th><th scope='col'>PU</th><th scope='col'>Quantité</th>");

    let prixTotal = $('<div>');
    prixTotal.addClass("divPrixTotal");
    prixTotal.append("<b>Prix total de la commande :</b");

    let inputPrixTotal = $('<input>');
    inputPrixTotal.attr('id','prixTotal');
    inputPrixTotal.attr('disabled',"disabled");
    inputPrixTotal.val("0");

    prixTotal.append(inputPrixTotal);
    prixTotal.append("€");

    //$('body').append(ligne);
    $('body').append(categorie);
    $('body').append(tableau);
    $('body').append(prixTotal);

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
    $("#liste").append("<thead><th scope='col'>ID</th><th scope='col'>Image</th><th scope='col'> NOM</th><th scope='col'>PU</th><th scope='col'>Quantité</th></thead>");
    $.ajax({
        url: "ressources/json/produits.json",
        dataType: "json",
        success: function (data) {
            data.forEach(function (element, index) {
                if (id == element.categorie.id) {
                    if (element.image == null || element.image == "") {
                        var url = "ressources/img/no_image.png";
                    }else{
                        var url = element.image;
                    }
                    $("#liste").append("<tr class='ligne' scope='row'>" +
                    '<td>' + element.id + '</td>' +
                    '<td><img width="auto" height="50px" src='+url+'></td>' +
                    '<td>' + element.libelle + '</td>' +
                    '<td id="prix'+index+'">' + element.prixVente + '</td>' +
                    '<td><button class="value-button" id="decrease" onclick="decreaseValue('+index+')" value="Decrease Value">-</button><input type="number" id="number'+index+'" value="0"  onchange="calculPrixTotal()" /><button class="value-button" id="increase" onclick="increaseValue('+index+')" value="Increase Value">+</button></td>'+'</tr>')
                }
            });
        }
    });

}

function calculPrixTotal(){
    let liste = $('#liste .ligne');
    var total = 0;

    for (var i = 0; i < liste.length; i++) {
        var prix = parseFloat(document.getElementById('prix'+i).innerText);
        var quantite = parseFloat(document.getElementById('number'+i).value);
        total += prix*quantite
    }
    document.getElementById('prixTotal').value = total.toFixed(2);
}

function increaseValue(index) {
    var value = parseInt(document.getElementById('number'+index).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number'+index).value = value;
    calculPrixTotal();
}

function decreaseValue(index) {
    var value = parseInt(document.getElementById('number'+index).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number'+index).value = value;
    calculPrixTotal();
}
