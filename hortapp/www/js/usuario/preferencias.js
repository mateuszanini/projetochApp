var preferencias = {
    initialize: function() {
        $('#usuSalvarPreferencias').click(function() {
            storage.preferenciasDistancia = $('#usuPreferenciasDistancia').val();
            storage.preferenciasData = $('#usuPreferenciasData').val();
            storage.preferenciasItens = $('#itmCodigoPreferencias').val();

            usuarioController.usuPreferencias();

            myScript.notificacao("Sucesso", "As preferências foram salvas.", true);
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
            dateFormat: 'dd de MM de yyyy',
            toolbarCloseText: 'Concluído',
            closeOnSelect: true,
            minDate: new Date().setDate(today.getDate() - 1),
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            onDayClick: function(p, dayContainer, year, month, day) {
                storage.preferenciasDataFormatada = day + '/' + (parseInt(month) + 1) + '/' + year;
            }
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
            storage.preferenciasDataFormatada = preferencias.dataPreferencia(0, 7);
            storage.preferenciasData = preferencias.dataPreferencia(1, 7);

            $('#usuPreferenciasDistancia').val(storage.preferenciasDistancia);
            preferencias.valorDistancia();

            $('#usuPreferenciasData').val(storage.preferenciasData);

            preferencias.listaItens(true);
            storage.preferenciasItens = $('#itmCodigoPreferencias').val();

            usuarioController.usuPreferencias();
        }
    },

    dataPreferencia: function(tipo, diasMais) {
        var currentTime = new Date()
        var dia = currentTime.getDate() + diasMais;
        var mes = currentTime.getMonth();
        var ano = currentTime.getFullYear();
        var Mes = currentTime.getUTCMonth();

        var arrayMes = new Array();
        arrayMes[0] = "Janeiro";
        arrayMes[1] = "Fevereiro";
        arrayMes[2] = "Março";
        arrayMes[3] = "Abril";
        arrayMes[4] = "Maio";
        arrayMes[5] = "Junho";
        arrayMes[6] = "Julho";
        arrayMes[7] = "Agosto";
        arrayMes[8] = "Setembro";
        arrayMes[9] = "Outubro";
        arrayMes[10] = "Novembro";
        arrayMes[11] = "Dezembro";

        if (tipo == 0) {
            return (dia + "/" + (mes + 1) + "/" + ano);
        } else {
            return (dia + " de " + arrayMes[Mes] + " de " + ano);
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
