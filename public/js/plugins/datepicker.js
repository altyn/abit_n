$('.datepicker').pickadate({
    selectMonths: true,// Creates a dropdown to control month
    selectYears: 15,// Creates a dropdown of 15 years to control year
// The title label to use for the month nav buttons
    labelMonthNext: 'Próximo Mês',
    labelMonthPrev: 'Mês Anterior',
// The title label to use for the dropdown selectors
    labelMonthSelect: 'Selecione o Mês',
    labelYearSelect: 'Selecione o ano',
// Months and weekdays
    monthsFull: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
    monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    weekdaysFull: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
// Materialize modified
    weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
// Today and clear
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Fechar',
// The format to show on the `input` element
    format: 'd mmmm, yyyy'
});
