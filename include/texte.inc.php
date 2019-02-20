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
	// page insertion nouveau client
case 11:
	include_once('pages/calendrier.inc.php');
	break;
default : 	include_once('pages/accueil.inc.php');
}

?>
</div>
