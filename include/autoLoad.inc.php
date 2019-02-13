<?php
spl_autoload_register(function ($className) {
    $repClasses='class/';
    require $repClasses.$className.'.class.php';
}
);