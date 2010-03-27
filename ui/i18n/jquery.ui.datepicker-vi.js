/* Vietnamese initialisation for the jQuery UI date picker plugin. */
/* Translated by Le Thanh Huy (lthanhhuy@cit.ctu.edu.vn). */
(function($) {
	$.ui.datepicker.regional['vi'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
		'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
		monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
		'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
		dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
		dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;Trước', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Tiếp&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Hôm nay', currentStatus: '',
		todayText: 'Hôm nay', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Đóng', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Tu', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['vi']);
})(jQuery);
