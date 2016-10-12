var usuario = {
    initialize: function() {
        $("#usuLocalizacaoAtual").change(function() {
            usuario.mostraMapa();
        });
        $("#ufCodigo").change(function() {
            usuario.listaCidades(0);
        });
        $("#usuCep").keyup(function() {
            var cep = $(this).val().replace(/\D/g, '');
            if (cep.length == 8) {
                var validacep = /^[0-9]{8}$/;
                if (validacep.test(cep)) {
                    usuario.pesquisaCep(cep, "manual");
                }
            }
        });
        $("#btnPesquisarLocalizacao").click(function() {
            myApp.prompt('Digite uma localização para pesquisar', function(value) {
                localizacao.geocodeAddress(value);
            });
        });
        $("#usuSalvar").click(function() {
            var formData = myApp.formToJSON('#usuFormulario');
            alert(JSON.stringify(formData));
        });
    },

    pesquisaCep: function(cep, tipo) {
        $.ajax({
            url: "https://viacep.com.br/ws/" + cep + "/json",
            method: "GET",
            beforeSend: function(xhr) {
                myApp.showIndicator();
            },
            success: function(data) {
                if (!("erro" in data)) {
                    if (tipo == "manual") {
                        myScript.notificacao("Cidade encontrada", "Você está em " + data.localidade + " - " + data.uf, true);
                        $("#endBairro").val(data.bairro);
                        $("#endLogradouro").val(data.logradouro);
                    }
                    usuario.listaEstados(data.uf);
                    usuario.listaCidades(data.ibge);
                } else {
                    myScript.notificacao("CEP não encontrado", "Por favor, digite um CEP existente.", false);
                }
            },
            error: function(data, status, xhr) {
                myScript.notificacao("Erro desconhecido", "Tente novamente mais tarde", false);
            },
            complete: function(xhr, status) {
                myApp.hideIndicator();
            }
        });
    },

    mostraMapa: function() {
        $('.divisor').toggleClass('animated zoomOut');
        $('.divisor').toggleClass('animated zoomIn');
        $('.mapa').toggleClass('hide');
        $('.mapa').toggleClass('animated zoomIn');
        if ($("#usuLocalizacaoAtual").is(":checked")) {
            mainView.hideToolbar();
            localizacao.initMap(document.getElementById("mapCanvas"));
        } else {
            localizacao.mapa = null;
            mainView.showToolbar();
        }
        /*
        results[0].formatted_address: "275-291 Bedford Ave, Brooklyn, NY 11211, USA",
        results[1].formatted_address: "Williamsburg, NY, USA",
        results[2].formatted_address: "New York 11211, USA",
        results[3].formatted_address: "Kings, New York, USA",
        results[4].formatted_address: "Brooklyn, New York, USA",
        results[5].formatted_address: "New York, New York, USA",
        results[6].formatted_address: "New York, USA",
        results[7].formatted_address: "United States"
        */
    },

    listaEstados: function(ufSigla) {
        var strUf = '';
        for (var i = 0; i < uf.length; i++) {
            if (uf[i].ufSigla == ufSigla) {
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
                    if (cidCodigo === 0 && j === 0) {
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
