<?php
unset($_SESSION['login']);
header('Location: index.php?page=0');
exit();
?>