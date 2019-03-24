
getFournisseur();

function getFournisseur(){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/fournisseur.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.raisonSociale ,y : getPrixVenteFournisseur(element.id)};
            })
            creerGraphe(tableau);
        }
    });
}

function getTypesDeProduit(Fournisseur){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/statistiqueProduit"+Fournisseur+".json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.produit ,y : element.prix};

            })
            creerGrapheTypesDeProduit(Fournisseur,tableau);
        }
    });
}

function getProduitParMois(Fournisseur, produit){
    tableau = new Array();
    MOIS = new Array();
    $.ajax({
        url:'ressources/json/statistiqueDe'+ produit + '.json',
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.MOIS ,y : element.PrixParMois};
                MOIS[i] = element.MOIS;
            })
            creerGrapheProduit(Fournisseur, produit, tableau);
        }
    });
}

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
            pointFormat: '{series.name}: <b>{point.y}€ </b>'
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
                        getTypesDeProduit(enleverEspace(this.name));
                    }
                }
            },
            data:tableau
        }]
    });
}

function creerGrapheTypesDeProduit(Fournisseur, tableau){
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Proportion du volume de vente de ' + Fournisseur + ' par type de produit'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}€</b>'
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
            name: 'Type de produit',
            colorByPoint: true,
            point: {
                events: {
                    click: function(e) {
                        getProduitParMois(Fournisseur,enleverEspace(this.name));
                    }
                }
            },
            data:tableau
        }]
    });

    let retour = $('<button>');
    retour.attr('onclick',"getFournisseur()");
    retour.text("Retour");
    $("#container").append(retour);
}

function creerGrapheProduit(Fournisseur, produit, tableau){

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'Proportion des volumes de ventes de pour les ' + produit
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        xAxis: {
            categories:MOIS
        },
        series: [{
            name: 'argent gagné par mois',
            colorByPoint: false,
            data:tableau
        }]
    });

    let retour = $('<button>');
    retour.click(function(){
        getTypesDeProduit(Fournisseur)
        }
    );
    retour.text("Retour");
    $("#container").append(retour);
}

function getPrixVenteFournisseur(id){
    var prix = 0;
    $.ajax({
        url:"ressources/json/produitStat.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                if (id == parseInt(element.FOURNISSEUR_ID)) {
                    prix += parseInt(element.LIGNE_QUANTITE)*parseInt(element.PRODUIT_PRIX_ACHAT);
                }
            })
        }
    });
    return prix;
}

function enleverEspace(name){
    var i = 0;
    while(i != name.length) {
        name = name.replace(" ", "");
        i++
    }
    return name;
}