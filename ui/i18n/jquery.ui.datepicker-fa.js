/* Persian (Farsi) Translation for the jQuery UI date picker plugin. */
/* Javad Mowlanezhad -- jmowla@gmail.com */
/* Jalali calendar should supported soon! (Its implemented but I have to test it) */
(function($) {
	$.ui.datepicker.regional['fa'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['فروردين','ارديبهشت','خرداد','تير','مرداد','شهريور',
		'مهر','آبان','آذر','دي','بهمن','اسفند'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['يکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'],
		dayNamesShort: ['ي','د','س','چ','پ','ج', 'ش'],
		dayNamesMin: ['ي','د','س','چ','پ','ج', 'ش'],
		dateFormat: 'yyyy/mm/dd',
		firstDay: 6,
		prevText: '&#x3c;قبلي', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'بعدي&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'امروز', currentStatus: '',
		todayText: 'امروز', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'بستن', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'هف', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: true
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['fa']);
})(jQuery);
