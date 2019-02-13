$(function(){
    init();

})


function init(){


    let divTab = $("<div>");
    divTab.attr('id','idDivTab');
    let table = $("<table>");
    table.addClass("table");
    table.addClass("table-striped");
    table.append("<thead><tr><th scope='col'>first</th><th scope='col'>last</th><th scope='col'>handle</th></tr></thead>");

    $('body').append(divTab);
    $('#idDivTab').append(table);

}
