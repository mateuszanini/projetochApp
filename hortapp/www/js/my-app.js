var myApp = new Framework7({
    pushState: true,
    sortable: false,
    scrollTopOnNavbarClick: true,
    animateNavBackIcon: true,
    swipePanel: 'left',
    /*MODAL*/
    modalTitle: "HortApp",
    modalButtonCancel: "Cancelar",
    /*NOTIFICATION*/
    notificationTitle: "HortApp",
    notificationHold: 5000,
    notificationCloseOnClick: false
});

/*var $$ = Dom7;*/
/*var $ = Framework7.$;*/

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

myApp.onPageInit('meuPerfil', function(page){
  usuario.initialize();
  usuario.listaEstados("SC");
  usuario.listaCidades(0);
  usuarioController.initialize(null);
});
