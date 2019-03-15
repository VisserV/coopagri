<?php session_start(); ?>
<!doctype html>
<html lang="fr">

<head>
     <title>Coopagri</title>

     <meta charset="utf-8">

    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/styleCommande.css">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


</head>

<body>

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




          <div class="container-fluid">
