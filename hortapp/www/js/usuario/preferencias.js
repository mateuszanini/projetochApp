var preferencias = {
    initialize: function() {
        var storage = window.localStorage;
        $('#usuSalvarPreferencias').click(function() {
            /*var formData = myApp.formToJSON('#usuPreferenciasForm');
            storage.preferencias = JSON.stringify(formData);
            console.log(JSON.stringify(formData));*/
            storage.preferenciasDistancia = $('#usuPreferenciasDistancia').val();
            storage.preferenciasData = $('#usuPreferenciasData').val();
            storage.preferenciasItens = $('#itmCodigoPreferencias').val();

            usuarioController.usuPreferencias();
            /*usuarioController.preferencias["distancia"] = storage.preferenciasDistancia;
            usuarioController.preferencias["dataVencimento"] = storage.preferenciasData;
            usuarioController.preferencias["itens"] = storage.preferenciasItens;*/

            myScript.notificacao("Sucesso", "As preferencias foram salvas.", true);
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
        if (storage.preferenciasDistancia) {
            //myApp.alert("Tem");

            $('#usuPreferenciasDistancia').val(storage.preferenciasDistancia);
            preferencias.valorDistancia();

            $('#usuPreferenciasData').val(storage.preferenciasData);

            var itensStorage = storage.preferenciasItens.split(",");
            var strItem = '';
            var selecionou = false;
            for (var i = 0; i < itens.length; i++) {
                for (var j = 0; j < itensStorage.length; j++) {
                    if (itens[i].itmCodigo == itensStorage[j]) {
                        strItem += '<option value="' + itens[i].itmCodigo + '" selected>' + itens[
                                i].itmNome +
                            '</option>';
                        selecionou = true;
                    }
                }
                if (selecionou == false) {
                    strItem += '<option value="' + itens[i].itmCodigo + '">' + itens[
                            i].itmNome +
                        '</option>';
                }
                selecionou = false;
            }
            $("#itmCodigoPreferencias").html(strItem);

            /*myApp.formFromJSON('#usuPreferenciasForm', storage.preferencias);*/
        } else {
            storage.preferenciasDistancia = 15;
            storage.preferenciasData = "Sexta, 11 de novembro de 2016";

            $('#usuPreferenciasDistancia').val(storage.preferenciasDistancia);
            preferencias.valorDistancia();

            $('#usuPreferenciasData').val(storage.preferenciasData);

            preferencias.listaItens(true);
            storage.preferenciasItens = $('#itmCodigoPreferencias').val();

            usuarioController.usuPreferencias();

            /*var formData = {
                'usuPreferenciasDistancia': 15,
                'usuPreferenciasData': "",
                'itmCodigoPreferencias': stringItens
            }
            myApp.formFromJSON('#usuPreferenciasForm', formData);*/
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
