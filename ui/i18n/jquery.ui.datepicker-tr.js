/* Turkish initialisation for the jQuery UI date picker plugin. */
/* Written by Izzet Emre Erkan (kara@karalamalar.net). */
(function($) {
	$.ui.datepicker.regional['tr'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
		'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
		monthNamesShort: ['Oca','Şub','Mar','Nis','May','Haz',
		'Tem','Ağu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;geri', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'ileri&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'bugün', currentStatus: '',
		todayText: 'bugün', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'kapat', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Hf', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['tr']);
})(jQuery);
