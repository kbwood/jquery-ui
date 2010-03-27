/* Albanian initialisation for the jQuery UI date picker plugin. */
/* Written by Flakron Bytyqi (flakron@gmail.com). */
(function($) {
	$.ui.datepicker.regional['sq'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
		'Korrik','Gusht','Shtator','Tetor','Nëntor','Dhjetor'],
		monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
		'Kor','Gus','Sht','Tet','Nën','Dhj'],
		dayNames: ['E Diel','E Hënë','E Martë','E Mërkurë','E Enjte','E Premte','E Shtune'],
		dayNamesShort: ['Di','Hë','Ma','Më','En','Pr','Sh'],
		dayNamesMin: ['Di','Hë','Ma','Më','En','Pr','Sh'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;mbrapa', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Përpara&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'sot', currentStatus: '',
		todayText: 'sot', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'mbylle', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Ja', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['sq']);
})(jQuery);
