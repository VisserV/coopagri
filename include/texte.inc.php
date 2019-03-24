<?php
if (!empty($_GET["page"])){
    $page=$_GET["page"];
} else {
    $page=0;
}

switch ($page) {

    default: include_once('pages/accueil.inc.php');

    case 0:
    // inclure ici la page accueil photo
    include_once('pages/accueil.inc.php');
    break;

    case 1:
    include_once('pages/redirection.inc.php');
    break;

    /* Partie Plannification */
    case 11:
    include_once('pages/calendrier.inc.php');
    break;
    case 12:
    include_once('pages/maps.inc.php');
    break;


    /* Partie Commande */
    case 30:
    // inclure ici la page accueil photo
    include_once('pages/CommandeConsulterLivraison.inc.php');
    break;

    case 31:
    // inclure ici la page ConsulterCommande
    include_once('pages/ConsulterCommande.inc.php');
    break;

    case 32:
    include_once('pages/CommandeConsulterCatalogue.inc.php');
    break;

    case 33:
    include_once('pages/Connexion.inc.php');
    break;

    case 34:
    include_once('pages/ConsulterCommandeLivraison.inc.php');
    break;

    case 35:
    include_once('pages/Deconnexion.inc.php');
    break;

    case 36 :
    include_once('pages/CommandePasserCommande.inc.php');
    break;

    case 37:
    include_once('pages/StatCommande.inc.php');
    break;

    case 101:
    include_once('pages/InformationCompte.inc.php');
    break;

    case 102:
    include_once('pages/Inscription.inc.php');
    break;

    /* Partie Facturation */
    case 51:
        include_once('pages/GraphiqueFacturation.inc.php');
        break;
    case 52:
        include_once ('pages/listerFacture.inc.php');
	      break;
    case 53:
        include_once('pages/facture.inc.php');
        break;
}

?>
</div>
