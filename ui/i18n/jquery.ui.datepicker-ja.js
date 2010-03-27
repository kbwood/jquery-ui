/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
(function($) {
	$.ui.datepicker.regional['ja'] = {
		renderer: $.extend({}, $.ui.datepicker.defaultRenderer,
			{month: $.ui.datepicker.defaultRenderer.month.
				replace(/monthHeader:M yyyy/, 'monthHeader:yyyy年 M')}),
		monthNames: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		dayNamesShort: ['日','月','火','水','木','金','土'],
		dayNamesMin: ['日','月','火','水','木','金','土'],
		dateFormat: 'yyyy/mm/dd',
		firstDay: 0,
		prevText: '&#x3c;前', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: '次&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: '今日', currentStatus: '',
		todayText: '今日', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: '閉じる', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: '週', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ja']);
})(jQuery);
