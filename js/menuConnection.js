function menuconnexion(){
    let liste = $("<ul>");
    liste.addClass("nav navbar-nav navbar-right item_Connexion");

    if (typeof(sessionStorage.User) == "undefined") {

        liste.append("<li class='nav-item'><a  class='nav-link' href=\"index.php?page=33\">Connexion</a></li><li class='nav-item'><a class='nav-link' href=\"index.php?page=102\">S'inscrire</a></li>");
        $('.navbar').append(liste);

    } else {
        if(sessionStorage.User=="Admin" && sessionStorage.UserId=="0"){

            liste.append("<li class='nav-item'><a class='nav-link' href=\"index.php?page=101\">Information compte</a></li><li class='nav-item'><a class='nav-link' href=\"index.php?page=100\">Commande fournisseur</a></li>");
            $('.navbar').append(liste);

            affclienCo();
        }else{

            liste.append("<li class='nav-item'><a class='nav-link' href=\"index.php?page=101\">Information compte</a></li>");
            $('.navbar').append(liste);
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
        url:'clientsConnectes.json', 
        dataType:'json',

        success:function(xhr_data){
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
        url:'clientsConnectes.json', 
        dataType:'json',             

        success:function(xhr_data){     
            sessionStorage.setItem("nombreCLientConnectes", JSON.stringify(xhr_data));

        },
        error:function(){
            alert("Impossible de charger les clients connectes")
        }
    });
}


function majClientCO(){
    $.ajax({
        url:'clientsConnectes.json',
        dataType:'json', 

        success:function(xhr_data){      
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
