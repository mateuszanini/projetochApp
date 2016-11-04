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
          //alert('entrou do succes: '+JSON.stringify(data));
          //alert('oferta:' + JSON.stringify(oferta));
          try {
            ofertaController.enviaFoto({
              oftCodigo: data.data['oftCodigo'],
              oftImagem: oferta.oftImagem
            });
          } catch (e) {
            alert("Erro no success: " + e);
          }
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
      alert('Erro Oferta.create: ' + err.message);
    }
  },

  read: function(preferencias, callback) {
    try {
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
          for (var i = 0; i < data.data.length; i++) {
            ofertaController.ofertas.push(data.data[i]);
          }
          callback();
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
    //alert("enviaFoto: " + JSON.stringify(oferta));
    if (oferta.oftCodigo == null) {
      alert("Deve ser uma oferta válida");
      return false;
    }
    //envia a foto
    var win = function(r) {
      navigator.camera.cleanup();
      ofertaController.retries = 0;
      alert('Feito!');
    }

    var fail = function(error) {
      alert('Ups. Algo errado aconteceu: ' + JSON.stringify(error));
      if (ofertaController.retries == 0) {
        ofertaController.retries++;
        setTimeout(function() {
          ofertaController.enviaFoto(oferta)
        }, 1000)
      } else {
        ofertaController.retries = 0;
        navigator.camera.cleanup();
      }
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = oferta.oftImagem.substr(oferta.oftImagem.lastIndexOf(
      '/') + 1);
    //options.fileName = oferta.oftCodigo + '.jpeg';
    //options.trustAllHosts = true;
    options.httpMethod = 'POST';
    options.headers = {
      "idtoken": usuarioController.idToken
    };
    options.mimeType = "image/jpeg";
    options.params = {
      "oftCodigo": oferta.oftCodigo
    };
    //alert(JSON.stringify(options));

    try {
      var ft = new FileTransfer();
      //envia arquivo para o servidor

      ft.upload(oferta.oftImagem, encodeURI(config.getApi() + '/recebefoto'),
        win,
        fail,
        options);
    } catch (e) {
      alert('ft.upload: ' + e);
    }
  }
};
