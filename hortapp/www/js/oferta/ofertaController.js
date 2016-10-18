var oferta = function(){

  this.oftCodigo = null;
  this.usuCodigo = null;
  this.itmCodigo = null;
  this.oftQuantidade = null;
  this.oftValor = null;
  this.oftDataInicial = null;
  this.oftDataFinal = null;
  this.endCodigo = null;
  this.stsCodigo = null;
  this.oftObs = null;

  this.endereco = {
    endLogradouro: null,
    endBairro: null,
    endNumero: null,
    endCep: null,
    cidCodigo: null,
    ufCodigo: null,
    endLatitude: null,
    endLongitude: null,
  };

  this.create = function(){
    ofertaController.create(this);
  };
};


var ofertaController = {
  initialize: function() {
    this.ofertas = [];
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
          alert('iterar sobre os dados recebidos e inserir nas ofertas');
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
