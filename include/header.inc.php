<?php session_start(); ?>
<!doctype html>
<html lang="fr">

<head>
 <title>Coopagri</title>

 <meta charset="utf-8">

 <link rel="stylesheet" href="css/reset.css">
 <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
 <link rel="stylesheet" href="css/styleCommande.css">
   <!--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


</head> 

<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">Coopagri</a>
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
    <a class="dropdown-item" href="#">Catalogue</a>
    <a class="dropdown-item" href="index.php?page=31">Lister commande</a>
    <a class="dropdown-item" href="index.php?page=36">Passer commande</a>
    <a class="dropdown-item" href="#">Livraison</a>
    <a class="dropdown-item" href="#">Statistiques</a>
</div>
</li>
</ul>
</div>
</nav>

<div class="Menu_Accueil_Commande">
    <div class="Title_Menu_Accueil_Commande">
        <a href="index.php?page=0">Menu commande</a>
    </div>
    <?php
    if(!isset($_SESSION["login"])) {
        ?>
        <div class="Connexion_Menu_Accueil_Commande">
            <a href="index.php?page=33">Connexion</a>
        </div>
        <?php
    } else {
        ?>
        <div class="Deconnexion_Menu_Accueil_Commande">
            <a href="index.php?page=35">Déconnexion</a>
        </div>

        <div class="Catalogue_Menu_Accueil_Commande">
            <a href="index.php?page=32">Catalogue</a>
        </div>
        <div class="dropdown Commande_Menu_Accueil_Commande">
            <a>Commande</a>
            <div class="dropdown-content">
                <a href="index.php?page=31">Lister commande</a>
                <a href="index.php?page=36">Passer commande</a>
            </div>
        </div>
        <div class="Livraison_Menu_Accueil_Commande">
            <a href="index.php?page=30">Livraison</a>
        </div>
        <div class="Facture_Menu_Accueil_Commande">
            <a href="#">Facture</a>
        </div>
        <div class="Pénalités_Menu_Accueil_Commande">
            <a href="#">Pénalités</a>
        </div>
        <div class="Historique_Menu_Accueil_Commande">
            <a href="#">Historique</a>
        </div>
        <?php
    }
    ?>

    <div class="Stat_Menu_Accueil_Commande">
        <a href="index.php?page=37">Statistiques</a>
    </div>
</div>




<div class="container-fluid"></div>


</body>