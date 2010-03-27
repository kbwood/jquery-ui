/* Dutch (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Mathias Bynens <http://mathiasbynens.be/> */
(function($) {
	$.ui.datepicker.regional.nl = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
		'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
		monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun',
		'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
		dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: '←', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: '→', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Vandaag', currentStatus: '',
		todayText: 'Vandaag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Sluiten', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional.nl);
})(jQuery);
