/* Romanian initialisation for the jQuery UI date picker plugin. */
/* Written by Edmond L. (ll_edmond@walla.com) and Ionut G. Stan (ionut.g.stan@gmail.com) */
(function($) {
	$.ui.datepicker.regional['ro'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Duminică', 'Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','Sâ'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&laquo; Luna precedentă', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Luna următoare &raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Azi', currentStatus: '',
		todayText: 'Azi', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Închide', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Săpt', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ro']);
})(jQuery);
