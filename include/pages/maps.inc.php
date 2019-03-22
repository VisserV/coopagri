<div id="floating-panel">
  <strong>Départ :</strong>
  <select id="start">
<?php
    $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

    $sql = 'SELECT * FROM adresse a, itineraire i
                WHERE a.ADRESSE_ID = i.ADRESSE_ID
                AND i.ITINERAIRE_ID = 1
                ORDER BY ITINERAIRE_HEURE_PASSAGE';
    
        $adresses = $bdd->query($sql);

        
    
        foreach ($adresses as $adresse) {
        $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['ADRESSE_RUE_LIBELLE'].',+'
            .$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
            echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_RUE_LIBELLE'].', '.$adresse['ADRESSE_VILLE'].'</option>';
        }
?>
  </select>
  <br>
<?php
  for ($i = 0; $i<1; $i++) {
    echo '<strong>Etape'.$i.' :</strong>';
    echo '<select id="etape'.$i.'">';

      $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

      $sql = 'SELECT * FROM adresse a, itineraire i
                WHERE a.ADRESSE_ID = i.ADRESSE_ID
                AND i.ITINERAIRE_ID = 1
                ORDER BY ITINERAIRE_HEURE_PASSAGE';
    
        $adresses = $bdd->query($sql);

        
    
        foreach ($adresses as $adresse) {
        $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['ADRESSE_RUE_LIBELLE'].',+'
            .$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
            echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_RUE_LIBELLE'].', '.$adresse['ADRESSE_VILLE'].'</option>';
        }
    echo '</select>';
    echo '<br>';
  }
?>
  <strong>Arrivée :</strong>
  <select id="end">
<?php 

    $bdd = new PDO('mysql:host=localhost;dbname=clientriche_test;charset=utf8', 'bd', 'bede');

    $sql = 'SELECT * FROM adresse a, itineraire i
                WHERE a.ADRESSE_ID = i.ADRESSE_ID
                AND i.ITINERAIRE_ID = 1
                ORDER BY ITINERAIRE_HEURE_PASSAGE';
    
        $adresses = $bdd->query($sql);

        
    
        foreach ($adresses as $adresse) {
        $adresseComplete = $adresse['ADRESSE_RUE_NUM'].'+'.$adresse['ADRESSE_RUE_LIBELLE'].',+'
            .$adresse['ADRESSE_CP'].'+'.$adresse['ADRESSE_VILLE'].',+FRANCE';
            echo '<option value="'.$adresseComplete.'">'.$adresse['ADRESSE_RUE_LIBELLE'].', '.$adresse['ADRESSE_VILLE'].'</option>';
        }
?>
  </select>
</div>
<div id="right-panel"></div>
<div id="map"></div>

<script src="./js/maps.js"></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s&callback=initMap"></script>
