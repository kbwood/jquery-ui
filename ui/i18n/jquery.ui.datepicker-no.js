/* Norwegian initialisation for the jQuery UI date picker plugin. */
/* Written by Naimdjon Takhirov (naimdjon@gmail.com). */
(function($) {
    $.ui.datepicker.regional['no'] = {
		renderer: $.ui.datepicker.defaultRenderer,
        monthNames: ['Januar','Februar','Mars','April','Mai','Juni',
        'Juli','August','September','Oktober','November','Desember'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jun',
        'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
		dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
		dayNamesMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
        dateFormat: 'yyyy-mm-dd',
		firstDay: 0,
		prevText: '&laquo;Forrige', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Neste&raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'I dag', currentStatus: '',
		todayText: 'I dag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Lukk', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Uke', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
    $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['no']);
})(jQuery);
