$(function(){
    init();
    chargerNumeroCommande();
    chargerDetailCommande(1);
})


function init(){

    let select = $("<select>");
    select.attr('onchange',"chargerDetailCommande(this.value)");
    let divTab = $("<div>");
    divTab.attr('id','idDivTab');
    select.attr('id',"lstCommande");

    let divReturn = $("<div class='btn_RetourLivraison'><a href='index.php?page=30'><button type='button'>Retour</button></a>");
    let detailCommande = $("<p>Detail de la commande </p>");
    let table = $("<table>");
    table.addClass("table");
    table.attr('id',"lstPdt");
    table.addClass("table-striped");
    table.append("<thead><tr><th scope='col'>Libelle</th><th scope='col'>Référence</th><th scope='col'>Prix de Vente</th><th scope='col'>Quantité</th></tr></thead>");
    $('#container').append(select);
    $("#container").append(detailCommande);
    $('#container').append(divTab);
    $('#container').append(divReturn);
    $('#idDivTab').append(table);

}

function chargerNumeroCommande(){
    $.ajax({
        url:"ressources/json/commandes.json",
        dataType:"json",
        success : function(data){
            $.each(data,function(i,idCommande){
                let option = $("<option>" +"Commande n° "+idCommande.id+"</option>");
                option.attr("value", idCommande.id);
                $('#lstCommande').append(option);
            }
            );
        }
    });

}

function chargerDetailCommande(id){
    $('#lstPdt').empty();
    $('#lstPdt').append("<thead><tr><th scope='col'>Libelle</th><th scope='col'>Référence</th><th scope='col'>Prix de Vente</th><th scope='col'>Quantité</th></tr></thead>");
    $.ajax({
        url:"ressources/json/commandes.json",
        dataType:"json",
        success : function(data){
            $.each(data,function(i,cmd){
                if(id == cmd.id) {
                    $.each(cmd.lignes, function (y, lgn) {

                        $("#lstPdt").append("<tr scope='row'>"
                            + "<td >" + lgn.produit.libelle + "</td>"
                            + "<td >" + lgn.produit.reference + "</td>"
                            + "<td >" + lgn.produit.prixVente + "</td>"
                            + "<td >" + lgn.quantite + "</td>"
                            + "</tr>");
                    })
                }
            });
        }
    });
}
