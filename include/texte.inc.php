<div id="texte">
<?php
if (!empty($_GET["page"])){
	$page=$_GET["page"];}
	else
	{$page=0;
	}
switch ($page) {
//
// Personnes
//

case 0:
	// inclure ici la page accueil photo
	include_once('pages/accueil.inc.php');
	break;

case 1:

    include_once('pages/CommandeMenu.inc.php');
    break;

case 31:
    // inclure ici la page ConsulterCommande
    include_once('pages/ConsulterCommande.inc.php');
    break;
// page insertion nouveau client



//
// Commandes Livraison
//

case 30:
    // inclure ici la page accueil photo
    include_once('pages/CommandeConsulterLivraison.inc.php');
    break;  

case 32:
    include_once('pages/CommandeConsulterCatalogue.inc.php');
    break;
default : 	include_once('pages/accueil.inc.php');
}

?>
</div>
