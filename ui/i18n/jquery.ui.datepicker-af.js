/* Afrikaans initialisation for the jQuery UI date picker plugin. */
/* Written by Renier Pretorius. */
(function($) {
	$.ui.datepicker.regional['af'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
		'Julie','Augustus','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
		dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
		dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: 'Vorige', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Volgende', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Vandag', currentStatus: '',
		todayText: 'Vandag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Selekteer', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['af']);
})(jQuery);
