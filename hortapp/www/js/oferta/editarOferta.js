var editarOferta = {

  listarOferta: function(oftCodigo) {
    editarOferta.oftDataInicial = null;
    editarOferta.oftDataFinal = null;

    ofertaController.getById(oftCodigo, function(dados) {
      console.log(dados);
      editarOferta.listaItens(dados.oferta['itmCodigo']);
      $('#oftEditarQuantidade').val(dados.oferta['oftQuantidade']);
      $('#oftEditarValor').val(dados.oferta['oftValor']);
      $("#fotoEditarOferta").addClass("fotoEditarOferta");
      var img = dados.oferta['oftImagem'] != null ? dados.oferta[
        'oftImagem'] : 'null.jpg';
      $('#fotoEditarOferta').attr('src', config.enderecoImagem + img);
      editarOferta.calendarios(dados.oferta['oftDataInicialCru'],
        dados.oferta['oftDataFinalCru']);

      $("#oftEditarDataInicial").attr("placeholder",
        dados.oferta['oftDataInicial']);
      $("#oftEditarDataFinal").attr("placeholder",
        dados.oferta['oftDataFinal']);

      $('#oftEditarObs').val(dados.oferta['oftObs']);

      try {
        editarOferta.localizacao = new Localizacao();

        editarOferta.localizacao.mapCanvas =
          document.getElementById("mapEditarCanvasOferta");
        editarOferta.localizacao.divEnderecoAtual =
          document.getElementById("oftEditarLocalizacao");


        if (dados.endereco['endLatitude'] != null &&
          dados.endereco['endLongitude'] != null) {
          $('#oftEditarLocalizacaoAtual').prop('checked', true);
          //mostrar mapa

          editarOferta.localizacao.geocodeLatLng({
            lat: dados.endereco['endLatitude'],
            lng: dados.endereco['endLongitude']
          });
          $('.mapaEditarOferta').toggleClass('hide');


        } else {
          $("#endEditarCepOferta").val(dados.endereco.endCep);
          $("#endEditarBairroOferta").val(dados.endereco.endBairro);
          $("#endEditarLogradouroOferta").val(dados.endereco.endLogradouro);
          $("#endEditarNumeroOferta").val(dados.endereco.endNumero);
          editarOferta.listaEstados(dados.endereco.ufCodigo);
          editarOferta.listaCidades(dados.endereco.cidCodigo);
          $('.enderecoEditarOferta').toggleClass('hide');
        }


      } catch (e) {
        alert(e);
      }
    });
  },

  listaItens: function(itmCodigo) {
    var strItem = '';
    for (var i = 0; i < itens.length; i++) {
      if (itens[i].itmCodigo != itmCodigo) {
        strItem += '<option value="' + itens[i].itmCodigo +
          '">' +
          itens[i].itmNome +
          '</option>';
      } else {
        $('#itemEditarSelecionado').html(itens[i].itmNome);
        strItem += '<option value="' + itens[i].itmCodigo +
          '" selected>' +
          itens[i].itmNome +
          '</option>';
      }
    }
    $("#itmEditarCodigo").html(strItem);
  },

  calendarios: function(dataInicial, dataFinal) {
    dataFinal = new Date(Date.parse(dataFinal)).getTime();
    dataInicial = new Date(Date.parse(dataInicial)).getTime();
    // alert(dataInicial);
    // alert(dataFinal);
    editarOferta.calendarioInicioOferta = myApp.calendar({
      input: '#oftEditarDataInicial',
      dateFormat: 'dd de MM de yyyy',
      toolbarCloseText: 'Concluído',
      //minDate: new Date().setDate(new Date().getDate() - 1),
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
        editarOferta.oftDataFinal = editarOferta.oftDataInicial =
          year +
          '-' + (parseInt(month) + 1) +
          '-' +
          day;
      },
      onClose: function(p) {
        editarOferta.calendarioFinalOferta.setValue(
          editarOferta.calendarioInicioOferta.value);
      }
    });

    editarOferta.calendarioFinalOferta = myApp.calendar({
      input: '#oftEditarDataFinal',
      dateFormat: 'dd de MM de yyyy',
      toolbarCloseText: 'Concluído',
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
        editarOferta.oftDataFinal =
          year + '-' + (parseInt(month) + 1) + '-' + day;
      },
    });
    editarOferta.calendarioInicioOferta.setValue(dataInicial);
    editarOferta.calendarioFinalOferta.setValue(dataFinal);

  },

  listaEstados: function(ufSigla) {
    var strUf = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufSigla == ufSigla || uf[i].ufCodigo == ufSigla) {
        strUf += '<option value="' + uf[i].ufCodigo + '" selected>' + uf[i]
          .ufNome +
          '</option>';
        $("#estadoEditarSelecionadoOferta").html(uf[i].ufNome);
      } else {
        strUf += '<option value="' + uf[i].ufCodigo + '">' + uf[i].ufNome +
          '</option>';
      }
    }
    $("#ufEditarCodigoOferta").html(strUf);
  },

  listaCidades: function(cidCodigo) {
    var ufSelecionado = parseInt($("#ufEditarCodigoOferta").val());
    var strCidade = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufCodigo == ufSelecionado) {
        for (var j = 0; j < uf[i].cidades.length; j++) {
          if (cidCodigo == 0 && j == 0) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeEditarSelecionadaOferta").html(uf[i].cidades[j].cidNome);
          } else if (uf[i].cidades[j].cidCodigo == cidCodigo) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeEditarSelecionadaOferta").html(uf[i].cidades[j].cidNome);
          } else {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '">' +
              uf[i].cidades[j].cidNome + '</option>';
          }

        }
      }
    }
    $("#cidEditarCodigoOferta").html(strCidade);
  }
}
