/* Malaysian initialisation for the jQuery UI date picker plugin. */
/* Written by Mohd Nawawi Mohamad Jamili (nawawi@ronggeng.net). */
(function($) {
	$.ui.datepicker.regional['ms'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
		'Julai','Ogos','September','Oktober','November','Disember'],
		monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
		'Jul','Ogo','Sep','Okt','Nov','Dis'],
		dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
		dayNamesShort: ['Aha','Isn','Sel','Rab','kha','Jum','Sab'],
		dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;Sebelum', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Selepas&#x3e;', nextStatus: '',
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
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ms']);
})(jQuery);
