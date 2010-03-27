/* Indonesian initialisation for the jQuery UI date picker plugin. */
/* Written by Deden Fathurahman (dedenf@gmail.com). */
(function($) {
	$.ui.datepicker.regional['id'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januari','Februari','Maret','April','Mei','Juni',
		'Juli','Agustus','September','Oktober','Nopember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Agus','Sep','Okt','Nop','Des'],
		dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
		dayNamesShort: ['Min','Sen','Sel','Rab','kam','Jum','Sab'],
		dayNamesMin: ['Mg','Sn','Sl','Rb','Km','jm','Sb'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;mundur', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'maju&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'hari ini', currentStatus: '',
		todayText: 'hari ini', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Tutup', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Mg', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['id']);
})(jQuery);
