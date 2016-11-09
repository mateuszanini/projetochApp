var ofertaController = {
  initialize: function() {
    ofertaController.localizacao = new Localizacao();
    ofertaController.retries = 0;
    ofertaController.ofertas = [];
  },
  create: function(oferta) {
    try {
      $.ajax({
        url: config.getApi() + '/novaoferta',
        headers: {
          "idtoken": usuarioController.idToken
        },
        data: oferta,
        type: "GET",
        dataType: undefined,
        // contentType: "application/json",
        beforeSend: function() {
          myApp.showIndicator();
        },
        success: function(data, status, xhr) {
          try {
            ofertaController.enviaFoto({
              oftCodigo: data.data['oftCodigo'],
              oftImagem: oferta.oftImagem
            });
          } catch (e) {
            alert(JSON.stringify(e));
          }
        },
        error: function(data, status, xhr) {
          myScript.notificacao("Erro", data, false);
        },
        complete: function(xhr, status) {
          myApp.hideIndicator();
        }
      });
    } catch (err) {
      alert('Erro Oferta.create: ' + err.message);
    }
  },

  readMy: function(callback) {
    try {
      $.ajax({
        url: config.getApi() + '/minhasofertas',
        headers: {
          "idtoken": usuarioController.idToken
        },
        type: "GET",
        dataType: undefined,
        // contentType: "application/json",
        beforeSend: function() {
          myApp.showIndicator();
        },
        success: function(data, status, xhr) {
          callback(data.data);
        },
        error: function(data, status, xhr) {
          alert('error readMy: \nstatus:' + JSON.stringify(status) +
            '\ndata:' + JSON.stringify(data));
        },
        complete: function(xhr, status) {
          myApp.hideIndicator();
        }
      });
    } catch (err) {
      alert('Erro usuarioController.salvar: ' + err.message);
    }
  },


  readAll: function(preferencias, callback) {
    try {
      console.log(config.getApi());
      $.ajax({
        url: config.getApi() + '/ofertas',
        headers: {
          "idtoken": usuarioController.idToken
        },
        data: preferencias,
        type: "GET",
        dataType: undefined,
        // contentType: "application/json",
        beforeSend: function() {
          myApp.showIndicator();
        },
        success: function(data, status, xhr) {
          // for (var i = 0; i < data.data.length; i++) {
          //   ofertaController.ofertas.push(data.data[i]);
          // }
          callback(data.data);
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
  },

  update: function(oferta) {
    try {
      $.ajax({
        url: config.getApi() + '/oferta/',
        headers: {
          "idtoken": usuarioController.idToken
        },
        data: oferta,
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
  },

  enviaFoto: function(oferta) {
    try {
      if (oferta.oftCodigo == null) {
        // alert("Deve ser uma oferta válida");
        return false;
      }
      if (oferta.oftImagem == null || oferta.oftImagem == "") {
        return false;
      }
      //envia a foto
      var win = function(r) {
        navigator.camera.cleanup();
        ofertaController.retries = 0;
        myApp.hideIndicator();
        myScript.notificacao("Finalizado", "Oferta salva!", true);
        mainView.router.load({
          url: 'minhasOfertas.html'
        });
        //mainView.router.refreshPage();
        //alert('Feito!');
      }

      var fail = function(error) {
        if (ofertaController.retries == 0) {
          ofertaController.retries++;
          setTimeout(function() {
            ofertaController.enviaFoto(oferta)
          }, 1000)
        } else {
          ofertaController.retries = 0;
          navigator.camera.cleanup();
          myApp.hideIndicator();
          myScript.notificacao("Erro", JSON.stringify(error), false);
        }
      }

      var options = new FileUploadOptions();
      options.fileKey = "file";
      //options.fileName = oferta.oftImagem.substr(oferta.oftImagem.lastIndexOf( '/') + 1);
      options.fileName = oferta.oftCodigo + '.jpg';
      options.trustAllHosts = true;
      options.httpMethod = 'POST';
      options.headers = {
        "idtoken": usuarioController.idToken,
        "oftCodigo": oferta.oftCodigo
      };
      options.mimeType = "image/jpeg";
      var ft = new FileTransfer();
      //envia arquivo para o servidor
      myApp.showIndicator();

      ft.upload(oferta.oftImagem, encodeURI(config.getApiImagens() +
          '/recebefoto'),
        win,
        fail,
        options);
    } catch (e) {
      JSON.stringify(e)
    }
  }
};
