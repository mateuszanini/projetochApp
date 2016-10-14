var usuarioController = {
  initialize: function(perfil) {
    //define os objetos
    this.endereco = {
      endLogradouro: null,
      endBairro: null,
      endNumero: null,
      cidCodigo: null,
      endLatitude: null,
      endLongitude: null,
    };

    this.usuario = {
      usuEmail: null,
      usuNome: null,
      usuImagem: null,
      usuIdGoogle: null,
      usuTokenFcm: null,
      usuEndVisivel: null,
      usuTelefone: null,
      usuTelefoneVisivel: null,
    };
    return;
    //inicializa os objetos com os dados vindos da Google
    this.idToken = perfil['idToken'];
    this.usuario.usuEmail = perfil['email'];
    this.usuario.usuNome = perfil['displayName'];
    this.usuario.usuImagem = perfil['imageUrl'];

    //this.usuario.serverAuthCode = perfil['serverAuthCode'];
    // this.usuario.familyName = perfil['familyName'];
    // this.usuario.givemName = perfil['givemName'];
    this.usuario.usuIdGoogle = perfil['userId'];
    try {
      $.ajax({
        url: config.getApi() + '/usuario/login',
        headers: {
          "idtoken": usuarioController.idToken
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

  //envia alterações para salvar no banco de dados
  salvar: function() {
    //cria variaveis para montar o json que sera enviado ao banco.
    //desta forma somente os campos interessados sao enviados
    var usuario = {
      usuTokenFcm: usuarioController.usuario.usuTokenFcm,
      usuEndVisivel: usuarioController.usuario.usuEndVisivel,
      usuTelefone: usuarioController.usuario.usuTelefone,
      usuTelefoneVisivel: usuarioController.usuario.usuTelefoneVisivel,
    };
    var endereco = {
      endLogradouro: usuarioController.endereco.endLogradouro,
      endBairro: usuarioController.endereco.endBairro,
      endNumero: usuarioController.endereco.endNumero,
      cidCodigo: usuarioController.endereco.cidCodigo,
      endLatitude: usuarioController.endereco.endLatitude,
      endLongitude: usuarioController.endereco.endLongitude,
    };

    //deleta as propriedades nulas
    for (var k in usuarioController.endereco) {
      if (usuarioController.endereco[k] === null) {
        delete usuarioController.endereco[k];
      }
    }

    var dados = {
      usuario, endereco
    };

    try {
      // $$.post(config.getApi() + '/usuario/update/me', dados, function(data) {
      //   alert('FOI!');
      // });

      $.ajax({
        url: config.getApi() + '/usuario/update/me',
        headers: {
          "idtoken": usuarioController.idToken
        },
        data: dados,
        type: "GET",
        dataType: undefined,
        // contentType: "application/json",
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
      alert('Erro usuarioController.salvar: ' + err.message);
    }
  }
};
