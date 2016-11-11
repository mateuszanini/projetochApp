var notificacoes = {
  initialize: function() {
    //alert("notificacoes.initialize");
    PushNotification.hasPermission(function(data) {
      if (data.isEnabled) {
        this.push = PushNotification.init({
          "android": {
            "senderID": "514553019114"
          }
        });
        this.push.on('registration', function(data) {
          //alert('Registrado: '+data.registrationId);
          try {
            usuarioController.usuario.usuTokenFcm = data.registrationId;
            usuarioController.salvar(false);
            //notificacoes.enviaTokenFcm();
          } catch (err) {
            alert('Erro: try registration push: \n' + err);
          }
        });
        this.push.on('notification', function(data) {
          //localizacao.mapa.setClickable(false);
          myApp.addNotification({
            title: data.title,
            //subtitle: 'New message from John Doe',
            message: data.message,
            media: '<img width="44" height="44" style="border-radius:100%" src=' +
              usuarioController.usuario.usuImagem + '>',
            onClose: function() {
              //localizacao.mapa.setClickable(true);
            }
          });
          // myApp.alert(data.message, data.title, function() {
          //   localizacao.mapa.setClickable(true);
          // });
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
        });
        this.push.on('error', function(e) {
          alert('Error on push: ' + e.message);
        });
      } else {
        alert('As notificações push estão desabilitadas!');
      }
    });
  },

  unregister: function() {
    try {
      var push = window.plugins.pushNotification;
      push.unregister(
        function(e) {
          console.log('success');
        },
        function(e) {
          console.log('error');
        });
    } catch (err) {
      alert(err);
    }
  }
};
