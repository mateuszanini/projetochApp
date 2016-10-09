// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    pushState: true,
    sortable: false,
    modalTitle: "HortApp",
    scrollTopOnNavbarClick: true,
    animateNavBackIcon: true,
    swipePanel: 'left',
    /*NOTIFICATION*/
    notificationTitle: "HortApp",
    notificationHold: 5000,
    notificationCloseOnClick: false
});

var $$ = Dom7;
var $ = Framework7.$;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

myApp.onPageInit('meuPerfil', function(page){
  usuario.initialize();
  usuario.listaEstados();
  usuario.listaCidades();
});
