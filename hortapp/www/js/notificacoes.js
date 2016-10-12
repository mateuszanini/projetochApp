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
            usuarioController.setTokenFcm(data.registrationId);
            notificacoes.enviaTokenFcm();
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
              usuarioController.usuImagem + '>',
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
  },

  enviaTokenFcm: function() {
    var dados = {
      "usuario": {
        "usuTokenFcm": usuarioController.getTokenFcm()
      }
    };

    try {
      var url = config.getApi() + '/usuario/update/me';
      //alert('url:'+url);
      $.ajax({
        url: url,
        headers: {
          "idtoken": usuarioController.getIdToken()
        },
        data: dados,
        method: "GET",
        contentType: "application/json",
        beforeSend: function() {
          myApp.showIndicator();
        },
        success: function(data, status, xhr) {
          //alert('success: \nstatus:' + JSON.stringify(status)+'\ndata:' + JSON.stringify(data));
        },
        error: function(data, status, xhr) {
          alert('error: \nstatus:' + JSON.stringify(status) +
            '\ndata:' + JSON.stringify(data));
        },
        complete: function(xhr, status) {
          myApp.hideIndicator();
        }
      });
    } catch (err) {
      alert('Erro enviaTokenFcm: ' + err);
    }
  }
};
