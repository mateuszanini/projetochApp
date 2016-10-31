$('#usuSalvarPreferencias').click(function() {
    myApp.alert("Preferências salvas!");
});

var today = new Date();

var calendarDateFormat = myApp.calendar({
    input: '#usuPreferenciasData',
    dateFormat: 'DD, dd de MM de yyyy',
    toolbarCloseText: 'Concluído',
    minDate: new Date().setDate(today.getDate() - 1),
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
});
