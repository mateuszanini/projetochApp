var ofertaDetalhes = function(oftCodigo) {
    ofertaController.getById(oftCodigo, function(dados) {
        console.log(dados);

        dados.usuario['usuImagem'] = "https://lh5.googleusercontent.com/-2SJyjwyB0aA/AAAAAAAAAAI/AAAAAAAAAl4/b6LstKRYF1U/s64/photo.jpg";
        dados.usuario['usuNome'] = "Mateus Zanini";

        $("#usuarioAvatar").attr("src", dados.usuario['usuImagem']);
        $(".facebook-name").html(dados.usuario['usuNome']);

        var itmNome = ""
        for (var i = 0; i < itens.length; i++) {
            if (itens[i].itmCodigo == dados.oferta['itmCodigo']) {
                itmNome = itens[i].itmNome;
            }
        }

        $("#itmNome").html(itmNome);
        var caminhoImg = config.enderecoImagem + dados.oferta['oftImagem'];
        $("#imgMiniatura").attr("src", caminhoImg);
        $("#oftDataInicial").html(dados.oferta['oftDataInicial']);
        $("#oftDataFinal").html(dados.oferta['oftDataFinal']);
        $("#oftQuantidade").html(dados.oferta['oftQuantidade']);
        $("#oftValor").html("R$ " + dados.oferta['oftValor']);

        var myPhotoBrowserStandalone = myApp.photoBrowser({
            photos: [{
                url: caminhoImg,
                caption: itmNome
            }],
            theme: 'dark'
        });
        $('#visualizarImagem').on('click', function() {
            myPhotoBrowserStandalone.open();
        });

        $('#btnReservar').on('click', function() {
            myApp.prompt('Qual quantidade você deseja reservar?', function(value) {
                myScript.notificacao("Sucesso", "Você reservou " + value + " itens!", true);
            });
        });

    });
};
