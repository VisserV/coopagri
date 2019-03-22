<link rel="icon" href="ressources/img/coopAgri" type="image/png" sizes="16x16">

<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/stylesheet.css">
<link rel="stylesheet" href="css/styleCommande.css">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<script src="http://code.jquery.com/jquery-3.3.1.js"
integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/main.js"></script>
<script src="js/menuConnexion.js"></script>


<script>
    if (sessionStorage.CategorieId == 1) {
        <?php $_SESSION["role"] = "Livreur";    ?>
    }

    if (sessionStorage.UserId == 0) {
        <?php $_SESSION["role"] = "Admin"; ?>
    }

    if (sessionStorage.Entreprise == "Entreprise") {
        <?php $_SESSION["role"] = "Entreprise"; ?>
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="index.php?page=0">
            <img src="ressources/img/coopAgri.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Coopagri
        </a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Facture
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Lister facture</a>
                    <a class="dropdown-item" href="#">Consulter statistiques</a>
                    <a class="dropdown-item" href="#">Attribuer facture</a>
                </div>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Planification
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Calendrier</a>
                    <a class="dropdown-item" href="#">Map</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Livraison
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">



                    <a class="dropdown-item" href="index.php?page=32">Catalogue</a>
                    <a class="dropdown-item" href="index.php?page=31">Lister commande</a>
                    <a class="dropdown-item" href="index.php?page=36">Passer commande</a>
                    <a class="dropdown-item" href="index.php?page=30">Livraison</a>
                    <a class="dropdown-item" href="index.php?page=37">Statistiques</a>

                </div>
            </li>
        </ul>
    </div>
</nav>



<?php
if(isset($_POST['jsonHide'])){

    $jsonString = $_POST['jsonHide'];
    $json = json_decode($jsonString, true);
    $json +=1 ;
    $_SESSION['nbCo'] = $json;
    $fp = fopen('clientsConnectes.json', 'w');
    fwrite($fp, json_encode($json));
    fclose($fp);

}



if(isset($_POST['jsonHideWrite'])){

    $jsonString = $_POST['jsonHideWrite'];
    if ($_SESSION['nbCo'] > 0) {
        $_SESSION['nbCo'] = $_SESSION['nbCo'] - 1;
    }

    $fp = fopen('clientsConnectes.json', 'w');
    fwrite($fp, json_encode($_SESSION['nbCo']));
    fclose($fp);

}
?>
