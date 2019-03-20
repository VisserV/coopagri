<div id="texte">
<?php
if (!empty($_GET["page"])){
    $page=$_GET["page"];
} else {
    $page=0;
}

if(isset($_SESSION["id"])){

    switch ($page) {

        case 0:
            // inclure ici la page accueil photo
            include_once('pages/accueil.inc.php');
            break;
        
        case 35:
            include_once('pages/Deconnexion.inc.php');
            break;

        default : include_once('pages/accueil.inc.php');
    }
        // page insertion nouveau client
} else {

    switch ($page) {

        case 33:
            include_once('pages/Connexion.inc.php');
            break;
        

        default : include_once('pages/Connexion.inc.php');
    }
}

if(isset($_SESSION["admin"])){

    switch ($page) {

        case 37:
            include_once('pages/StatCommande.inc.php');
        //
        // Commandes Livraison
        //
        default : include_once('pages/accueil.inc.php');
    }

} else if(isset($_SESSION["client"])) {

    switch ($page) {
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

        case 34:
            include_once('pages/ConsulterCommandeLivraison.inc.php');
            break;
    }
} else if(isset($_SESSION["livreur"])) {

    switch ($page) {
        case 34:
            include_once('pages/ConsulterCommandeLivraison.inc.php');
            break;
    }
}

?>
</div>
