var ofertas = {
    initialize: function() {
        if (!ofertas.iniciado) {
            ofertas.iniciado = true;
            // Loading flag
            ofertas.loading = false;
            // Attach 'infinite' event handler
            $('.infinite-scroll').on('infinite', function() {
                //alert('infinite-scroll infinite');
                // Exit, if loading in progress
                if (ofertas.loading) return;

                // Set loading flag
                ofertas.loading = true;

                try {
                    usuarioController.preferencias.offset['inicio'] = $('#listaOfertas li').length;
                } catch (e) {
                    alert(e);
                }
                // Reset loading flag
                loading = false;
                // Update last loaded index
                usuarioController.preferencias.offset['inicio'] = $('#listaOfertas li').length;
                ofertas.lerOfertas();
            });

        }

        if ($('#listaOfertas li').length == 0) {
            ofertas.lerOfertas();
        }
    },

    lerOfertas: function() {
        ofertaController.readAll(usuarioController.preferencias, function(ofertas) {
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
                    $('#listaOfertas').append(html);
                }
                ofertas.loading = false;
            } catch (e) {
                alert(JSON.stringify(e));
            }
        });
    }
};
