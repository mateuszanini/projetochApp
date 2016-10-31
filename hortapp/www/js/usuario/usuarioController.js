var usuarioController = {
  initialize: function(perfil) {
    //define os objetos
    usuarioController.endereco = new EnderecoModel();
    usuarioController.usuario = new UsuarioModel();

    //novo objeto da classe Localizacao,
    usuarioController.localizacao = new Localizacao();

    //inicializa os objetos com os dados vindos da Google
    usuarioController.idToken = perfil['idToken'];
    usuarioController.usuario.usuEmail = perfil['email'];
    usuarioController.usuario.usuNome = perfil['displayName'];
    usuarioController.usuario.usuImagem = perfil['imageUrl'];
    //usuarioController.usuario.serverAuthCode = perfil['serverAuthCode'];
    // usuarioController.usuario.familyName = perfil['familyName'];
    // usuarioController.usuario.givemName = perfil['givemName'];
    usuarioController.usuario.usuIdGoogle = perfil['userId'];
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
          document.dispatchEvent(app.evtAutenticado);
          try {
            // alert("Dados recebidos: \n" + JSON.stringify(data.data.usuario));
            if (data.data.usuario) {
              usuarioController.usuario.usuTelefone =
                data.data.usuario['usuTelefone'];

              usuarioController.usuario.usuTelefoneVisivel =
                data.data.usuario['usuTelefoneVisivel'];

              usuarioController.usuario.usuEndVisivel =
                data.data.usuario['usuEndVisivel'];
            }
            if (data.data.endereco) {
              usuarioController.endereco.endLogradouro =
                data.data.endereco['endLogradouro'];

              usuarioController.endereco.endBairro =
                data.data.endereco['endBairro'];

              usuarioController.endereco.endNumero =
                data.data.endereco['endNumero'];

              usuarioController.endereco.endCep =
                data.data.endereco['endCep'];

              usuarioController.endereco.cidCodigo =
                data.data.endereco['cidCodigo'];

              usuarioController.endereco.ufCodigo =
                data.data.endereco['ufCodigo'];

              usuarioController.endereco.endLatitude =
                data.data.endereco['endLatitude'];
              usuarioController.localizacao.latitude =
                usuarioController.endereco.endLatitude;

              usuarioController.endereco.endLongitude =
                data.data.endereco['endLongitude'];
              usuarioController.localizacao.longitude =
                usuarioController.endereco.endLongitude;
            }
            if (data.data.completarCadastro) {
              myScript.notificacao("Dados incompletos",
                "Você deve completar seu cadastro");
            }
          } catch (err) {
            alert('Erro no success do /usuario/login :' + err);
          }
        },
        error: function(data, status, xhr) {
          alert('error: \nstatus:' + JSON.stringify(status) +
            '\ndata:' +
            JSON.stringify(data));
        },
        complete: function(xhr, status) {
          myApp.hideIndicator();
          myApp.closeModal(loginScreen);
          //altera a imagem e o nome no painel lateral
          $('#painelUsuImagem').css('background-image', 'url(' +
            usuarioController.usuario.usuImagem + ')');
          $('#painelUsuNome').html(usuarioController.usuario.usuNome);
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
      endCep: usuarioController.endereco.endCep,
      cidCodigo: usuarioController.endereco.cidCodigo,
      ufCodigo: usuarioController.endereco.ufCodigo,
      endLatitude: usuarioController.endereco.endLatitude,
      endLongitude: usuarioController.endereco.endLongitude,
    };

    //deleta as propriedades nulas
    for (var k in usuario) {
      if (usuario[k] == null) {
        delete usuario[k];
      }
    }

    for (var k in endereco) {
      if (endereco[k] == null) {
        delete endereco[k];
      }
    }

    var dados = {
      usuario, endereco
    };
    // alert("Dados a serem enviados:\n" + JSON.stringify(dados));
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
