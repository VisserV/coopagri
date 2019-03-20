<?php
unset($_SESSION['id']);
if(isset($_SESSION['client'])) {
    unset($_SESSION['client']);
}
if(isset($_SESSION['admin'])) {
    unset($_SESSION['admin']);
}
if(isset($_SESSION['livreur'])) {
    unset($_SESSION['livreur']);
}
header('Location: index.php?page=0');
exit();
?>