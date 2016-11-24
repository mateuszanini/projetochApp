var ofertaDetalhes = function(oftCodigo) {
    ofertaController.getById(oftCodigo, function(dados) {
        console.log(dados);

        //dados.usuario['usuImagem'] = "https://lh5.googleusercontent.com/-2SJyjwyB0aA/AAAAAAAAAAI/AAAAAAAAAl4/b6LstKRYF1U/s64/photo.jpg";
        //dados.usuario['usuNome'] = "Mateus Zanini";

        $("#usuarioAvatar").attr("src", dados.usuario['usuImagem']);
        $(".facebook-name").html(dados.usuario['usuNome']);
        $(".facebook-date").html(dados.usuario['usuEmail']);

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
        if (dados.oferta['oftValor'] == undefined || dados.oferta['oftValor'] == 0) {
            $("#oftValor").html("Grátis");
        } else {
            $("#oftValor").html("R$ " + dados.oferta['oftValor']);
        }

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

        //ENDEREÇO
        ofertaDetalhes.localizacao = new Localizacao();

        ofertaDetalhes.localizacao.mapCanvas =
            document.getElementById("mapCanvasOferta");

        if (dados.endereco['endLatitude'] && dados.endereco['endLongitude']) {
            ofertaDetalhes.localizacao.divEnderecoAtual =
                document.getElementById("usuLocalizacaoOferta");

            ofertaDetalhes.localizacao.geocodeLatLng({
                lat: dados.endereco['endLatitude'],
                lng: dados.endereco['endLongitude']
            });
        } else {
            var endereco = "";

            endereco += dados.endereco['endLogradouro'] != undefined ? dados.endereco['endLogradouro'] + ", " : "";
            endereco += dados.endereco['endNumero'] != undefined ? dados.endereco['endNumero'] + " - " : "";
            endereco += dados.endereco['endBairro'] != undefined ? dados.endereco['endBairro'] + ", " : "";

            for (var i = 0; i < uf.length; i++) {
                if (uf[i].ufCodigo == dados.endereco['ufCodigo']) {
                    for (var j = 0; j < uf[i].cidades.length; j++) {
                        if (uf[i].cidades[j].cidCodigo == dados.endereco['cidCodigo']) {
                            endereco += uf[i].cidades[j].cidNome + " - " + uf[i].ufSigla + ", ";
                            break;
                        }
                    }
                    break;
                }
            }
            endereco += dados.endereco['endCep'] != undefined ? dados.endereco['endCep'] + ", Brasil" : "";

            $('#usuLocalizacaoOferta').html('<p class="text-center"><i class="fa fa-map-signs" aria-hidden="true"></i>&nbsp ' +
            endereco + '</p>');

            ofertaDetalhes.localizacao.geocodeAddress(endereco);
        }



        ofertaDetalhes.localizacao.initMap();

        $("#mapCanvasOferta").css("pointer-events", "none");
        //ofertaDetalhes.localizacao.mapa.removeListener('click');


        $('#btnReservar').on('click', function() {
            myApp.prompt('Qual quantidade você deseja reservar?', function(value) {
                myScript.notificacao("Sucesso", "Você reservou " + value + " itens!", true);
            });
        });
    });
};
