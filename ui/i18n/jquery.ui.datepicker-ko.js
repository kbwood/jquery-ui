/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
(function($) {
	$.ui.datepicker.regional['ko'] = {
		renderer: $.extend({}, $.ui.datepicker.defaultRenderer,
			{month: $.ui.datepicker.defaultRenderer.month.
				replace(/monthHeader:M yyyy/, 'monthHeader:M yyyy년')}),
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dateFormat: 'yyyy-mm-dd',
		firstDay: 0,
		prevText: '이전달', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: '다음달', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: '오늘', currentStatus: '',
		todayText: '오늘', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: '닫기', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ko']);
})(jQuery);
