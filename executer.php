<?php 
if(!(isset($_GET["lang"]))){
	header("Location:/");
}
switch($_GET["lang"]){
	case "tr":
		include "php_files/TR/executer.php" ;
		break;
	case "en":
		include "php_files/EN/executer.php" ;
		break;
	default:
		header("Location:/?error=unexpectedlang");

}
?>