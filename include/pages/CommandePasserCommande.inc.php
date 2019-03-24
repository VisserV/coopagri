<div id="container">
	<script type="text/javascript">
		if (sessionStorage.CategorieId == 2) {
		}else{
			window.location.replace("index.php?page=1");
		}
	</script>
	<script src ="js/CommandePasserCommande.js"></script>

</div>

<?php
$_SESSION["id_vente"]= 1;
?>