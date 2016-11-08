var ofertas = {
  initialize: function() {
    ofertaController.read(usuarioController.preferencias, function(ofertas) {
      for (var i = 0; i < ofertas.length; i++) {
        var html = '<li>';
        html += '<a href="#" class="item-link item-content">' +
          '<div class="item-media"><img src="' + config.getEnderecoImagem() +
          ofertas[i]['oftImagem'] +
          '" width="80"></div>' +
          '<div class="item-inner">' +
          '<div class="item-title-row">' +
          '<div class="item-title">' +
          getItemByCodigo(ofertas[i]['itmCodigo']) + '</div>' +
          '<div class="item-after"></div>' +
          '</div>' +
          '<div class="item-subtitle">Vence em: &nbsp' +
          ofertas[i]['oftDataFinal'] +
          ' </div>' +
          '<div class="item-text">YYYYYYYYYYYY</div>' +
          '</div>' +
          '</a>' +
          '</li>';
        $('#listaOfertas').append(html);
      }
    });
  }
};
