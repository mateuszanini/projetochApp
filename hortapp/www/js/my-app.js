// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    pushState: true,
    sortable: false,
    modalTitle: "HortApp",
    scrollTopOnNavbarClick: true,
    animateNavBackIcon: true,
    swipePanel: 'left',
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var $ = Framework7.$;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// var salvarPerfil = myApp.addView('.salvar-perfil', {
//     dynamicNavbar: true
// });

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('chat', function(page) {
    // Do something here for "about" page
    //myApp.alert('è nois');
});
