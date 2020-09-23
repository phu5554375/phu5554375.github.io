$('document').ready(function() {

    $("#mmenu").mmenu({
        "extensions": [
            "pagedim-black",
            'fx-menu-slide'
        ],
        navbar: {
            title: "Site name"
        },
        "offCanvas": {
            "position": "left"
        },
        "navbars": [{
            "position": "bottom",
            "content": [
                "<a href='#'>Some link</a>",

            ]
        }]
    });
  
    var trigger = $('#hamburger'),
        isClosed = true;

    var api = $("#mmenu").data("mmenu");
    api.bind("closed", function() {

        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;

    });

    trigger.click(function() {
        burgerTime();
    });

    function burgerTime() {
        if (isClosed == true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }
  
  $( "body" ).click(function( event ) {
 console.log( event.target );
});

});