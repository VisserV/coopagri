<?php
function __autoload($className){
	$repClasses='class/';
	require $repClasses.$className.'.class.php';
}