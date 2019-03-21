$(document).ready(function() {
    function setHeight() {
        windowHeight = $(window).innerHeight();
        $('.container-fluid').css('min-height', windowHeight-($('footer').height() + $('nav').height() + 18));
    };
    setHeight();

    $(window).resize(function() {
        setHeight();
    });
});
