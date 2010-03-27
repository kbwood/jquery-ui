/* Esperanto initialisation for the jQuery UI date picker plugin. */
/* Written by Olivier M. (olivierweb@ifrance.com). */
(function($) {
	$.ui.datepicker.regional['eo'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januaro','Februaro','Marto','Aprilo','Majo','Junio',
		'Julio','Aŭgusto','Septembro','Oktobro','Novembro','Decembro'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aŭg','Sep','Okt','Nov','Dec'],
		dayNames: ['Dimanĉo','Lundo','Mardo','Merkredo','Ĵaŭdo','Vendredo','Sabato'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Ĵaŭ','Ven','Sab'],
		dayNamesMin: ['Di','Lu','Ma','Me','Ĵa','Ve','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;Anta', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Sekv&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Nuna', currentStatus: '',
		todayText: 'Nuna', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Fermi', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Sb', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['eo']);
})(jQuery);
