var usuario = {
  initialize: function() {

    usuarioController.localizacao.mapCanvas =
      document.getElementById("mapCanvas");

    usuarioController.localizacao.divEnderecoAtual =
      document.getElementById("usuLocalizacao");

    $("#usuLocalizacaoAtual").change(function() {
      usuario.mostraMapa();
    });

    $("#ufCodigo").change(function() {
      usuario.listaCidades(0);
    });

    $("#endCep").keyup(function() {
      var cep = $(this).val().replace(/\D/g, '');
      if (cep.length == 8) {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
          ofertaController.localizacao.pesquisaCep(cep, function(data) {
            $("#endBairro").val(data.bairro);
            $("#endLogradouro").val(data.logradouro);
            usuario.listaEstados(data.uf);
            usuario.listaCidades(data.ibge);
          });
        }
      }
    });
    // $("#endCep").keyup(function() {
    //   var cep = $(this).val().replace(/\D/g, '');
    //   if (cep.length == 8) {
    //     var validacep = /^[0-9]{8}$/;
    //     if (validacep.test(cep)) {
    //       usuario.pesquisaCep(cep, "manual");
    //     }
    //   }
    // });

    $("#btnPesquisarLocalizacao").click(function() {
      myApp.prompt('Digite uma localização para pesquisar', function(
        value) {
        usuarioController.localizacao.geocodeAddress(value);
      });
    });

    $("#btnLocalizacaoAtual").click(function() {
      usuarioController.localizacao.localizacaoAtual();
    });
    $("#usuSalvar").click(function() {
      usuario.salvar();
    });

    //seta os valores com os dados vindos do banco
    $("#usuNome").val(usuarioController.usuario.usuNome);
    $("#usuEmail").val(usuarioController.usuario.usuEmail);
    $("#usuTelefone").val(usuarioController.usuario.usuTelefone);

    if (usuarioController.usuario.usuTelefoneVisivel == 1) {
      $('#usuTelefoneVisivel').prop('checked', true);
    } else {
      $('#usuTelefoneVisivel').prop('checked', false);
    }

    if (usuarioController.usuario.usuEndVisivel == 1) {
      $('#usuEndVisivel').prop('checked', true);
    } else {
      $('#usuEndVisivel').prop('checked', false);
    }

    if (usuarioController.endereco.endLatitude !== null &&
      usuarioController.endereco.endLongitude !== null) {
      $('#usuLocalizacaoAtual').prop('checked', true);
      usuario.mostraMapa();
    } else {
      $("#endCep").val(usuarioController.endereco.endCep);
      $("#endBairro").val(usuarioController.endereco.endBairro);
      $("#endLogradouro").val(usuarioController.endereco.endLogradouro);
      $("#endNumero").val(usuarioController.endereco.endNumero);
    }

    usuario.listaEstados(usuarioController.endereco.ufCodigo);
    usuario.listaCidades(usuarioController.endereco.cidCodigo);
  },

  salvar: function() {
    try {
      var formData = myApp.formToJSON('#usuFormulario');
      // alert(JSON.stringify(formData));

      usuarioController.usuario.usuTelefone = formData['usuTelefone'];

      if (formData['usuTelefoneVisivel'][0]) {
        usuarioController.usuario.usuTelefoneVisivel = 1;
      } else {
        usuarioController.usuario.usuTelefoneVisivel = 0;

      }
      if (formData['usuEndVisivel'][0]) {
        usuarioController.usuario.usuEndVisivel = 1;
      } else {
        usuarioController.usuario.usuEndVisivel = 0;
      }

      // alert(JSON.stringify(usuarioController.usuario ));

      usuarioController.endereco.endLogradouro = formData['endLogradouro'];
      usuarioController.endereco.endBairro = formData['endBairro'];
      usuarioController.endereco.endNumero = formData['endNumero'];
      usuarioController.endereco.endCep = formData['endCep'];
      usuarioController.endereco.cidCodigo = formData['cidCodigo'];
      usuarioController.endereco.ufCodigo = formData['ufCodigo'];
    } catch (err) {
      alert("Erro ao capturar os dados do formulário: " + err);
    }

    if ($("#usuLocalizacaoAtual").is(":checked")) {
      usuarioController.endereco.endLogradouro = "";
      usuarioController.endereco.endBairro = "";
      usuarioController.endereco.endNumero = "";
      usuarioController.endereco.endCep = "";
      usuarioController.endereco.cidCodigo = "";
      usuarioController.endereco.ufCodigo = "";
      usuarioController.endereco.endLatitude = usuarioController.localizacao
        .latitude;
      usuarioController.endereco.endLongitude = usuarioController.localizacao
        .longitude;
      // myScript.notificacao("Dados do formulário", "Latitude: " +
      //   usuarioController.endereco.endLatitude + " / Longitude: " +
      //   usuarioController.endereco.endLongitude, true);
    } else {
      usuarioController.endereco.endLatitude = null;
      usuarioController.endereco.endLongitude = null;
    }

    usuarioController.salvar();
  },

  // pesquisaCep: function(cep, tipo) {
  //   $.ajax({
  //     url: "https://viacep.com.br/ws/" + cep + "/json",
  //     method: "GET",
  //     beforeSend: function(xhr) {
  //       myApp.showIndicator();
  //     },
  //     success: function(data) {
  //       if (!("erro" in data)) {
  //         if (tipo == "manual") {
  //           myScript.notificacao("Cidade encontrada", "Você está em " +
  //             data.localidade + " - " + data.uf, true);
  //           $("#endBairro").val(data.bairro);
  //           $("#endLogradouro").val(data.logradouro);
  //         }
  //         usuario.listaEstados(data.uf);
  //         usuario.listaCidades(data.ibge);
  //       } else {
  //         myScript.notificacao("CEP não encontrado",
  //           "Por favor, digite um CEP existente.", false);
  //       }
  //     },
  //     error: function(data, status, xhr) {
  //       myScript.notificacao("Erro desconhecido",
  //         "Tente novamente mais tarde", false);
  //     },
  //     complete: function(xhr, status) {
  //       myApp.hideIndicator();
  //     }
  //   });
  // },

  mostraMapa: function() {
    $('.divisor').toggleClass('animated zoomOut');
    $('.divisor').toggleClass('animated zoomIn');
    $('.mapa').toggleClass('hide');
    $('.mapa').toggleClass('animated zoomIn');
    $('.usuEndereco').toggleClass('hide');

    if ($("#usuLocalizacaoAtual").is(":checked")) {
      // mainView.hideToolbar();
      usuarioController.localizacao.initMap(document.getElementById(
        "mapCanvas"));
    }
  },

  listaEstados: function(ufSigla) {
    var strUf = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufSigla == ufSigla || uf[i].ufCodigo == ufSigla) {
        strUf += '<option value="' + uf[i].ufCodigo + '" selected>' + uf[i]
          .ufNome +
          '</option>';
        $("#estadoSelecionado").html(uf[i].ufNome);
      } else {
        strUf += '<option value="' + uf[i].ufCodigo + '">' + uf[i].ufNome +
          '</option>';
      }
    }
    $("#ufCodigo").html(strUf);
  },

  listaCidades: function(cidCodigo) {
    var ufSelecionado = parseInt($("#ufCodigo").val());
    var strCidade = '';
    for (var i = 0; i < uf.length; i++) {
      if (uf[i].ufCodigo == ufSelecionado) {
        for (var j = 0; j < uf[i].cidades.length; j++) {
          if (cidCodigo == 0 && j == 0) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeSelecionada").html(uf[i].cidades[j].cidNome);
          } else if (uf[i].cidades[j].cidCodigo == cidCodigo) {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '" selected>' + uf[i].cidades[j].cidNome + '</option>';
            $("#cidadeSelecionada").html(uf[i].cidades[j].cidNome);
          } else {
            strCidade += '<option value="' + uf[i].cidades[j].cidCodigo +
              '">' +
              uf[i].cidades[j].cidNome + '</option>';
          }

        }
      }
    }
    $("#cidCodigo").html(strCidade);
  }
};
