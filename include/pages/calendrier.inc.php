<script type="text/javascript">
  if((sessionStorage.User=="Admin") || (sessionStorage.CategorieId==1)){
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
<div id='wrap'>

  <div id='external-events'>
    <h4>Evenement déplaçable</h4>
    <p>
      <input type='checkbox' id='drop-remove' />
      <label for='drop-remove'>Effacer une fois insérer</label>
    </p>
  </div>

  <div id='calendar'></div>

  <div style='clear:both'></div>

  <div id="mapCalendar"></div>

  <script src="./js/mapsCalendar.js"></script>

  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s&callback=initMap"></script>


</div>
