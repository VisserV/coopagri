<?php
require_once("include/functions.inc.php");
require_once("include/autoLoad.inc.php");
require_once("include/config.inc.php");
if(!isset($_GET['fct'])){
    require_once("include/header.inc.php");


    $pdo = new Mypdo();
    ?>
    <div id="corps">
        <?php
    }
    require_once("include/texte.inc.php");
    if(!isset($_GET['fct'])){
?>
</div>
    <div id="spacer"></div>
<?php
require_once("include/footer.inc.php");
}?>
