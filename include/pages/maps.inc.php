<div id="floating-panel">
  <strong>Itinéraire :</strong>
  <select id="iti">
    <option value="1">itinéraire</option>
<?php
    $bdd = new Mypdo();

    $sql = 'SELECT DISTINCT ITINERAIRE_ID FROM itineraire i';

    $itineraires = $bdd->query($sql);
    foreach ($itineraires as $itineraire) {
      echo '<option value="'.$itineraire['ITINERAIRE_ID'].'">'.$itineraire['ITINERAIRE_ID'].'</option>';
    }
?>
  </select>
  <br>
</div>

<div id="right-panel"></div>
<div id="map"></div>

<script src="./js/maps.js"></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s&callback=initMap"></script>
