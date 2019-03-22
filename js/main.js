$(document).ready(function() {
    function setHeight() {
        windowHeight = $(window).innerHeight();
        $('.container-fluid').css('min-height', windowHeight-($('footer').height() + $('nav').height() + 17));
    };
    setHeight();

    $(window).resize(function() {
        setHeight();
    });
});
