if(sessionStorage.CategorieId=="2"){
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
        bouton_valider.attr('onclick',"btn_commande()");

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
        $("#title_recap").remove();
        $("#btn_return_commande").remove();

        $("#idCategorie").css("display","block");
        $(".wrap_range").css("display","block");

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

    function chargerProdParPrix(categorie_id,prix_min, prix_max) {
        $("#liste").empty();
        $("#title_recap").remove();
        $("#btn_return_commande").remove();

        $("#idCategorie").css("display", "block");
        $(".wrap_range").css("display", "block");

        var produit;
        $("#liste").append("<thead><th scope='col'>Id</th><th scope='col'>Image</th><th scope='col'> Nom</th><th scope='col'>Prix Unitaire</th><th scope='col'>Quantité</th></thead>");
        if(categorie_id != 0) {
            for (var i = 1; i < mesProduits.length; i++) {
                produit = mesProduits[i];
                if (categorie_id == produit[0]) {
                    if (produit[2] >= prix_min && produit[2] <= prix_max) {
                        if (produit[4] == null || produit[4] == "") {
                            var url = "ressources/img/no_image.png";
                        } else {
                            var url = produit[4];
                        }
                        $("#liste").append("<tr class='ligne' scope='row'>" +
                            '<td  id = "' + i + '">' + produit[1] + '</td>' +
                            '<td><img width="auto" height="50px" src=' + url + '></td>' +
                            '<td>' + produit[5] + '</td>' +
                            '<td id="prix' + i + '">' + produit[2] + '</td>' +
                            '<td><button class="value-button" id="decrease" onclick="decreaseValue(' + i + ')" value="Decrease Value">-</button><input type="number" id="number' + i + '" value="' + produit[3] + '"  onchange="updatePrice(' + i + ')" /><button class="value-button" id="increase" onclick="increaseValue(' + i + ')" value="Increase Value">+</button></td>' + '</tr>')
                    }
                }

            }
        }
        else{
            for(var i = 1; i < mesProduits.length;i ++){
                produit = mesProduits[i];
                if (produit[2] >= prix_min && produit[2] <= prix_max) {
                    if (produit[4] == null || produit[4] == "") {
                        var url = "ressources/img/no_image.png";
                    } else {
                        var url = produit[4];
                    }
                    $("#liste").append("<tr class='ligne' scope='row'>" +
                        '<td  id = "' + i + '">' + produit[1] + '</td>' +
                        '<td><img width="auto" height="50px" src=' + url + '></td>' +
                        '<td>' + produit[5] + '</td>' +
                        '<td id="prix' + i + '">' + produit[2] + '</td>' +
                        '<td><button class="value-button" id="decrease" onclick="decreaseValue(' + i + ')" value="Decrease Value">-</button><input type="number" id="number' + i + '" value="' + produit[3] + '"  onchange="updatePrice(' + i + ')" /><button class="value-button" id="increase" onclick="increaseValue(' + i + ')" value="Increase Value">+</button></td>' + '</tr>')
                }
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
        $("#form_ad").css("display", "none");
        $("#liste").css("display", "");
        $("#idCategorie").css("display","none");
        $(".wrap_range").css("display","none");

        let btn_return = $('<button>');
        btn_return.attr('id', "btn_return_commande");
        btn_return.attr('onclick',"chargerProd(0)");

        let arrow_left = $('<i>');
        arrow_left.addClass("fas fa-arrow-left fa-2x");

        btn_return.append(arrow_left);
        $("#container").prepend(btn_return);

        let wrap_title_recap = $('<div>');
        wrap_title_recap.addClass("wrap_title_recap d-flex justify-content-center");

        let title_recap = $("<h3>");
        title_recap.text("Récapitulatif de la commande");
        title_recap.attr('id',"title_recap");

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
                    '<td class="input_RecapCommande"><input type="number" id="number'+i+'" value="'+produit[3]+'"  onchange="calculPrixTotal()" disabled="disabled"/></td>'+'</tr>')

            }
        }
        $('#btn_val').html("Valider Commande");
        //$('#btn_val').attr('onclick', "saisirAdresse()");
}

function saisirAdresse() {

    $("#liste").css("display","none");
    $("#infoLivraison").css("display","none");

    $("#title_recap").text("Adresse de livraison");

    let btn_val_ad = $('<button>');
    btn_val_ad.attr('id', "btn_ad");
    btn_val_ad.html("Valider Adresse");
    btn_val_ad.attr('onclick',"recapTotal()");
    //$("#btn_val").attr('onclick',"btn_commande()");

    $("#btn_return_commande").attr('onclick',"recapitulatifCommande()");

    let p1 = $("<p>");
    let p2 = $("<p>");
    let p3 = $("<p>");
    let p4 = $("<p>");
    let form = $("<form>");
    let paysClient = $("<input>");
    let codePosClient = $("<input>");
    let villeClient = $("<input>");
    let adresseClient = $("<input>");

    form.attr('id', 'form_ad');

    p1.text("Pays :");
    paysClient.attr('type',"text");
    paysClient.attr('class',"form-control");
    paysClient.attr('placeholder',"Pays");
    paysClient.attr('id',"paysClient");
    paysClient.appendTo(p1);

    p2.text("Code Postal :");
    codePosClient.attr('type',"text");
    codePosClient.attr('class',"form-control");
    codePosClient.attr('placeholder',"Code Postal");
    codePosClient.attr('id',"codePosClient");
    codePosClient.appendTo(p2);

    p3.text("Ville :");
    villeClient.attr('type',"text");
    villeClient.attr('class',"form-control");
    villeClient.attr('placeholder',"Ville");
    villeClient.attr('id',"villeClient");
    villeClient.appendTo(p3);

    p4.text("Adresse :");
    adresseClient.attr('type',"text");
    adresseClient.attr('class',"form-control");
    adresseClient.attr('placeholder',"Adresse");
    adresseClient.attr('id',"adresseClient");
    adresseClient.appendTo(p4);

    p1.appendTo(form);
    p2.appendTo(form);
    p3.appendTo(form);
    p4.appendTo(form);

    form.appendTo($("#container"));

    btn_val_ad.insertAfter(form);

    $(".divPrixTotal").css("display", "none");

}

function recapTotal() {
    $("#idCategorie").css("display","none");
    $(".wrap_range").css("display","none");
    $("#form_ad").css("display", "none");



    $("#liste").css("display","");

    $("#title_recap").text("Informations Commande");

    $("#btn_return_commande").attr('onclick',"saisirAdresse()");

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
                '<td class="input_RecapCommande"><input type="number" id="number'+i+'" value="'+produit[3]+'"  onchange="calculPrixTotal()" disabled="disabled"/></td>'+'</tr>')

        }
    }

    let infoLivraison = $("<div>");
    infoLivraison.attr("id", "infoLivraison");

    let titreAdresse = $("<h4>");
    titreAdresse.text("Adresse de livraison");

    let infoPays = $("<p>");
    infoPays.text($("#paysClient").val());

    let infoCodePos = $("<p>");
    infoCodePos.text($("#codePosClient").val());

    let infoVille = $("<p>");
    infoVille.text($("#villeClient").val());

    let infoAdresse = $("<p>");
    infoAdresse.text($("#adresseClient").val());

    titreAdresse.appendTo(infoLivraison);
    infoPays.appendTo(infoLivraison);
    infoCodePos.appendTo(infoLivraison);
    infoVille.appendTo(infoLivraison);
    infoAdresse.appendTo(infoLivraison);

    infoLivraison.appendTo($("#container"));

    infoLivraison.css("text-align", "center");

    $("#btn_ad").css("display", "block");
    $("#btn_ad").attr("onclick","envoiJson()");
    $("#title_recap").css("display", "none");
    }


    function slider() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 10,
            step: 0.5,
            values: [ 0, 5 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
                categorie = $("#LSTCATEG").val();
                console.log(categorie);
                chargerProdParPrix(categorie,ui.values[ 0 ],ui.values[ 1 ]);
            }
        });
        $( "#amount" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) +
            " - €" + $( "#slider-range" ).slider( "values", 1 ) );
    }
}else{
    window.location.replace("index.php?page=1");
}

function envoiJson() {

    var produit;
    var bool = true;
    var commande = new Array();
    for(var i = 1; i < mesProduits.length;i ++) {
        produit = mesProduits[i];
        if (bool){
            bool = false;
            if (produit[3] > 0) {
                commande = [{
                    "VENTE_ID" : 1,
                    "COMMANDE_ID" : 1,
                    "PRODUIT_ID" : produit[1],
                    "VENTE_QUANTITE" : produit[3],
                }];
            }
        }
        else{
            if (produit[3] > 0) {
                var commande2 = [{
                    "VENTE_ID" : 1,
                    "COMMANDE_ID" : 1,
                    "PRODUIT_ID" : produit[1],
                    "VENTE_QUANTITE" : produit[3],
                }];
                commande = commande.concat(commande2);
            }
        }

    }

    var commande2 = [{

        "PAYS" : $("#paysClient").val(),
        "CODE_POSTAL" : $("#codePosClient").val(),
        "VILLE" : $("#villeClient").val(),
        "ADRESSE" : $("#adresseClient").val(),

    }];

    commande = commande.concat(commande2);
    console.log(commande);
    var param = JSON.stringify(commande);

    $.ajax({
        url: "include/vente.php",
        method : "post",
        data :  {'VENTE_ID' : param},
        async : false,
        success: function (response) {
            console.log("CA MARCHE"+param, response);
        },
        error:function (request, response, statut) {
            console.log("Erreur :"+request.responseText);
        }
    });

    alert("Votre commande est validé ! ");
    chargerTableau();
    chargerProd(0);
    $("#btn_ad").css("display", "none");
    infoLivraison.remove();

}
var int = 1;
function btn_commande(){

    switch (int)
    {
    case 1:
        {
            recapitulatifCommande();
            int = 2;
            break;
        }
    case 2 :
        {
            saisirAdresse();
            int = 3;
            break;
        }
        default :
        {
            alert("erreur");
            int = 1;
        }

    }
}