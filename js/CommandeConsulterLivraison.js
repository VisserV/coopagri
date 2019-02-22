$(document).ready(function(){	

	/*let div = $('<div>');
	div.addClass('MenuLivraison');

	let spanNumCommande = $('<span>');
	spanNumCommande.text('Numéro commande : ');

	let spanDateLivraison = $('<span>');
	spanDateLivraison.text('Date de livraison estimée : ');

	let spanAdresseLivraison = $('<span>');
	spanAdresseLivraison.text('Adresse de livraison : ');

	let spanAdresseFacturation = $('<span>');
	spanAdresseFacturation.text('Adresse de Facturation : ');

	let spanProduit = $('<span>');
	spanProduit.text('Produits : ');

	div.append(spanNumCommande, spanDateLivraison, spanAdresseLivraison, spanAdresseFacturation, spanProduit);
	$('body').append(div);*/

	init();
	chargerInfoLivraison();
});

function init (){
	let div = $('<div>');
	//div.addClass('MenuLivraison');

	let tableau = $('<table>');
	tableau.attr('id',"LSTPDT");
	tableau.addClass('tableauLivraison');
	tableau.append('<tr><th>Numéro commande</th><th>Date de livraison estimée</th><th>Adresse de livraison</th><th>Adresse de facturation</th></tr>');
	div.append(tableau);
	$('body').append(div);
};

function chargerInfoLivraison(){

	$.ajax({
		url:"ressources/json/livraisons.json",
		dataType :"json",
		success:function(data){
			data.forEach(function(element){
				console.log(element.commande.client);
				$('table').append('<tr><th>'+element.id+'</th><th>'
					+element.commande.dateLivraison+'</th><th>'
					+element.commande.adresseLivraison.societe+' <br>'
					+element.commande.adresseLivraison.rueNumero+' '
					+element.commande.adresseLivraison.rueNumeroComplement+' <br>'
					+element.commande.adresseLivraison.rueType+' '
					+element.commande.adresseLivraison.rueNom+' <br>'
					+element.commande.adresseLivraison.codePostal+' '
					+element.commande.adresseLivraison.ville+'</th><th>'
					+element.commande.client.facturationAdresse+'</th></tr>')
			})

		}
	});
}

