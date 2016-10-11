var usuarioController = {
  // var usuEmail = null;
  // var usuNome = null;
  // var usuIdGoogle = null;
  // var usuImagem = null;
  // var usuTokenFcm = null;
  // var idToken = null;
  // var serverAuthCode = null;
  // var familyName = null;
  // var givemName = null;

  initialize: function(perfil) {
    this.usuEmail = perfil['email'];
    this.usuNome = perfil['displayName'];
    this.usuImagem = perfil['imageUrl'];
    this.usuIdGoogle = perfil['userId'];

    this.idToken = perfil['idToken'];
    this.serverAuthCode = perfil['serverAuthCode'];
    this.familyName = perfil['familyName'];
    this.givemName = perfil['givemName'];
    //alert(JSON.stringify(this));
    try {
      $.ajax({
        url: config.getApi() + '/usuario/login',
        headers: {
          "idtoken": usuarioController.getIdToken()
        },
        method: "GET",
        contentType: "application/json",
        beforeSend: function(xhr) {
          myApp.showIndicator();
        },
        success: function(data) {
          //dispara envento avisando que o login foi concluido
          try {
            document.dispatchEvent(app.evtAutenticado);
          } catch (err) {
            alert('Erro ao disparar o evento:' + err);
          }
          //alert('success: \nstatus:' + JSON.stringify(status)+'\ndata:' + JSON.stringify(data));
        },
        error: function(data, status, xhr) {
          alert('error: \nstatus:' + JSON.stringify(status) +
            '\ndata:' +
            JSON.stringify(data));
        },
        complete: function(xhr, status) {
          myApp.hideIndicator();
          myApp.closeModal(loginScreen);
        }
      });
    } catch (err) {
      alert(err);
    }
  },

  getIdGoogle: function() {
    //alert("Solicitando usuIdGoogle: "+ this.usuIdGoogle);
    return this.usuIdGoogle;
  },
  getIdToken: function() {
    return this.idToken;
  },

  setTokenFcm: function(token) {
    try {
      this.usuTokenFcm = token;
    } catch (err) {
      alert('Erro no setTokenFcm: ' + err);
    }
  },

  getTokenFcm: function() {
    return this.usuTokenFcm;
  }
};
