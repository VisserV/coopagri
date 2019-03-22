var map;
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6.5,
      center: {lat: 46.862725, lng: 2.287592}
    });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function inscrireMarkers(lat, lng, type){
    var iconBase = './ressources/img/';
    var icons = {
        depart: {
            icon: iconBase + 'iconDepart.png'
        },
        fournisseur: {
            icon: iconBase + 'iconFournisseur.png'
        },
        client: {
            icon: iconBase + 'iconClient.png'
        },
        inconnu: {
            icon: iconBase + 'iconInconnu.png'
        }
    };

    var iconArret;

    if (type == 'fournisseur') {
        iconArret = icons.fournisseur.icon;
    } else if (type == 'client') {
        iconArret = icons.client.icon;
    } else if (type == 'depart'){
        iconArret = icons.depart.icon;
    } else {
        iconArret = icons.inconnu.icon;
    }

    var markerArretOption = {
        position: new google.maps.LatLng(lat,lng),
        icon: iconArret
    };
    var markerArret = new google.maps.Marker(markerArretOption);
    markerArret.setMap(map);

}

function calculateWayPoints(){
    var waypts = [];
    for (var i = 0; i<4; i++) {
        // pour utilisation de geocoding avec AJAX :
        var url =   'https://maps.googleapis.com/maps/api/geocode/json?';
        url = url + 'address='+document.getElementById('etape'+i).value;
        url = url + '&key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s';

        $.ajax({
            async:false,
            url: url,
            dataType: 'json',
            success : function(data){
                
                if (data.status == 'OK') {
                    var lat = data.results[0].geometry.location.lat;
                    var lng = data.results[0].geometry.location.lng;

                    waypts.push({
                        location: new google.maps.LatLng(lat,lng),
                        stopover: true
                    });

                    inscrireMarkers(lat,lng, 'fournisseur');


                } else {
                    console.log('Impossible d\'obtenir la latitude et la longitude');
                }
            },
        });
    }
    return waypts;
}

function markStartAndStop(start, stop){
    // pour utilisation de geocoding avec AJAX :
    var url =   'https://maps.googleapis.com/maps/api/geocode/json?';
    url = url + 'address='+start;
    url = url + '&key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s';

    $.ajax({
        async:false,
        url: url,
        dataType: 'json',
        success : function(data){
            
            if (data.status == 'OK') {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                inscrireMarkers(lat,lng, 'depart');


            } else {
                console.log('Impossible d\'obtenir la latitude et la longitude');
            }
        },
    });

    url =   'https://maps.googleapis.com/maps/api/geocode/json?';
    url = url + 'address='+stop;
    url = url + '&key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s';

    $.ajax({
        async:false,
        url: url,
        dataType: 'json',
        success : function(data){
            
            if (data.status == 'OK') {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                inscrireMarkers(lat,lng, 'client');


            } else {
                console.log('Impossible d\'obtenir la latitude et la longitude');
            }
        },
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    markStartAndStop(start, end);

    var waypts = this.calculateWayPoints();


    directionsService.route({
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}