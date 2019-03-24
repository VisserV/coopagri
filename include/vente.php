<?php
$fp = fopen('../ressources/json/vente.json', 'w');
fwrite($fp, json_encode($_POST['VENTE_ID']));
fclose($fp);
?>