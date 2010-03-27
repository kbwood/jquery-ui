/* Danish initialisation for the jQuery UI date picker plugin. */
/* Written by Jan Christensen ( deletestuff@gmail.com). */
(function($) {
    $.ui.datepicker.regional['da'] = {
		renderer: $.ui.datepicker.defaultRenderer,
        monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
        'Juli','August','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
		dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
		dayNamesMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
        dateFormat: 'dd-mm-yyyy',
		firstDay: 1,
		prevText: '&#x3c;Forrige', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Næste&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Idag', currentStatus: '',
		todayText: 'Idag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Luk', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Uge', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
    $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['da']);
})(jQuery);
