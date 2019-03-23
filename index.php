<?php
require_once("include/autoLoad.inc.php");
require_once("include/config.inc.php");
require_once("include/functions.inc.php");

session_start();
date_default_timezone_set('Europe/Paris');

require_once("include/header.inc.php");
?>

<div class="container-fluid">
    <?php
    require_once("include/texte.inc.php");
    ?>
</div>

<?php
require_once("include/footer.inc.php"); ?>
