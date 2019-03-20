$(document).ready(function () {

    function addGraphique() {
        let body = $('body');
        let wrap  = $('<div>');
        wrap.attr('id','wrapper');
        body.append(wrap)
        let canvas = $('<canvas>');
        canvas.attr('id','myChart');
        wrap.append(canvas);
        var ctx = document.getElementById('myChart').getContext('2d');
        label = [];
        prix = [];
        nom = [];
        $.ajax({
            url: '/coopagri/ressources/json/statistiqueParAnnee.json',
            dataType: 'json',
            success: function (data) {

                $.each(data,function (i,donne) {
                    label.push(donne.TypeDeProduit);
                    prix.push(donne.Prix);
                    nom.push(donne.SOCIETE_RAISON_SOCIAL);
                });
                //return [label,prix];
                nom = nom[0];
                console.log(nom);
            },
            error : function(p1,p2){
                console.log(p1,p2);
            }
        });
       // console.log(label,prix);
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: label,
                datasets: [{
                    label: 'statistique de ' . nom,
                    data: prix,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(0, 206, 86, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(0, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var canvasP = $('#myChart');//document.getElementById("myChart");
        canvasP.on('click',function(e) {
            //console.log('click');
             var slice = myChart.getElementAtEvent(e);
            var label = slice[0]._model.label;
             console.log(label);
             addViande(label);
        });
        var wrapper = document.getElementById('wrapper').style;
        wrapper.height = "10px";
    }
    function addViande(type){
        var ctx = $('#myChart');
        ctx.remove();
        let body = $('#wrapper');
        let canvas = $('<canvas>');
        canvas.attr('id','myChart');
        body.append(canvas);
        var ctx = document.getElementById('myChart').getContext('2d');
        label = [];
        prix = [];
        nom = [];
        chemin = '/coopagri/ressources/json/statistique'+ type + '.json';
        console.log(chemin);
        $.ajax({
            url: chemin,
            dataType: 'json',
            success: function (data) {

                $.each(data,function (i,donne) {
                    label.push(donne.MOIS);
                    prix.push(donne.PrixParMois);
                    nom.push(donne.TypeDeProduit);
                });
                //return [label,prix];
                nom = nom[0];
                console.log(nom);
            },
            error : function(p1,p2){
                console.log(p1,p2);
            }
        });
        labelChart = 'statistique '+type;
        // console.log(label,prix);
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label:  labelChart ,
                    data: prix,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(0, 206, 86, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(0, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    addGraphique();


});
