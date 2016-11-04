var preferencias = {
    initialize: function() {
        var storage = window.localStorage;
        $('#usuSalvarPreferencias').click(function() {
            var formData = myApp.formToJSON('#usuPreferenciasForm');
            storage.preferencias = JSON.stringify(formData);
            console.log(JSON.stringify(formData));
        });
        //seleciona todos os itens
        $('#btnPreferenciasSelecionar').click(function() {
            preferencias.listaItens(true);
            myScript.notificacao("Sucesso", "Todos os itens foram selecionados!", true);
        });
        //desmarca todos os itens
        $('#btnPreferenciasDesmarcar').click(function() {
            preferencias.listaItens(false);
            myScript.notificacao("Sucesso", "Todos os itens foram desmarcados!", true);
        });

        var today = new Date();

        var calendarDateFormat = myApp.calendar({
            input: '#usuPreferenciasData',
            dateFormat: 'DD, dd de MM de yyyy',
            toolbarCloseText: 'Concluído',
            closeOnSelect: true,
            minDate: new Date().setDate(today.getDate() - 1),
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
        });

        $("#usuPreferenciasDistancia").on("input change", function() {
            preferencias.valorDistancia();
        });

        preferencias.valorDistancia();
        preferencias.listaItens(false);

        /*LOCAL STORAGE*/
        if (storage.preferencias) {
            myApp.alert("Tem");
            myApp.formFromJSON('#usuPreferenciasForm', storage.preferencias);
        } else {
            var stringItens = '[';
            for (var i = 0; i < itens.length; i++) {
                if (i == itens.length - 1) {
                    stringItens += '"' + (i + 1) + '"';
                } else {
                    stringItens += '"' + (i + 1) + '", ';
                }
            }
            stringItens += ']';
            var formData = {
                'usuPreferenciasDistancia': 15,
                'usuPreferenciasData': "",
                'itmCodigoPreferencias': stringItens
            }
            myApp.formFromJSON('#usuPreferenciasForm', formData);
        }
    },
    valorDistancia: function() {
        var distancia = parseFloat($("#usuPreferenciasDistancia").val());
        $("#distancia").html(distancia.toFixed(1) + " Km");
    },
    listaItens: function(selecionado) {
        var strItem = '';
        for (var i = 0; i < itens.length; i++) {
            if (selecionado == false) {
                strItem += '<option value="' + itens[i].itmCodigo + '">' + itens[
                        i].itmNome +
                    '</option>';
            } else if (selecionado == true) {
                strItem += '<option value="' + itens[i].itmCodigo + '" selected>' + itens[
                        i].itmNome +
                    '</option>';
            }

        }
        $("#itmCodigoPreferencias").html(strItem);
    }
}
