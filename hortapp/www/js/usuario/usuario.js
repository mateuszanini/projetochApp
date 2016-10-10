var usuario = {
    initialize: function() {
        $("#usuLocalizacaoAtual").change(function() {
            usuario.mostraMapa();
        });
        $("#ufCodigo").change(function() {
            usuario.listaCidades();
        });
        $("#usuCep").keyup(function() {
            var cep = $(this).val().replace(/\D/g, '');
            if (cep.length == 8) {
                var validacep = /^[0-9]{8}$/;
                if (validacep.test(cep)) {
                    $.ajax({
                        url: "https://viacep.com.br/ws/" + cep + "/json",
                        method: "GET",
                        beforeSend: function(xhr) {
                            myApp.showIndicator();
                        },
                        success: function(data) {
                            if (!("erro" in data)) {
                                myApp.addNotification({
                                    subtitle: 'Cidade encontrada',
                                    message: 'Você está em ' + data.localidade,
                                    media: '<img width="44" height="44" style="border-radius:100%" src="img/icons/error.png">'
                                });
                            } else {
                                myApp.addNotification({
                                    subtitle: 'CEP não encontrado',
                                    message: 'Por favor, digite um CEP existente.',
                                    media: '<img width="44" height="44" style="border-radius:100%" src="img/icons/error.png">'
                                });
                            }
                        },
                        error: function(data, status, xhr) {
                            myApp.addNotification({
                                subtitle: 'Erro na requisição Ajax',
                                message: 'Tente novamente mais tarde.',
                                media: '<img width="44" height="44" style="border-radius:100%" src="img/icons/error.png">'
                            });
                        },
                        complete: function(xhr, status) {
                            myApp.hideIndicator();
                        }
                    });
                }
            }
        });
    },

    mostraMapa: function() {
        $('.divisor').toggleClass('animated zoomOut');
        $('.divisor').toggleClass('animated zoomIn');
        $('.mapa').toggleClass('hide');
        $('.mapa').toggleClass('animated zoomIn');
        /*if ($("#usuLocalizacaoAtual").is(":checked")) {
        } else {
        }*/
    },

    listaEstados: function() {
        var strUf = '';
        for (var i = 0; i < uf.length; i++) {
            if (uf[i].ufSigla == "SC") {
                strUf += '<option value="' + uf[i].ufCodigo + '" selected>' + uf[i].ufNome + '</option>';
                $("#estadoSelecionado").html(uf[i].ufNome);
            } else {
                strUf += '<option value="' + uf[i].ufCodigo + '">' + uf[i].ufNome + '</option>';
            }
        }
        $("#ufCodigo").html(strUf);

    },

    listaCidades: function() {
        var ufSelecionado = parseInt($("#ufCodigo").val());
        var strCidade = '';
        for (var i = 0; i < uf.length; i++) {
            if (uf[i].ufCodigo == ufSelecionado) {
                for (var j = 0; j < uf[i].cidades.length; j++) {
                    if (j === 0) {
                        strCidade += '<option value="' + uf[i].cidades[j].cidCodigo + '" selected>' + uf[i].cidades[j].cidNome + '</option>';
                        $("#cidadeSelecionada").html(uf[i].cidades[j].cidNome);
                    } else {
                        strCidade += '<option value="' + uf[i].cidades[j].cidCodigo + '">' + uf[i].cidades[j].cidNome + '</option>';
                    }
                }
            }
        }
        $("#cidCodigo").html(strCidade);
    }
};
