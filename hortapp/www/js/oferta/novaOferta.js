var novaOferta = {
  initialize: function() {
    novaOferta.fileURI;
    novaOferta.retries = 0;
    novaOferta.oftDataInicial = null;
    novaOferta.oftDataFinal = null;
    ofertaController.localizacao.mapCanvas =
      document.getElementById("mapCanvasOferta");

    ofertaController.localizacao.divEnderecoAtual =
      document.getElementById("oftLocalizacao");
    novaOferta.calendarioInicioOferta = myApp.calendar({
      input: '#oftDataInicial',
      dateFormat: 'DD, dd de MM de yyyy',
      toolbarCloseText: 'Concluído',
      minDate: new Date().setDate(new Date().getDate() - 1),
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
        'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
        'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
        'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta',
        'Sexta', 'Sábado'
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      closeOnSelect: true,
      onDayClick: function(p, dayContainer, year, month, day) {
        novaOferta.oftDataFinal = novaOferta.oftDataInicial = year +
          '-' + (parseInt(month) + 1) +
          '-' +
          day;
      },
      onClose: function(p) {
        //        alert(p.value[0]);
        novaOferta.calendarioFinalOferta = myApp.calendar({
          input: '#oftDataFinal',
          dateFormat: 'DD, dd de MM de yyyy',
          toolbarCloseText: 'Concluído',
          minDate: p.value[0],
          monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio',
            'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
            'Novembro',
            'Dezembro'
          ],
          monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai',
            'Jun',
            'Jul',
            'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ],
          dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta',
            'Quinta',
            'Sexta', 'Sábado'
          ],
          dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui',
            'Sex', 'Sab'
          ],
          closeOnSelect: true,
          onDayClick: function(p, dayContainer, year, month, day) {
            novaOferta.oftDataFinal =
              year + '-' + (parseInt(month) + 1) + '-' + day;
          },
        });
        novaOferta.calendarioFinalOferta.setValue(
          novaOferta.calendarioInicioOferta.value);
        $('#oftDataFinal').show();
      },
      onOpen: function(p) {
        $('#oftDataFinal').hide();
      }
    });

    novaOferta.listaItens();
    novaOferta.listaEstados('SC');
    novaOferta.listaCidades(4219309);
    novaOferta.atribuiAcoes();
  },

  atribuiAcoes: function() {
    $('#oftSalvar').click(function() {
      novaOferta.salvar();
    });
    $('#btnTirarFoto').click(function() {
      novaOferta.capturePhoto();
    });

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
      myApp.prompt('Digite uma localização para pesquisar',
        function(
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
          ofertaController.localizacao.pesquisaCep(cep, function(
            data) {
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
      strItem += '<option value="' + itens[i].itmCodigo + '">' + itens[
          i].itmNome +
        '</option>';
    }
    $("#itmCodigo").html(strItem);
  },

  listaEstados: function(ufSigla) {
    var strUf = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufSigla == ufSigla || uf[i].ufCodigo == ufSigla) {
        strUf += '<option value="' + uf[i].ufCodigo + '" selected>' +
          uf[i]
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

  capturePhoto: function() {
    navigator.camera.getPicture(novaOferta.onCapturePhoto, novaOferta.onFail, {
      quality: 100,
      // targetHeight: 250,
      targetWidth: 250,
      encodingType: navigator.camera.EncodingType.JPEG,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      //allowEdit: true,
      correctOrientation: true //Corrects Android orientation quirks
    });
  },

  onCapturePhoto: function(fileURI) {
    novaOferta.fileURI = fileURI;
    $("#fotoOferta").addClass("fotoOferta");
    $("#fotoOferta").attr("src", fileURI);
  },
  onFail: function(message) {
    console.log('Failed because: ' + message);
  },

  salvar: function() {
    try {
      var formData = myApp.formToJSON('#oftFormulario');
      var oferta = new OfertaModel();
      // oferta.oftCodigo = null;
      //oferta.usuCodigo = null;
      oferta.itmCodigo = formData['itmCodigo'];
      oferta.oftImagem = novaOferta.fileURI;
      oferta.oftQuantidade = formData['oftQuantidade'];
      oferta.oftValor = formData['oftValor'];
      oferta.oftDataInicial = novaOferta.oftDataInicial;
      oferta.oftDataFinal = novaOferta.oftDataFinal;
      // oferta.stsCodigo = null;
      oferta.oftObs = formData['oftObs'];

      var valido = true;

      //verifica se é para usar o endereco do usuario
      if ($("#oftEnderecoCadastro").is(":checked")) {
        oferta.endCodigo = usuarioController.usuario.endCodigo;
      } else {
        //verifica se está usando o mapa
        if ($("#oftLocalizacaoAtual").is(":checked")) {
          oferta.endereco.endLatitude = ofertaController.localizacao.latitude;
          oferta.endereco.endLongitude = ofertaController.localizacao.longitude;
        } else {
          // caso contrario, pega os dados do formulario de endereço
          // oferta.endCodigo = null;
          oferta.endereco.endLogradouro = formData['endLogradouroOferta'];
          oferta.endereco.endBairro = formData['endBairroOferta'];
          oferta.endereco.endNumero = formData['endNumeroOferta'];
          oferta.endereco.endCep = formData['endCepOferta'];
          oferta.endereco.cidCodigo = formData['cidCodigoOferta'];
          oferta.endereco.ufCodigo = formData['ufCodigoOferta'];

          if (oferta.endereco.cidCodigo == "" &&
            oferta.endereco.ufCodigo == "") {
            myScript.notificacao("Erro", "Revise o endereço",
              false);
            valido = false;
          }
        }
      }
      //VALIDA OS CAMPOS

      if (oferta.itmCodigo == "") {
        myScript.notificacao("Erro", "Selecione um item.", false);
        valido = false;
      }
      if (oferta.oftQuantidade == "") {
        myScript.notificacao("Erro", "Insira a quantidade", false);
        valido = false;
      }
      if (oferta.oftDataInicial == null) {
        myScript.notificacao("Erro", "Selecione a data inicial da oferta",
          false);
        valido = false;
      }

      if (!valido) return;
      //FIM DA VALIDAÇÃO
      //deleta as propriedades nulas
      for (var k in oferta) {
        if (oferta[k] == null || oferta[k] == "") {
          delete oferta[k];
        }
      }
      for (var k in oferta.endereco) {
        if (oferta.endereco[k] == null || oferta.endereco[k] == "") {
          delete oferta.endereco[k];
        }
      }
      ofertaController.create(oferta);
    } catch (e) {
      alert("Erro ao salvar o formulario da oferta: " + e);
    }
  }

};
