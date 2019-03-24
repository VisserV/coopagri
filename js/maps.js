if((sessionStorage.User=="Admin") || (sessionStorage.CategorieId=="1")){
    var map;
    var iti;
    var geo;
    var start;

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6.5,
            center: {lat: 46.862725, lng: 2.287592}
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocate, function(){
                alert('pas de géolocalisation');
            });
        } else {
            alert('pas de géolocatisation');
        }

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

        var onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('iti').addEventListener('change', onChangeHandler);
    }

    function geolocate(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map.setCenter(pos); 

        start = new google.maps.LatLng(pos.lat, pos.lng);

        inscrireMarkers(pos.lat, pos.lng, 'depart');
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

    function calculateWayPoints(adresses){
        var waypts = [];

    // console.log('adresses :');
    // console.log(adresses);

    for (attrAd in adresses) {

        // console.log('adresses[attrAd] :');
        // console.log(adresses[attrAd]);

        ad = adresses[attrAd]['ADRESSE_RUE_NUM'] + '+' + adresses[attrAd]['ADRESSE_RUE_LIBELLE'] + ',+'
        + adresses[attrAd]['ADRESSE_CP'] + '+' + adresses[attrAd]['ADRESSE_VILLE'] + ',+FRANCE';

        // console.log('ad : ');
        // console.log(ad);
        

        // pour utilisation de geocoding avec AJAX :
        var url =   'https://maps.googleapis.com/maps/api/geocode/json?';
        url = url + 'address='+ad;
        url = url + '&key=AIzaSyAnySGIvsEVGgE6-YL-jLS0SXxCvJ2-J5s';

        $.ajax({
            async:false,
            url: url,
            dataType: 'json',
            success : function(data){

                if (data.status == 'OK') {
                    var lat = data.results[0].geometry.location.lat;
                    var lng = data.results[0].geometry.location.lng;

                    // if (attrAd == 0){
                    //     // start
                    //     waypts.push({
                    //         location: new google.maps.LatLng(lat,lng),
                    //     });
                    //     inscrireMarkers(lat,lng, 'depart');
                    // } else 
                    if (attrAd == adresses.length-1){
                        // end 
                        waypts.push({
                            location: new google.maps.LatLng(lat,lng),
                        });
                        inscrireMarkers(lat,lng, 'client');
                    } else {
                        // waypoints
                        waypts.push({
                            location: new google.maps.LatLng(lat,lng),
                            stopover: true
                        });
                        inscrireMarkers(lat,lng, 'fournisseur');
                    }

                    // pour le moment tous les points intermédiaires sont des fournisseur 
                    // et la destination finale est le client

                    // console.log(waypts);

                    
                }
            },
            error : function(error){
                console.log('Impossible d\'obtenir la latitude et la longitude');
                console.log(error);
            }
        });
    }
    return waypts;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    iti = document.getElementById('iti').value;

    // recup la liste des adresses
    $.ajax({
        async: false,
        url:'./Insert.php',
        dataType:'json',
        data: 'fname=fonctionSelect&id=' +iti,
        success : function(data){

            //on replace au centre de la map la position géolocatisée
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geolocate, function(){
                    alert('pas de géolocalisation');
                });
            } else {
                alert('pas de géolocatisation');
            }

            //  console.log('data : ');
            //  console.log(data);

            var waypts = calculateWayPoints(data);

            //var start = waypts.shift();
            var end = waypts.pop();

            directionsService.route({
                origin: start,
                destination: end.location,
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
        },
        error : function(error){
            alert('Erreur, veuillez recommencer');

            console.log(error);
        }
    });
}
}else{
    window.location.replace("http://localhost/coopagri/index.php?page=1");
}
