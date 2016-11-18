var editarOferta = {

  listarOferta: function(oftCodigo) {
    editarOferta.oftDataInicial = null;
    editarOferta.oftDataFinal = null;

    ofertaController.getById(oftCodigo, function(dados) {
      //alert(JSON.stringify(dados));
      editarOferta.listaItens(dados.oferta['itmCodigo']);
      $('#oftEditarQuantidade').val(dados.oferta['oftQuantidade']);
      $('#oftEditarValor').val(dados.oferta['oftValor']);
      $("#fotoEditarOferta").addClass("fotoEditarOferta");
      $('#fotoEditarOferta').attr('src', config.enderecoImagem + dados.oferta[
        'oftImagem']);
      try {
        editarOferta.calendarios(dados.oferta['oftDataInicialCru'],
          dados.oferta['oftDataFinalCru']);
      } catch (e) {
        alert(JSON.stringify(e));
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
    //alert(dataInicial);
    editarOferta.calendarioInicioOferta = myApp.calendar({
      input: '#oftEditarDataInicial',
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
        editarOferta.oftDataFinal = editarOferta.oftDataInicial =
          year +
          '-' + (parseInt(month) + 1) +
          '-' +
          day;
      },
      onClose: function(p) {
        editarOferta.calendarioFinalOferta = myApp.calendar({
          input: '#oftEditarDataFinal',
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
            editarOferta.oftDataFinal =
              year + '-' + (parseInt(month) + 1) + '-' + day;
          },
        });
        editarOferta.calendarioFinalOferta.setValue(
          editarOferta.calendarioInicioOferta.value);
        $('#oftEditarDataFinal').show();
      },
      onOpen: function(p) {
        $('#oftEditarDataFinal').hide();
      }
    });

    editarOferta.calendarioInicioOferta.setValue(dataInicial);
    editarOferta.calendarioFinalOferta.setValue(dataFinal);

  }
}
