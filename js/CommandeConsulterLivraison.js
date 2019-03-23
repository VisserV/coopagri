$(document).ready(function(){
	let div = $("<div>");
	div.addClass("head_ConsulterLivraison");
	div.append("<h1> Livraisons </h1>")
	$('#container').append(div);

	init();
	chargerInfoLivraison();
});

function init (){

	let table = $("<table>");
    table.addClass("table");
    table.attr('id',"lstPdt");
    table.addClass("table-striped");
	table.addClass("table_Livraison");
    table.append("<thead><tr><th scope='col' class='align-middle'>Numéro commande</th><th scope='col' class='align-middle'>Date de livraison estimée</th><th scope='col' class='align-middle'>Adresse de livraison</th><th scope='col' class='align-middle'>Adresse de facturation</th><th scope='col' class='align-middle'>Produits</th></tr></thead>");

    $('#container').append(table);
};

function chargerproduits(){
	var th = $('<th>');
	$.ajax({
		url:"ressources/json/livraisons.json",
		dataType :"json",
		success:function(data){
			$.each(data, function(element){
				$.each(element.lignes,function(lgn) {
					console.log(lgn);
					$(th).append(lgn.produit.libelle+' - '
						+lgn.quantite+' <br>')
				})
			})
		}
	});
}
function chargerInfoLivraison(){
	$.ajax({
		url:"ressources/json/livraisons.json",
		dataType :"json",
		success:function(data){
			data.forEach(function(element){
				$('table').append('<tr><td>'
					+element.id+'</td><td>'
					+element.commande.dateLivraison+'</td><td>'
					+element.commande.adresseLivraison.societe+' <br>'
					+element.commande.adresseLivraison.rueNumero+' '
					+element.commande.adresseLivraison.rueNumeroComplement+' <br>'
					+element.commande.adresseLivraison.rueType+' '
					+element.commande.adresseLivraison.rueNom+' <br>'
					+element.commande.adresseLivraison.codePostal+' '
					+element.commande.adresseLivraison.ville+'</td><td>'
					+element.commande.client.facturationAdresse+'</td><td><a href="index.php?page=34"><button type="button">Détails</button></a></td></tr>')

			})

		}
	});
}
