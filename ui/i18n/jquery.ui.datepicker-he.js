/* Hebrew initialisation for the jQuery UI date picker plugin. */
/* Written by Amir Hardon (ahardon at gmail dot com). */
(function($) {
	$.ui.datepicker.regional['he'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני',
		'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],
		dayNamesShort: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
		dayNamesMin: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;הקודם', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'הבא&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'היום', currentStatus: '',
		todayText: 'היום', todayStatus: '',
		clearText: 'נקה', clearStatus: '',
		closeText: 'סגור', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD, M d',
		defaultStatus: '',
		isRTL: true
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['he']);
})(jQuery);
