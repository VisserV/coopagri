if(sessionStorage.User=="Admin"){
    var map;

    function initMap() {

        map = new google.maps.Map(document.getElementById('mapCalendar'), {
            zoom: 6.5,
            center: {lat: 46.862725, lng: 2.287592}
        });

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
                    } else {
                        // waypoints
                        waypts.push({
                            location: new google.maps.LatLng(lat,lng),
                            stopover: true
                        });
                    }

                    // pour le moment tous les points intermédiaires sont des fournisseur 
                    // et la destination finale est le client

                    // console.log(waypts);
                    
                    // ce n'est pas comme ca qu'il faut faire mais la base de données n'est pas commune aux 3 groupes
                    // c'est pourquoi nous testons s'il s'agit d'un fournisseur ou d'un client de cette façon
                    var id = adresses[attrAd]['ADRESSE_ID']
                    if ((id == 1) || (id == 2) || (id == 3) || (id == 6)) {
                        inscrireMarkers(lat, lng, 'fournisseur');
                    } else {
                        inscrireMarkers(lat, lng, 'client');
                    }
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

            //  console.log('data : ');
            //  console.log(data);

            var waypts = calculateWayPoints(data);

            var start = waypts.shift();
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
    window.location.replace("index.php?page=1");
}
