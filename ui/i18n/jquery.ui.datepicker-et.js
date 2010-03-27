/* Estonian initialisation for the jQuery UI date picker plugin. */
/* Written by Mart Sõmermaa (mrts.pydev at gmail com). */
(function($) {
	$.ui.datepicker.regional['et'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Jaanuar','Veebruar','Märts','Aprill','Mai','Juuni',
		'Juuli','August','September','Oktoober','November','Detsember'],
		monthNamesShort: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni',
		'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		dayNames: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
		dayNamesShort: ['Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
		dayNamesMin: ['P','E','T','K','N','R','L'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: 'Eelnev', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Järgnev', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Täna', currentStatus: '',
		todayText: 'Täna', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Sulge', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Sm', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['et']);
})(jQuery);
