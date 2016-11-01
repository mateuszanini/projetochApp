$('#usuSalvarPreferencias').click(function() {
    var formData = myApp.formToJSON('#usuPreferenciasForm');
    console.log(JSON.stringify(formData));
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


var preferencias = {
    initialize: function() {
        preferencias.valorDistancia();
    },
    valorDistancia: function() {
        var distancia = parseFloat($("#usuPreferenciasDistancia").val());
        $("#distancia").html(distancia.toFixed(1) + " Km");
    },

}

preferencias.initialize();
