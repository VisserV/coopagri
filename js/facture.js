function init() {
    let accordion = $('<div>')
    let label = $('<label>');
    accordion.attr('id', 'accordion');
    $('#container').append(label);
    $('#container').append(accordion);
    label.append('Facture');

    label.attr('class','titre');
};

function chargerClient() {
    $.ajax({
        url: '/coopagri/ressources/json/listeFacture.json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let accordion = $('#accordion');
            $.each(data, function (i, donne){
                let ligne = $('<h3>');
                let div = $('<div>');
                let totaux =$('<b>');
                ligne.append("la facture :"+ donne.id_facture + " crée le : "+donne.date_creation+ " à payé par :"+donne.nom_client);
                accordion.append(ligne);
                prods = "";
                $.each(donne.produits,function (i,prod) {
                    prods = prods + " nom : "+ prod.nom + " prix_unite : "+prod.prix_unite + " quantité : "+prod.quantite + " total : "+prod.prix_produits+ "<br>";
                });
                div.append("<br>"+ "Client : "+ donne.nom_client+ "</br>"+ donne.adresse_client+ "</br>"+" date de création : "+ donne.date_creation+"</br>"+ "date d'échéance : "+ donne.date_echeance+"</br>"+" produits :"+"</br>"+prods+"</p>");

                totaux.append("Totaux : "+donne.totaux);
                div.append(totaux);
                accordion.append(div);

                ligne.attr('class', 'titre_facture');
                div.attr('class','contenu_facture');
                totaux.attr('class', 'totaux_facture');
            });
        },
    });
}

init();
chargerClient();
$(document).ready(function() {
    $( "#accordion" ).accordion();
} );


