<script>
if (sessionStorage.CategorieId == 1) {
    <?php $_SESSION["role"] = "Livreur"; ?>

}

if (sessionStorage.UserId == 0) {
    <?php $_SESSION["role"] = "Admin"; ?>
}

if (sessionStorage.Entreprise == "Entreprise") {
    <?php $_SESSION["role"] = "Entreprise"; ?>
}
</script>

<div class="img_Accueil">
    <img src="ressources/img/market.jpg" alt="coopagri">
</div>

