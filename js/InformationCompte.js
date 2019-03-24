$(document).ready(function () {
    afficherDetail();
});

function afficherDetail() {
    let block = $('<div>');

    let title = $('<h3>Information du compte</h3>')
    title.attr('style', "margin-bottom:1rem");

    let utilisateur = $("<p><b>Utilisateur : </b>"+ sessionStorage.User+ "</p>");
    let nom = $("<p><b>Nom : </b>"+  sessionStorage.UserNom+ "</p>");
    let identifiant = $("<p><b>Identifiant : </b>"+  sessionStorage.UserId+ "</p>");

    block.attr('style', "margin-left:2rem")

    block.append(utilisateur, nom, identifiant);
    $('#container').append(title, block);
}
