function menuconnexion(){
  if (typeof(sessionStorage.User) == "undefined") {
    $('.navbar').append("  <div class=\"dropdown_\">        <button class=\"dropbtn_\">Comptes </button>        <div class=\"dropdown-content_ menuConnexion\"> </div>      </div>");
    $('.menuConnexion').append("<a href=\"index.php?page=33\">Connexion</a>");
        $('.menuConnexion').append("<a href=\"index.php?page=102\">S'inscrire</a>");

  } else {
        if(sessionStorage.User=="Admin" && sessionStorage.UserId=="0"){
            $('.navbar').append("  <div class=\"dropdown_\">        <button class=\"dropbtn_\">"+sessionStorage.UserNom+"</button>        <div class=\"dropdown-content_ menuConnexion\"> </div>      </div>");
            $('.menuConnexion').append("<a href=\"index.php?page=101\">Information compte</a>");
            $('.menuConnexion').append("<a href=\"index.php?page=100\">Commande fournisseur</a>");
            affclienCo();
        }else{
            $('.navbar').append("  <div class=\"dropdown_\">        <button class=\"dropbtn_\">"+sessionStorage.User+"</button>        <div class=\"dropdown-content_ menuConnexion\"> </div>      </div>");
            $('.menuConnexion').append("<a href=\"index.php?page=101\">Information compte</a>");
        }



        let form = $('<form>');
        form.attr('class',"form-inline");
        form.attr('method',"post");
        form.attr('action',"index.php?page=0");
        form.attr('id',"formulaireHide")
        form.hide();
        let inputTextHide2 = $('<input>');
        inputTextHide2.attr('type',"text");
        inputTextHide2.attr('name',"jsonHideWrite");
        inputTextHide2.attr('id',"jsonHideWrite");
        inputTextHide2.hide();
        inputTextHide2.appendTo(form);
        $('.menuConnexion').append(form);


        let sousmenu = $('<a>');
        sousmenu.text("deconnexion");
        sousmenu.on('click',function(){
                sessionStorage.removeItem("User");
                sessionStorage.removeItem("UserId");
                sessionStorage.removeItem("UserNom");
                sessionStorage.removeItem("UserConges");
                sessionStorage.removeItem("UserLivAddr");
                sessionStorage.removeItem("UserFactAddr");
                $('#jsonHideWrite').val(""+sessionStorage.nombreCLientConnectes);
                $('#formulaireHide').submit();

        });
            $('.menuConnexion').append(sousmenu);







  }

}

function affclienCo(){
    $.ajax({
            url:'clientsConnectes.json',  //chemin d'acces
            dataType:'json',              //type attendu

            success:function(xhr_data){      //exe si ok
                $('.menuConnexion').append("<a id='affNbClientCo'>Nombre de Personnes connectées : "+xhr_data+" </a>");
                    setTimeout(function(){ majClientCO();}, 2000);
            },
            error:function(){
                    alert("Impossible d'afficher les clients connectes")
            }
    });
}




function getJsonCLientCo(){
    $.ajax({
            url:'clientsConnectes.json',  //chemin d'acces
            dataType:'json',              //type attendu

            success:function(xhr_data){           //exe si ok
                    sessionStorage.setItem("nombreCLientConnectes", JSON.stringify(xhr_data));

            },
            error:function(){
                    alert("Impossible de charger les clients connectes")
            }
    });
}


function majClientCO(){
    $.ajax({
            url:'clientsConnectes.json',  //chemin d'acces
            dataType:'json',              //type attendu

            success:function(xhr_data){           //exe si ok
                $('#affNbClientCo').text("Nombre de Personnes connectées : "+xhr_data+"");

                setTimeout(function(){getJsonCLientCo(); majClientCO();}, 2000);
            },
            error:function(){
                    alert("Impossible de mettre à jour les clients connectes")
            }

    });

}


$(function(){
    menuconnexion();
    getJsonCLientCo();


});