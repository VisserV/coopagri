init();
function init(){
    sessionStorage.setItem("tour",0);

    let container = $('<div>');

    let titre = $("<div>");
    let p1 = $("<p>");
    let p2 = $("<p>");
    let form = $("<form>");
    let inputText1 = $("<input>");
    let inputText2 = $("<input>");
    let inputTextHide = $("<input>");
    let inputSubmit = $("<button>");
    let inputReset = $("<button>");


    container.attr('class',"container");
    form.attr('class',"form");
    form.attr('method',"post");
    form.attr('action',"index.php?page=0");
    form.attr('id',"formulaire")

    titre.addClass("head_Connexion");
    titre.append("<h1> Connexion </h1>");

    p1.text("Saisir votre identifiant :");
    inputText1.attr('type',"text");
    inputText1.attr('class',"form-control");
    inputText1.attr('placeholder',"Mon identifiant");
    inputText1.attr('name',"id");
    inputText1.attr('id',"id");
    inputText1.appendTo(p1);


    inputTextHide.attr('type',"text");
    inputTextHide.attr('name',"jsonHide");
    inputTextHide.attr('id',"jsonHide");
    inputTextHide.hide();
    inputTextHide.appendTo(p1);

    p1.attr('class',"form-group");


    p2.text("Saisir votre mot de passe :");
    inputText2.attr('type',"password");
    inputText2.attr('placeholder',"Mon mot de passe");
    inputText2.attr('class',"form-control");
    inputText2.attr('name',"mdp");
    inputText2.attr('id',"mdp");
    inputText2.appendTo(p2);
    p2.attr('class',"form-group");




    inputSubmit.html("Valider"),
    inputSubmit.attr('class',"btn btn-dark");
    inputSubmit.on('click',function(){
      var id = inputText1.val();
      var mdp = inputText2.val();
      VerifierCompte(id,mdp);
  });

    titre.appendTo(container);

    p1.appendTo(form);
    p2.appendTo(form);


    form.appendTo(container);
    inputSubmit.appendTo(container);

    $('#container').append(container);
}


function VerifierCompte(id,mdp){
  $.ajax({
    url:'ressources/json/comptes.json',
    dataType:'json',
    success:function(xhr_data){
        sessionStorage.setItem("error","error");
        $.each(xhr_data, function (i,element) {
            if(id=="root" && mdp=="root"){
                sessionStorage.setItem("User","Admin");
                sessionStorage.setItem("UserId","0");
                sessionStorage.setItem("UserNom","Admininistrateur");
                sessionStorage.setItem("UserConges","0");
                sessionStorage.setItem("UserObject",JSON.stringify(element));
                $('#jsonHide').val(""+sessionStorage.nombreCLientConnectes);
                $('#formulaire').submit();
                sessionStorage.removeItem("error")
            }else {
              if(id==element.login && mdp==element.pass){
                if(element['personne']){
                    let user = element.personne['prenom'];
                    let userId = element.id;
                    let userNom = element.personne['nom'];
                    let userConges = element.personne['conges'];
                    let categorieId = element.personne.categorie['id'];
                    let userCategorie = element.personne.categorie.libelle;
                    let userObject = JSON.stringify(element);

                    sessionStorage.setItem("User",user);
                    sessionStorage.setItem("UserCategorie",userCategorie);
                    sessionStorage.setItem("UserId",userId);
                    sessionStorage.setItem("UserNom",userNom);
                    sessionStorage.setItem("UserConges",userConges);
                    sessionStorage.setItem("UserObject",userObject);
                    sessionStorage.setItem("CategorieId",categorieId);
                }else{
                    let user = element.societe['raisonSociale'];
                    let userId = element.id;
                    let userFactAddr = element.societe['facturationAdresse'];
                    let userLivAddr = element.societe['livraisonAdresses'];
                    let userObject = JSON.stringify(element);

                    sessionStorage.setItem("User", "Entreprise");
                    sessionStorage.setItem("User",user);
                    sessionStorage.setItem("UserId",userId);
                    sessionStorage.setItem("UserFactAddr",userFactAddr);
                    sessionStorage.setItem("UserLivAddr",userLivAddr);
                    sessionStorage.setItem("UserObject",userObject);
                }
                $('#jsonHide').val(""+sessionStorage.nombreCLientConnectes);
                $('#formulaire').submit();
                sessionStorage.removeItem("error");
            }

        }


    });

        if(sessionStorage.error == "error" && sessionStorage.tour==0){
            $('.container').append("<p style='color:red;margin-top:10px;'> Identifiant ou mot de passe incorrect ! </p>");
            sessionStorage.setItem("tour",1);
        }
    },
    error:function(){
      alert("Impossible de charger les catégories")
  }
});
}
