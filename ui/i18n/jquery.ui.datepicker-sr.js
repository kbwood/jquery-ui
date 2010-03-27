/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimić. */
(function($) {
	$.ui.datepicker.regional['sr'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Јануар','Фебруар','Март','Април','Мај','Јун',
		'Јул','Август','Септембар','Октобар','Новембар','Децембар'],
		monthNamesShort: ['Јан','Феб','Мар','Апр','Мај','Јун',
		'Јул','Авг','Сеп','Окт','Нов','Дец'],
		dayNames: ['Недеља','Понедељак','Уторак','Среда','Четвртак','Петак','Субота'],
		dayNamesShort: ['Нед','Пон','Уто','Сре','Чет','Пет','Суб'],
		dayNamesMin: ['Не','По','Ут','Ср','Че','Пе','Су'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: '&#x3c;', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: '&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Данас', currentStatus: '',
		todayText: 'Данас', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Затвори', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Сед', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['sr']);
})(jQuery);
