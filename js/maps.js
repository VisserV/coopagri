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
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    var waypts = [];
    for (var i = 0; i<4; i++) {
    waypts.push({
        location: document.getElementById('etape'+i).value,
        stopover: true
      });
    }

    var iconBase = '../ressources/img/';
    var icons = {
        depart: {
            icon: iconBase + 'pointDepart.png'
        },
        fournisseur: {
            icon: iconBase + 'pointFournisseur.png'
        },
        client: {
            icon: iconBase + 'pointClient.jpg'
        }
    };

    var markerDepartOption = {
        position: start,
        icon: icons['depart'].icon
    };
    var markerDepart = new google.maps.Marker(markerDepartOption);
    markerDepart.setMap(map);

    for (var i = 0; i < waypts.length; i++) {
        var markerArretOption = {
            position: waypts[i].location
        };
        var markerArret = new google.maps.Marker(markerArretOption);
        markerArret.setMap(map);
    }
    var markerArriveeOptions = {
        position: end,
        icon: icons['client'].icon
    };
    var markerArrivee = new google.maps.Marker(markerArriveeOptions);
    markerArrivee.setMap(map);


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