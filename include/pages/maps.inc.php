<script type="text/javascript">
  if ((sessionStorage.CategorieId == 1)||(sessionStorage.User=="Admin")) {
  }else{
    window.location.replace("index.php?page=1");
  }
</script>
<script src='./js/lib/moment.min.js'></script>
<script src='./js/lib/jquery.min.js'></script>
<script src='./js/lib/jquery-ui.min.js'></script>
<script src='./js/fullcalendar.min.js'></script>
<script src='./js/scheduler.js'></script>
<script src='./js/calendrier.js'></script>
<script src='./js/locale/fr.js'></script> 
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
