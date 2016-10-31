var ofertaController = {
  initialize: function() {
    ofertaController.localizacao = new Localizacao();

    ofertaController.ofertas = [];
    //adiciona métodos ao modelo de oferta
    OfertaModel.prototype.create = function() {
      ofertaController.create(this);
    };
    OfertaModel.prototype.enviaFoto = function() {
      ofertaController.enviaFoto(this);
    };

    OfertaModel.prototype.update = function() {
      ofertaController.update(this);
    };
  },

  create: function(oferta) {
    alert(JSON.stringify(oferta));
    try {
      $.ajax({
        url: config.getApi() + '/oferta/nova',
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

  read: function(preferencias, callback) {
    try {
      $.ajax({
        url: config.getApi() + '/oferta',
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
          alert(
            'iterar sobre os dados recebidos e inserir nas ofertas'
          );
          //          ofertaController.ofertas.push(data)
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
    if (oferta.oftCodigo == null) {
      alert("Deve ser uma oferta válida");
      return false;
    }
    //verifica se o arquivo existe
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.result == null) {
        alert("Deve ser uma imagem válida");
        return false;
      } else {
        //envia a foto
        var win = function(r) {
          navigator.camera.cleanup();
          ofertaController.retries = 0;
          alert('Feito!');
        }

        var fail = function(error) {
          if (retries == 0) {
            ofertaController.retries++
              setTimeout(function() {
                ofertaController.enviaFoto(oferta)
              }, 1000)
          } else {
            ofertaController.retries = 0;
            navigator.camera.cleanup();
            alert('Ups. Algo errado aconteceu!');
          }
        }

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURI.substr(oferta.oftImagem.lastIndexOf(
            '/') +
          1);
        options.trustAllHosts = true;
        options.headers = {
          "idtoken": usuarioController.idToken
        };
        options.mimeType = "image/jpeg";
        options.params = {
          "oftCodigo": oferta.oftCodigo
        };
        var ft = new FileTransfer();
        //envia arquivo para o servidor
        ft.upload(fileURI, encodeURI("http://192.168.5.104:8888/upload"),
          win,
          fail,
          options);
      }
    };
    // We are going to check if the file exists
    reader.readAsDataURL(oferta.oftImagem);
  }
};
