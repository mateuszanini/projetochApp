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
  },

  listaItens: function() {
    var strItem = '';
    for (var i = 0; i < itens.length; i++) {
      strItem += '<option value="' + itens[i].itmCodigo + '">' + itens[i].itmNome +
        '</option>';
    }
    $("#itmCodigo").html(strItem);
  },

  listaEstados: function(ufSigla) {
    var strUf = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufSigla == ufSigla || uf[i].ufCodigo == ufSigla) {
        strUf += '<option value="' + uf[i].ufCodigo + '" selected>' + uf[i]
          .ufNome +
          '</option>';
        $("#estadoSelecionadoOferta").html(uf[i].ufNome);
      } else {
        strUf += '<option value="' + uf[i].ufCodigo + '">' + uf[i].ufNome +
          '</option>';
      }
    }
    $("#ufCodigoOferta").html(strUf);
  },

  listaCidades: function(cidCodigo) {
    var ufSelecionado = parseInt($("#ufCodigoOferta").val());
    var strCidade = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufCodigo == ufSelecionado) {
        for (var j = 0; j < uf[i].cidades.length; j++) {
          if (cidCodigo == 0 && j == 0) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeSelecionadaOferta").html(uf[i].cidades[j].cidNome);
          } else if (uf[i].cidades[j].cidCodigo == cidCodigo) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeSelecionadaOferta").html(uf[i].cidades[j].cidNome);
          } else {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '">' +
              uf[i].cidades[j].cidNome + '</option>';
          }
        }
      }
    }
    $("#cidCodigoOferta").html(strCidade);
  },

  atribuiAcoes: function() {
    $("#oftEnderecoCadastro").change(function() {
      $('.enderecoProprio').toggleClass('hide');
    });

    $("#oftLocalizacaoAtual").change(function() {
      $('.divisorOferta').toggleClass('animated zoomOut');
      $('.divisorOferta').toggleClass('animated zoomIn');
      $('.mapaOferta').toggleClass('hide');
      $('.mapaOferta').toggleClass('animated zoomIn');
      $('.enderecoOferta').toggleClass('hide');
      if ($("#oftLocalizacaoAtual").is(":checked")) {
        // mostrar o mapa aqui
        ofertaController.localizacao.initMap(document.getElementById(
          "mapCanvasOferta"));
      }
    });

    $("#btnPesquisarLocalizacaoOferta").click(function() {
      myApp.prompt('Digite uma localização para pesquisar', function(
        value) {
        ofertaController.localizacao.geocodeAddress(value);
      });
    });

    $("#btnLocalizacaoAtualOferta").click(function() {
      ofertaController.localizacao.localizacaoAtual();
    });

    $("#ufCodigoOferta").change(function() {
      ofertaController.listaCidades(0);
    });
  }
};

ofertaController.initialize();
