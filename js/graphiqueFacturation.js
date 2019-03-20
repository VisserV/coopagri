$(document).ready(function () {

    function addGraphique() {
        let body = $('body');
        let canvas = $('<canvas>');
        canvas.attr('id','myChart');
        body.append(canvas);
        var ctx = document.getElementById('myChart').getContext('2d');
        label = [];
        prix = [];
        $.ajax({
            url: '/coopagri/ressources/json/statistiqueParAnnee.json',
            dataType: 'json',
            success: function (data) {

                $.each(data,function (i,donne) {
                    label.push(donne.TypeDeProduit);
                    prix.push(donne.Prix);
                });
                //return [label,prix];
                //console.log(label,prix);
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
                    label: '# of Votes',
                    data: prix,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
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
        canvasP.onclick = function(e) {
            console.log('click');
            // var slice = myChart.getElementAtEvent(e);
            // var source = slice[0]._model.datasetLabel;
            // console.log("oui"+source);
        }
    }

    addGraphique();


});
