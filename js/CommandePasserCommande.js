var mesProduits = new Array();

$(document).ready(function () {
    init();
    chargerTableau();
    chargerCategorie();
    chargerProd(0);
    slider();
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


    let texte = $('<p>');

    let texte_label = $('<label>');
    texte_label.attr('for', "amount");
    texte_label.text("Prix :")

    let texte_input = $('<input>');
    texte_input.attr('type', "text");
    texte_input.attr('id', "amount");
    texte_input.prop('readonly', true);
    texte_input.attr('style', "border:0; color:#f6931f; font-weight:bold;");

    texte.append(texte_label);
    texte.append(texte_input);

    let range = $('<div>');
    range.attr('id', 'slider-range');

    let wrap_range = $('<div>');
    wrap_range.addClass('wrap_range');

    wrap_range.append(texte);
    wrap_range.append(range);

    let tableau = $('<table>');
    tableau.attr('id', "liste");
    tableau.addClass("table");
    tableau.addClass("table-striped");
    tableau.append("<th scope='col'>Id</th><th scope='col'>Image</th><th scope='col'> Nom</th><th scope='col'>Prix Unitaire</th><th scope='col'>Quantité</th>");

    let prixTotal = $('<div>');
    prixTotal.addClass("divPrixTotal");
    prixTotal.append("<b>Prix total de la commande :</b>");

    let inputPrixTotal = $('<input>');
    inputPrixTotal.attr('id','prixTotal');
    inputPrixTotal.attr('disabled',"disabled");
    inputPrixTotal.val("0");

    let bouton_valider = $('<button>');
    bouton_valider.attr('id',"btn_val");
    bouton_valider.attr('type','button');
    bouton_valider.html("Passer commande");
    bouton_valider.attr('onclick',"recapitulatifCommande()");

    prixTotal.append(inputPrixTotal);
    prixTotal.append("€");
    prixTotal.append(bouton_valider);



    $('#container').append(categorie);
    $('#container').append(wrap_range);
    $('#container').append(tableau);
    $('#container').append(prixTotal);

};

function chargerCategorie() {
    $('#LSTCATEG').append("<option value=0 >Tous</option>");
    $.ajax({
        url: "ressources/json/categorieProduit.json",
        dataType: "json",
        async : false,
        success: function (data) {
            data.forEach(function (element) {
                $('#LSTCATEG').append("<option value="+ element.id +" >" + element.libelle + "</option>")
            })
        }
    });

};

function chargerTableau() {

    var produit ;

    $.ajax({
        url: "ressources/json/produits.json",
        dataType: "json",
        async: false,
        success: function (data) {
            data.forEach(function (element, index) {
                produit = [element.categorie.id, element.id, element.prixVente, 0, element.image,element.libelle];
                mesProduits[index+1] = produit;
            });
        }

    });
}

function chargerProd(categorie_id) {
    $("#liste").empty();
    var produit;
    $("#liste").append("<thead><th scope='col'>Id</th><th scope='col'>Image</th><th scope='col'> Nom</th><th scope='col'>Prix Unitaire</th><th scope='col'>Quantité</th></thead>");

    if(categorie_id != 0){
        for(var i = 1; i < mesProduits.length;i ++){
            produit = mesProduits[i];
            if (categorie_id == produit[0]) {
                if (produit[4] == null || produit[4] == "") {
                    var url = "ressources/img/no_image.png";
                }else{
                    var url = produit[4];
                }
                $("#liste").append("<tr class='ligne' scope='row'>" +
                '<td  id = "'+i+'">' + produit[1] + '</td>' +
                '<td><img width="auto" height="50px" src='+url+'></td>' +
                '<td>' + produit[5] + '</td>' +
                '<td id="prix'+i+'">' + produit[2] + '</td>' +
                '<td><button class="value-button" id="decrease" onclick="decreaseValue('+i+')" value="Decrease Value">-</button><input type="number" id="number'+i+'" value="'+produit[3]+'"  onchange="updatePrice('+i+')" /><button class="value-button" id="increase" onclick="increaseValue('+i+')" value="Increase Value">+</button></td>'+'</tr>')
            }
        }
    }

    else{
        for(var i = 1; i < mesProduits.length;i ++){
            produit = mesProduits[i];
            if (produit[4] == null || produit[4] == "") {
                var url = "ressources/img/no_image.png";
            }else{
                var url = produit[4];
            }
            $("#liste").append("<tr class='ligne' scope='row'>" +
            '<td  id = "'+i+'">' + produit[1] + '</td>' +
            '<td><img width="auto" height="50px" src='+url+'></td>' +
            '<td>' + produit[5] + '</td>' +
            '<td id="prix'+i+'">' + produit[2] + '</td>' +
            '<td><button class="value-button" id="decrease" onclick="decreaseValue('+i+')" value="Decrease Value">-</button><input type="number" id="number'+i+'" value="'+produit[3]+'"  onchange="updatePrice('+i+')" /><button class="value-button" id="increase" onclick="increaseValue('+i+')" value="Increase Value">+</button></td>'+'</tr>')
        }

    }


}

/* Partie passer une commande */

var prixTotal = 0;

function calculPrixTotalSomme(prix){
    prixTotal = parseFloat(document.getElementById('prixTotal').value);
    prixTotal += prix;
    document.getElementById('prixTotal').value = prixTotal.toFixed(2);
}

function calculPrixTotalSoustraction(prix){
    prixTotal = parseFloat(document.getElementById('prixTotal').value);
    if (prixTotal >= prix) {
        prixTotal -= prix;
    }
    document.getElementById('prixTotal').value = prixTotal.toFixed(2);
}

function increaseValue(index) {
    var produit;
    var id = (document.getElementById(index).innerText);
    var value = parseInt(document.getElementById('number'+index).value, 10);
    var prix = parseFloat(document.getElementById('prix'+index).innerText);

    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number'+index).value = value;

    produit = mesProduits[index];

    produit[3] = value;

    mesProduits[index] = produit;

    // console.log(mesProduits);

    calculPrixTotalSomme(prix);
}

function updatePrice(index){
    var produit = mesProduits[index];
    var id = (document.getElementById(index).innerText);
    var value = parseInt(document.getElementById('number'+index).value, 10);
    var prix = parseFloat(document.getElementById('prix'+index).innerText);

    var calculTotal = parseFloat(document.getElementById('prixTotal').value);

    if(value >= 0){
        if(produit[3] != value) {
            calculTotal -= prix * produit[3];
            // console.log(value);

            calculTotal += prix * value;
        }

        produit[3] = value;
        document.getElementById('prixTotal').value = calculTotal.toFixed(2);
    }


}

function decreaseValue(index) {
    var produit;
    var id = (document.getElementById(index).innerText);
    var value = parseInt(document.getElementById('number'+index).value, 10);
    var prix = parseFloat(document.getElementById('prix'+index).innerText);

    var limite = value;



    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;

    produit = mesProduits[index];

    produit[3] = value;

    mesProduits[index] = produit;

    // console.log(mesProduits);

    document.getElementById('number'+index).value = value;
    if (limite != 0) {
        calculPrixTotalSoustraction(prix);
    }
}

function recapitulatifCommande(){
    $("#idCategorie").css("display","none");
    $(".wrap_range").css("display","none");

    let btn_return = $('<button>');
    btn_return.attr('id', "btn_return_commande");

    let arrow_left = $('<i>');
    arrow_left.addClass("fas fa-arrow-left fa-2x");

    btn_return.append(arrow_left);
    $("#container").prepend(btn_return);

    let wrap_title_recap = $('<div>');
    wrap_title_recap.addClass("wrap_title_recap d-flex justify-content-center");
    let title_recap = $("<h3>");
    title_recap.text("Récapitulatif de la commande")

    wrap_title_recap.append(title_recap);
    $('#container').prepend(wrap_title_recap)

    $("#liste").empty();

    $("#liste").append("<thead><th scope='col'>ID</th><th scope='col'>Image</th><th scope='col'> NOM</th><th scope='col'>PU</th><th scope='col'>Quantité</th></thead>");

    for(var i = 1; i < mesProduits.length;i ++){
        produit = mesProduits[i];
        if (produit[3]>0) {
            if (produit[4] == null || produit[4] == "") {
                var url = "ressources/img/no_image.png";
            }else{
                var url = produit[4];
            }
            $("#liste").append("<tr class='ligne' scope='row'>" +
            '<td  id = "'+i+'">' + produit[1] + '</td>' +
            '<td><img width="auto" height="50px" src='+url+'></td>' +
            '<td>' + produit[5] + '</td>' +
            '<td id="prix'+i+'">' + produit[2] + '</td>' +
            '<td><input type="number" id="number'+i+'" value="'+produit[3]+'"  onchange="calculPrixTotal()" disabled="disabled"/></td>'+'</tr>')

        }
    }
    $('#btn_val').html("Valider Commande");
}


function slider() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 10,
        step: 0.5,
        values: [ 0, 2 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
}
