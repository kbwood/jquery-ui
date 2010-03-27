/* Greek (el) initialisation for the jQuery UI date picker plugin. */
/* Written by Alex Cicovic (http://www.alexcicovic.com) */
(function($) {
	$.ui.datepicker.regional['el'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος',
		'Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'],
		monthNamesShort: ['Ιαν','Φεβ','Μαρ','Απρ','Μαι','Ιουν',
		'Ιουλ','Αυγ','Σεπ','Οκτ','Νοε','Δεκ'],
		dayNames: ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο'],
		dayNamesShort: ['Κυρ','Δευ','Τρι','Τετ','Πεμ','Παρ','Σαβ'],
		dayNamesMin: ['Κυ','Δε','Τρ','Τε','Πε','Πα','Σα'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: 'Προηγούμενος', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Επόμενος', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Τρέχων Μήνας', currentStatus: '',
		todayText: 'Τρέχων Μήνας', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Κλείσιμο', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Εβδ', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['el']);
})(jQuery);
