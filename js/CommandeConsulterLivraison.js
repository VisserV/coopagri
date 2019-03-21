$(document).ready(function(){	
	init();
	chargerInfoLivraison();
});

function init (){
	let div = $('<div>');

	let tableau = $('<table>');
	tableau.attr('id',"LSTPDT");
	tableau.addClass('tableauLivraison');
	tableau.append('<tr><th>Numéro commande</th><th>Date de livraison estimée</th><th>Adresse de livraison</th><th>Adresse de facturation</th><th>Produits</th></tr>');
	div.append(tableau);
	$('body').append(div);
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

