var ofertaController = {
  initialize: function() {
    ofertaController.localizacao = new Localizacao();

    ofertaController.ofertas = [];
    //adiciona métodos ao modelo de oferta
    OfertaModel.prototype.create = function() {
      ofertaController.create(this);
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
  }


};
