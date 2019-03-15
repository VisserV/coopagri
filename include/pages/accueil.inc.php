<p>coucou</p>
<?php
$pdo = new Mypdo();
$commandeManager = new CommandeManager($pdo);
$testjson = $commandeManager->getPrixParMoisEtFournisseur();
echo($testjson);
?>
