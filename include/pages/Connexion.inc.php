<?php
$pdo = new Mypdo();
if(empty($_POST["login"]) || empty($_POST["password"])) {
  ?>
  <h1>Pour vous connecter</h1>
  <form action="index.php?page=11" name ="connexion_personne" method="post">

    Nom d'utilisateur : <br><input type="text" name="login" required/><br>
    Mot de passe : <br><input type="password" name="password" required/><br><br>

    <input type="submit" value="Valider" />
  </form>
  <?php
} if(!empty($_POST["login"]) && !empty($_POST["password"])) {
  $compteManager = new CompteManager($pdo);

  $compte = $compteManager->getCompte_from_login($_POST["login"]);
  if(!is_null($compte->getCompte_id())) {

    if($client->getCompte_pass() == sha1(sha1($_POST["password"]).SALT)) {

      $_SESSION["login"] = $_POST["login"];
      echo "Connecté.";
      sleep(1);
      header('Location: index.php?page=0');
      exit();

    } else {
      echo "Mot de passe invalide.";
    }
  } else {
    echo "Nom d'utilisateur invalide.";
  }
}
?>