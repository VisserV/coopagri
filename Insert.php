<?php
require_once("include/autoLoad.inc.php");
require_once("include/config.inc.php");
require_once("include/functions.inc.php");
$pdo = new Mypdo();
$PlanificationManager = new PlanificationManager($pdo);
switch ($_GET['fname']) {
     case 'fonctionInsert':
          $PlanificationManager->addItineraire($_GET['id'],$_GET['idAd'],$_GET['heure']);
          break;

     case 'fonctionUpdate':
          $PlanificationManager->updateItineraire($_GET['idAd'],$_GET['heure']);
          break;

     case 'fonctionSelect':
          $PlanificationManager->selectItineraire($_GET['id']);
          break;
          
     default:
          // code...
          break;
}
 ?>
