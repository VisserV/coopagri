

init();
function init(){


    let container = $('<div>');

    let titre = $("<div>");
    let p1 = $("<p>");
    let p2 = $("<p>");
    let p3 = $("<p>");
    let p4 = $("<p>");
    let p5 = $("<p>");

    let form = $("<form>");
    let inputText1 = $("<input>");
    let inputText2 = $("<input>");
    let inputText3 = $("<input>");
    let inputText4 = $("<input>");
    let inputText5 = $("<input>");
    let inputSubmit = $("<button>");



    container.attr('class',"container");
    form.attr('class',"form");
    form.attr('method',"post");
    form.attr('action',"index.php?page=0");
    form.attr('id',"formulaire")

    titre.addClass("head_Connexion");
    titre.append("<h1> Inscription </h1>");

    p1.text("Saisir votre identifiant :");
    inputText1.attr('type',"text");
    inputText1.attr('class',"form-control");
    inputText1.attr('placeholder',"Mon identifiant");
    inputText1.attr('name',"id");
    inputText1.attr('id',"id");
    inputText1.appendTo(p1);



    p1.attr('class',"form-group");


    p2.text("Entrez votre mot de passe :");
    inputText2.attr('type',"password");
    inputText2.attr('placeholder',"Mon mot de passe");
    inputText2.attr('class',"form-control");
    inputText2.attr('name',"mdp");
    inputText2.attr('id',"mdp");
    inputText2.appendTo(p2);
    p2.attr('class',"form-group");



    p3.text("Entrez votre email : ");
    inputText3.attr('type',"email");
    inputText3.attr('placeholder',"Mon adresse mail");
    inputText3.attr('class',"form-control");
    inputText3.attr('name',"email");
    inputText3.attr('id',"email");
    inputText3.appendTo(p3);
    p3.attr('class','form-group');


    p4.text("Entrez votre adresse : ");
    inputText4.attr('type',"text");
    inputText4.attr('placeholder',"Mon adresse postale");

    inputText4.attr('class',"form-control");
    inputText4.attr('name',"email");
    inputText4.attr('id',"email");
    inputText4.appendTo(p4);
    p4.attr('class','form-group');

    p5.text("Entrez votre numéro de téléphone : ");
    inputText5.attr('type',"tel");
    inputText5.attr('placeholder',"06 06 06 06 06");
    inputText5.attr('class',"form-control");
    inputText5.attr('name',"phone");
    inputText5.attr('id',"phone");
    inputText5.appendTo(p5);
    p5.attr('class','form-group');








    inputSubmit.html("S'inscrire");
    inputSubmit.attr('id',"inscription")
    inputSubmit.attr('class',"btn btn-dark");



    titre.appendTo(container);

    p3.appendTo(form);
    p4.appendTo(form);
    p5.appendTo(form);
    p1.appendTo(form);
    p2.appendTo(form);



    form.appendTo(container);
    inputSubmit.appendTo(container);

    $('#container').append(container);





}
