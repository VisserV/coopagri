init();

function init(){
	let container = $('<div>');
	let p1 = $("<p>");
	let p2 = $("<p>");
	p1.text("Erreur, vous n'avez pas le droit d'acceder à cette page.");
	p2.text("Vous allez être redirigé vers l'accueil");

	p1.appendTo(container);
	p2.appendTo(container);
	container.append("<img src='ressources/img/loading.gif'>");
	$('#container').append(container);



	setTimeout(function(){
		window.location.replace("index.php?page=0");
	}, 2000);


}
