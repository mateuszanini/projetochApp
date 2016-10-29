var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    this.evtAutenticado = new Event('autenticado');
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('autenticado', this.autenticado);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    try {
      document.addEventListener("online", app.onOnline, false);
      document.addEventListener("resume", app.onResume, false);
      document.addEventListener('offline', function() {
        myApp.alert("Você está Offline");
      }, false);
      app.loadMapsApi();
    } catch (err) {
      alert('onDeviceReady: ' + err.message);
    }
    config.initialize();
    autenticacao.initialize();
  },
  autenticado: function() {
    try {
      notificacoes.initialize();
      localizacao.initialize();
    } catch (err) {
      alert("autenticado:" + err.message);
    }
  },

  onOnline: function() {
    app.loadMapsApi();
  },

  onResume: function() {
    app.loadMapsApi();
  },

  // https://codingwithspike.wordpress.com/2014/08/13/loading-google-maps-in-cordova-the-right-way/
  loadMapsApi: function() {
    try {
      //verifica se tem conexao
      if (navigator.connection.type === Connection.NONE) {
        //se nao tiver retorna
        console.log('Sem conexão!');
        return;
      }
      //caso tenha conexão

      //verifica se a variavel google está definida
      if (window.google !== undefined) {
        //caso estiver
        //verifica se a variavel maps esta definida
        if (window.google.maps !== undefined) {
          //caso estiver retorna
          return;
        }
      }
      //caso nao estiver, carrega o script do google
      $.getScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0P239oFuH1QHiBM91-nmQo435XFcDKfs'
      );
    } catch (err) {
      alert('loadMapsApi:' + err.message);
    }
  }
};
app.initialize();
