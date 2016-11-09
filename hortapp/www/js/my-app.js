var myApp = new Framework7({
  pushState: true,
  sortable: false,
  scrollTopOnNavbarClick: true,
  animateNavBackIcon: true,
  //swipePanel: 'left',
  /*MODAL*/
  modalTitle: "HortApp",
  modalButtonCancel: "Cancelar",
  /*NOTIFICATION*/
  notificationTitle: "HortApp",
  notificationHold: 5000,
  notificationCloseOnClick: false
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});


myApp.onPageInit('index', function(page) {
  alert('onPageInit(index)');
  ofertas.initialize();
});

myApp.onPageBack('index', function(page) {
  alert('onPageBack(index)');
  ofertas.initialize();
});

myApp.onPageReinit('index', function(page) {
  alert('onPageReinit(index)');
  ofertas.initialize();
});


myApp.onPageInit('meuPerfil', function(page) {
  usuario.initialize();
});

myApp.onPageInit('novaOferta', function(page) {
  novaOferta.initialize();
});

// myApp.onPageInit('ofertas', function(page) {
//   ofertas.initialize();
// });

myApp.onPageInit('minhasOfertas', function(page) {
  minhasOfertas.initialize();
});
