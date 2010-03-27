/* Arabic Translation for jQuery UI date picker plugin. */
/* Khaled Al Horani -- koko.dw@gmail.com */
/* خالد الحوراني -- koko.dw@gmail.com */
/* NOTE: monthNames are the original months names and they are the Arabic names, not the new months name فبراير - يناير and there isn't any Arabic roots for these months */
(function($) {
	$.ui.datepicker.regional['ar'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'آذار', 'حزيران',
		'تموز', 'آب', 'أيلول',	'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
		dayNamesShort: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'],
		dayNamesMin: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;السابق', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'التالي&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'اليوم', currentStatus: '',
		todayText: 'اليوم', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'إغلاق', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'أسبوع', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
  		isRTL: true
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ar']);
})(jQuery);
