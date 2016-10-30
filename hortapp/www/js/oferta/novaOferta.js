var novaOferta = {
  initialize: function() {
    ofertaController.localizacao.mapCanvas =
      document.getElementById("mapCanvasOferta");

    ofertaController.localizacao.divEnderecoAtual =
      document.getElementById("oftLocalizacao");

    novaOferta.listaItens();
    novaOferta.listaEstados('SC');
    novaOferta.listaCidades(4219309);
    novaOferta.atribuiAcoes();
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
        ofertaController.localizacao.initMap();
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
      novaOferta.listaCidades(0);
    });

    $("#endCepOferta").keyup(function() {
      var cep = $(this).val().replace(/\D/g, '');
      if (cep.length == 8) {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
          ofertaController.localizacao.pesquisaCep(cep, function(data) {
            $("#endBairroOferta").val(data.bairro);
            $("#endLogradouroOferta").val(data.logradouro);
            novaOferta.listaEstados(data.uf);
            novaOferta.listaCidades(data.ibge);
          });
        }
      }
    });
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
  }

};
