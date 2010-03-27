/* Faroese initialisation for the jQuery UI date picker plugin */
/* Written by Sverri Mohr Olsen, sverrimo@gmail.com */
(function($) {
	$.ui.datepicker.regional['fo'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januar','Februar','Mars','Apríl','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','Mánadagur','Týsdagur','Mikudagur','Hósdagur','Fríggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','Mán','Týs','Mik','Hós','Frí','Ley'],
		dayNamesMin: ['Su','Má','Tý','Mi','Hó','Fr','Le'],
		dateFormat: 'dd-mm-yyyy',
		firstDay: 0,
		prevText: '&#x3c;Fyrra', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Næsta&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Í dag', currentStatus: '',
		todayText: 'Í dag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Lat aftur', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Vk', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['fo']);
})(jQuery);
