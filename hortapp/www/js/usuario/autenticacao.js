var autenticacao = {

  initialize: function() {
    $('#btnLogin').click(autenticacao.login);
    $('#btnSair').click(autenticacao.logout);
    autenticacao.login();
  },

  login: function() {
    window.plugins.googleplus.login({
        'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '514553019114-m62mlrdt5lejdq6h4mafe1hm8ve4m8kl.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      },
      function(perfil) {
        //alert(JSON.stringify(perfil));
        /*
        perfil['email']
        perfil['idToken']
        perfil['serverAuthCode']
        perfil['userId']
        perfil['displayName']
        perfil['familyName']
        perfil['givemName']
        perfil['imageUrl']
        */
        usuarioController.initialize(perfil);

        //myApp.alert('Olá '+perfil['displayName']+', seja bem vindo ao HortApp','Bem vindo');
      },
      function(msg) {
        myApp.alert(msg, 'Erro!');
      }
    );
  },

  logout: function() {
    myApp.confirm('Deseja mesmo sair?', function() {
      window.plugins.googleplus.logout(
        function(msg) {
          //notificacoes.unregister();
          myApp.closePanel();
          myApp.loginScreen();
        });
    });
  }
};
