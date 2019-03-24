<?php
session_start();
$id_vente = (string)$_SESSION["id_vente"];
echo 'console.log('. $id_vente .')';
$fp = fopen("../ressources/json/vente".$id_vente.".json", 'w');
fwrite($fp, json_encode($_POST['VENTE_ID']));
fclose($fp);
++$_SESSION["id_vente"];
?>