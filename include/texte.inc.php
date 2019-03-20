<?php if(!isset($_GET['fct'])){ ?>
<div id="texte">
<?php }
if (!empty($_GET["page"])){
	$page=$_GET["page"];}
	else
	{$page=0;
	}
switch ($page){
//
// Personnes
//

    case 0:
	// inclure ici la page accueil photo
	include_once('pages/accueil.inc.php');
	break;
	// page insertion nouveau client
    /*facturation entre 50 et 60 */
    case 50:
        include_once('pages/facture.inc.php');
        break;
    case 51:
        include_once('pages/GraphiqueFacturation.php');
    case 60 :
        include_once('pages/facturationGet.php');
        break;
default : 	include_once('pages/accueil.inc.php');
} ?>
<?php if(!isset($_GET['fct'])){?>
</div>
    <?php } ?>