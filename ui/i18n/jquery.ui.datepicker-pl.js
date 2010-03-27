/* Polish initialisation for the jQuery UI date picker plugin. */
/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */
(function($) {
	$.ui.datepicker.regional['pl'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
		'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
		monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		'Lip','Sie','Wrz','Pa','Lis','Gru'],
		dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
		dayNamesShort: ['Nie','Pn','Wt','Śr','Czw','Pt','So'],
		dayNamesMin: ['N','Pn','Wt','Śr','Cz','Pt','So'],
		dateFormat: 'yyyy-mm-dd',
		firstDay: 1,
		prevText: '&#x3c;Poprzedni', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Następny&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Dziś', currentStatus: '',
		todayText: 'Dziś', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Zamknij', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Tydz', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['pl']);
})(jQuery);
