<div id="floating-panel">
  <strong>Départ :</strong>
  <select id="start">
<?php
    $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

    $sql = 'SELECT * FROM adresse a, ruetype r
            WHERE a.RUE_TYPE_ID = r.RUE_TYPE_ID';

    $adresses = $bdd->query($sql);

    foreach ($adresses as $adresse) {
      $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['RUE_TYPE_LIBELLE'].'+'
          .$adresse['ADRESSE_RUE_NOM'].',+'.$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
      echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_NOM'].'</option>';
    }
?>
  </select>
  <br>
<?php
  for ($i = 0; $i<4; $i++) {
    echo '<strong>Etape'.$i.' :</strong>';
    echo '<select id="etape'.$i.'">';

      $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

      $sql = 'SELECT * FROM adresse a, ruetype r
              WHERE a.RUE_TYPE_ID = r.RUE_TYPE_ID';

      $adresses = $bdd->query($sql);

      foreach ($adresses as $adresse) {
        $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['RUE_TYPE_LIBELLE'].'+'
            .$adresse['ADRESSE_RUE_NOM'].'+'.$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
        echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_NOM'].'</option>';
      }
    echo '</select>';
    echo '<br>';
  }
?>
  <strong>Arrivée :</strong>
  <select id="end">
<?php 

    $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

    $sql = 'SELECT * FROM adresse a, ruetype r
            WHERE a.RUE_TYPE_ID = r.RUE_TYPE_ID';

    $adresses = $bdd->query($sql);

    foreach ($adresses as $adresse) {
      $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['RUE_TYPE_LIBELLE'].'+'
        .$adresse['ADRESSE_RUE_NOM'].'+'.$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
      echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_NOM'].'</option>';
    }
?>
  </select>
</div>
<div id="right-panel"></div>
<div id="map"></div>

<script src="./js/maps.js"></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s&callback=initMap"></script>
