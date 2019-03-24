
getFournisseur();

function getFournisseur(){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/fournisseur.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.raisonSociale ,y : getQuantiteVenteFournisseur(element.id)};
            })
            creerGraphe(tableau);
        }
    });
}

function getTypesDeProduit(Fournisseur){
    tableau = new Array();
    $.ajax({
        url:"ressources/json/statistiqueDe"+Fournisseur+"ParAnnee.json",
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.TypeDeProduit ,y : element.Prix};
            })
            creerGrapheTypesDeProduit(Fournisseur,tableau);
        }
    });
}

function getTypeDeProduitParMois(Fournisseur, type){
    choixProduit(Fournisseur, type);
    chargerStatistiqueProduit(Fournisseur, type);
    tableau = new Array();
    MOIS = new Array()
    $.ajax({
        url:'ressources/json/statistiqueDe'+ type + 'De' + Fournisseur + '.json',
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.MOIS ,y : element.PrixParMois};
                MOIS[i] = element.MOIS;
            })
            creerGrapheTypeDeProduitParMois(Fournisseur, type, tableau, MOIS);
        }
    });
}

function getProduitParMois(produit){

    produit = enleverEspace(produit);
    alert(produit);
    tableau = new Array();
    $.ajax({
        url:'ressources/json/StatistiqueDe'+ produit + '.json',
        dataType :"json",
        async:false,
        success:function(data){
            $.each(data,function(i,element){
                tableau[i] = {name : element.MOIS ,y : element.PrixParMois};
            })
            creerGrapheProduit(produit, tableau);
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
            name: 'Type de produit',
            colorByPoint: true,
            point: {
                events: {
                    click: function(e) {
                        getTypeDeProduitParMois(Fournisseur, enleverEspace(this.name));
                    }
                }
            },
            data:tableau
        }]
    });

}

function creerGrapheTypeDeProduitParMois(Fournisseur, type, tableau, MOIS){

    console.log(MOIS);
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'Proportion des volumes de ventes de ' + Fournisseur + ' pour les ' + type
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
            point: {
                events: {
                    click: function(e) {
                        getProduitParMois(Fournisseur, enleverEspace(this.name));
                    }
                }
            },
            data:tableau
        }]
    });

}

function creerGrapheProduit(produit, tableau){

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
            point: {
                events: {
                    click: function(e) {
                        getProduitParMois(Fournisseur, enleverEspace(this.name));
                    }
                }
            },
            data:tableau
        }]
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

function enleverEspace(name){
    var i = 0;
    while(i != name.length) {
        name = name.replace(" ", "");
        i++
    }
    return name;
}

function choixProduit() {
    let rechercherSelect = $('<select>');
    rechercherSelect.attr('id',"rechercher");

    let categorie = $('<p>');
    categorie.text("Produit : ");

    let ligne = $('<select>');
    ligne.attr('id', "ChoixProduit");
    ligne.attr('onchange', "getProduitParMois(this.value)");

    categorie.append(ligne);

    $('#select').append(categorie);

};

function chargerStatistiqueProduit(Fournisseur, type) {
    $.ajax({
        url: "ressources/json/listeDe"+type+"De"+Fournisseur+".json",
        dataType: "json",
        success: function (data) {
            data.forEach(function (element) {
                $('#ChoixProduit').append("<option>" + element.produit + "</option>")
            })
        }
    });
};