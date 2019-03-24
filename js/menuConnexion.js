let liste = $("<ul>");
liste.addClass("nav navbar-nav navbar-right item_Connexion");

function menuconnexion(){
    if (typeof(sessionStorage.User) == "undefined") {

        liste.append("<li class='nav-item'><a  class='nav-link' href=\"index.php?page=33\">Connexion</a></li><li class='nav-item'><a class='nav-link' href=\"index.php?page=102\">S'inscrire</a></li>");
        $('.navbar').append(liste);

    } else {
        if(sessionStorage.User=="Admin" && sessionStorage.UserId=="0"){

            liste.append("<li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Admin</a> <div class='dropdown-menu' aria-labelledby='navbarDropdown'><a class='dropdown-item nav-link text-dark' href=\"index.php?page=101\">Information compte</a></div></li>");

            $('.navbar').append(liste);

            affclienCo();
        }else{

            liste.append("<li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Bonjour "+sessionStorage.UserNom+"</a> <div class='dropdown-menu' aria-labelledby='navbarDropdown'><a class='dropdown-item nav-link text-dark' href=\"index.php?page=101\">Information compte</a></div></li>");

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
        $('.navbar').append(form);

        let sousmenu = $("<a class='nav-link' href='#'> Déconnexion </a>");
        sousmenu.on('click',function(){
            sessionStorage.removeItem("User");
            sessionStorage.removeItem("UserId");
            sessionStorage.removeItem("UserNom");
            sessionStorage.removeItem("UserConges");
            sessionStorage.removeItem("UserLivAddr");
            sessionStorage.removeItem("UserFactAddr");
            $('#jsonHideWrite').val(""+sessionStorage.nombreCLientConnectes);
            $('#formulaireHide').submit();
            session_destroy();
        });
        let li_SousMenu = $('<li>');
        li_SousMenu.addClass('nav-item');
        li_SousMenu.append(sousmenu);

        liste.append(li_SousMenu);
    }
}

function affclienCo(){
    $.ajax({
        url:'clientsConnectes.json',  //chemin d'acces
        dataType:'json',              //type attendu

        success:function(xhr_data){      //exe si ok
            liste.append("<li class='nav-item'><a id='affNbClientCo' class='nav-link'>Nombre de Personnes connectées : "+xhr_data+" </a>");
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
