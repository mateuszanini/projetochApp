var minhasOfertas = {
    initialize: function() {
        ofertaController.readMy(function(ofertas) {
            try {
                for (var i = 0; i < ofertas.length; i++) {
                    var img = ofertas[i]['oftImagem'] != null ?
                        ofertas[i]['oftImagem'] : 'null.jpg';

                    var html = '<li>';
                    html += '<a href="#" class="item-link item-content">' +
                        '<div class="item-media"><img src="' + config.getEnderecoImagem() +
                        img +
                        '" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                        '<div class="item-title">' +
                        getItemByCodigo(ofertas[i]['itmCodigo']) + '</div>' +
                        '<div class="item-after"></div>' +
                        '</div>' +
                        '<div class="item-subtitle">Vence em: <br/>' +
                        ofertas[i]['oftDataFinal'] +
                        ' </div>' +
                        '<div class="item-text">Quantidade disponível:<br/>' +
                        ofertas[i]['oftQuantidade'] + '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                    $('#listaMinhasOfertas').append(html);
                }
            } catch (e) {
                alert("minhasOfertas: " + e);
            }
        });
    }
};
