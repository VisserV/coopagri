<?php
require_once("include/autoLoad.inc.php");
require_once("include/config.inc.php");
require_once("include/functions.inc.php");
$pdo = new Mypdo();
$PlanificationManager = PlanificationManager($pdo);
switch ($_GET['fname']) {
     case 'fonctionInsert':
          $PlanificationManager.addItinairaire($_GET['id'],$_GET['heure']);
          break;

     default:
          // code...
          break;
}
 ?>
