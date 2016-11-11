var ofertas = {
  initialize: function() {
    if (!ofertas.iniciado) {
      ofertas.iniciado = true;
      // Loading flag
      ofertas.loading = false;
    }

    $('.pull-to-refresh-content').on('refresh', function(e) {
      usuarioController.preferencias.offset['inicio'] = 0;
      ofertas.loading = true;
      ofertas.limpar = true;
      ofertas.lerOfertas();
    });

    // Attach 'infinite' event handler
    $('.infinite-scroll').on('infinite', function() {
      // Exit, if loading in progress
      if (ofertas.loading) return;

      // Set loading flag
      ofertas.loading = true;

      usuarioController.preferencias.offset['inicio'] = $(
        '#listaOfertas li').length;
      ofertas.lerOfertas();
    });

    // if ($('#listaOfertas li').length == 0) {
    //   ofertas.loading = true;
    //   ofertas.lerOfertas();
    // }

    usuarioController.preferencias.offset['inicio'] = 0;
    ofertas.loading = true;
    ofertas.lerOfertas();
  },

  lerOfertas: function() {
    ofertaController.readAll(usuarioController.preferencias, function(
      dados) {
      if (ofertas.limpar) {
        $('#listaOfertas').empty();
        ofertas.limpar = false;
      }
      for (var i = 0; i < dados.length; i++) {
        var img = dados[i]['oftImagem'] != null ?
          dados[i]['oftImagem'] : 'null.jpg';

        var html = '<li>';
        html += '<a href="views/oferta/ofertaDetalhes.html?oftCodigo=' +
          dados[i]['oftCodigo'] + '" class="item-link item-content">' +
          '<div class="item-media"><img src="' + config.getEnderecoImagem() +
          img +
          '" width="80"></div>' +
          '<div class="item-inner">' +
          '<div class="item-title-row">' +
          '<div class="item-title">' +
          getItemByCodigo(dados[i]['itmCodigo']) + '</div>' +
          '<div class="item-after"></div>' +
          '</div>' +
          '<div class="item-subtitle">Vence em: <br/>' +
          dados[i]['oftDataFinal'] +
          ' </div>' +
          '<div class="item-text">Quantidade disponível:<br/>' +
          dados[i]['oftQuantidade'] + '</div>' +
          '</div>' +
          '</a>' +
          '</li>';
        $('#listaOfertas').append(html);
      }
      ofertas.loading = false;
      myApp.pullToRefreshDone();
    });
  }
};
