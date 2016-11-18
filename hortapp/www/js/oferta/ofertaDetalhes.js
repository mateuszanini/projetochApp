//var dadosJSON;
var ofertaDetalhes = function(oftCodigo) {
    ofertaController.getById(oftCodigo, function(dados) {
        //dadosJSON = JSON.stringify(dados);
        //dadosJSON = dados;
        console.log(dados);
        dados.usuario['usuImagem'] = "https://lh5.googleusercontent.com/-2SJyjwyB0aA/AAAAAAAAAAI/AAAAAAAAAl4/b6LstKRYF1U/s64/photo.jpg";
        dados.usuario['usuNome'] = "Mateus Zanini";
        console.log(dados.usuario['usuImagem']);
        var caminhoImg = config.enderecoImagem + dados.oferta['oftImagem'];
        $("#imgMiniatura").attr("src", caminhoImg);
        $("#usuarioAvatar").attr("src", dados.usuario['usuImagem']);
        $(".facebook-name").html(dados.usuario['usuNome']);

        /*=== Default standalone ===*/
        var myPhotoBrowserStandalone = myApp.photoBrowser({
            photos : [{
                url: caminhoImg,
                caption: "Legenda"
            }
            ],
            theme: 'dark'
        });
        //Open photo browser on click
        $('#imgMiniatura').on('click', function () {
            myPhotoBrowserStandalone.open();
        });

    });
};
