
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
                        //creerGrapheCategorie(event.point.id);
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
        point: {
            events: {
                click: function(e) {
                    venteCategorie(1);
                }
            }
        },
        data: tableau
    }]
});
}

function venteCategorie(idCateg){

    Highcharts.chart('container', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

function nomFournisseur(){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/fournisseur.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {id : element.id, name : element.raisonSociale ,y : getQuantiteVenteFournisseur(element.id)};
            })
            console.log(tableau);
            creerGraphe(tableau);
        }
    });
}

function getQuantiteVenteFournisseur(id){
    var quantite = 0;
    $.ajax({
        url:"ressources/json/produitStat.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                if (id == parseInt(element.FOURNISSEUR_ID)) {
                    quantite += parseInt(element.LIGNE_QUANTITE);
                }
            })         
        }
    });
    return quantite;    
}

function nomCateg(id){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/produitStat.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                if (id == parseInt(element.PRODUIT_ID)) {
                    tableau[i] = {id : element.PRODUIT_ID, name : element.PRODUIT_LIBELLE ,y : getQuantiteVenteProduit(element.PRODUIT_ID)};
                }
            })
            console.log(tableau);
            creerGraphe(tableau);
        }
    });
}

function getQuantiteVenteCateg(id){
    var quantite = 0;
    $.ajax({
        url:"ressources/json/produitStat.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                if (id == parseInt(element.PRODUIT_ID)) {
                    quantite += parseInt(element.LIGNE_QUANTITE);
                }
            })         
        }
    });
    return quantite;    
}



