
nomFournisseur();

function creerGraphe(tableau){

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Proportion des volumes de ventes des fournisseurs'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Fournisseurs',
            colorByPoint: true,
            point: {
                events: {
                    click: function(e) {
                        creerGrapheCategorie(1);
                    }
                }
            },
            data:tableau
        }]
    });

}



function creerGrapheCategorie(id){

// Build the chart
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Other',
                y: 7.05
            }]
        }]
    });
}



function nomFournisseur(){


    tableau = new Array();


    $.ajax({
        url:"ressources/json/fournisseur.json",
        dataType :"json",
        success:function(data){

            $.each(data,function(i,element){
                tableau[i] =
                { name : element.raisonSociale ,y : element.id};
                console.log("{ name : '"+element.raisonSociale +"',"
                    + "y : 50"+"},");
            })

            console.log(tableau);
            //appeler fct création graphe
            creerGraphe(tableau);
        }
    });


}




