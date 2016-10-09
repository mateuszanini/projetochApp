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

myApp.onPageBeforeInit('meuPerfil', function(page){
  listaEstados();
  listaCidades();
});

/*var toolbarDefault = '<a href="views/chat/chat.html">' +
    '<i class="fa fa-comments" aria-hidden="true"></i>' +
    '<span>Chat</span>' +
    '</a>' +
    '<a href="views/usuario/perfil.html" class="link">' +
    '<i class="fa fa-apple" aria-hidden="true"></i>' +
    '<span>Apple</span>' +
    '</a>' +
    '<a href="#" class="link">' +
    '<i class="fa fa-clock-o" aria-hidden="true"></i>' +
    '<span>Lembrete</span>' +
    '</a>';

myApp.onPageBeforeInit('perfil', function(page) {
    // Do something here for "about" page
    //myApp.alert('è nois');
    $$('.toolbar-inner').html(
        '<a href="#" class="link">' +
        '<i class="fa fa-check" aria-hidden="true"></i>' +
        '<span>Salvar</span>' +
        '</a>');
});

myApp.onPageBack('perfil', function(page) {
    // Do something here for "about" page
    //myApp.alert('è nois');
    $$('.toolbar-inner').html(toolbar);
});*/
