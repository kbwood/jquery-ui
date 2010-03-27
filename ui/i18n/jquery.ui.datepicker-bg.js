/* Bulgarian initialisation for the jQuery UI date picker plugin. */
/* Written by Stoyan Kyosev (http://svest.org). */
(function($) {
    $.ui.datepicker.regional['bg'] = {
		renderer: $.ui.datepicker.defaultRenderer,
        monthNames: ['Януари','Февруари','Март','Април','Май','Юни',
        'Юли','Август','Септември','Октомври','Ноември','Декември'],
        monthNamesShort: ['Яну','Фев','Мар','Апр','Май','Юни',
        'Юли','Авг','Сеп','Окт','Нов','Дек'],
        dayNames: ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота'],
        dayNamesShort: ['Нед','Пон','Вто','Сря','Чет','Пет','Съб'],
        dayNamesMin: ['Не','По','Вт','Ср','Че','Пе','Съ'],
        dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;назад', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'напред&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'днес', currentStatus: '',
		todayText: 'днес', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'затвори', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
        isRTL: false
	};
    $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['bg']);
})(jQuery);
