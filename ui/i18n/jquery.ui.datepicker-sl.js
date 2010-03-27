/* Slovenian initialisation for the jQuery UI date picker plugin. */
/* Written by Jaka Jancar (jaka@kubje.org). */
/* c = &#x10D;, s = &#x161; z = &#x17E; C = &#x10C; S = &#x160; Z = &#x17D; */
(function($) {
	$.ui.datepicker.regional['sl'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januar','Februar','Marec','April','Maj','Junij',
		'Julij','Avgust','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljek','Torek','Sreda','&#x10C;etrtek','Petek','Sobota'],
		dayNamesShort: ['Ned','Pon','Tor','Sre','&#x10C;et','Pet','Sob'],
		dayNamesMin: ['Ne','Po','To','Sr','&#x10C;e','Pe','So'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&lt;Prej&#x161;nji', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Naslednji&gt;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Trenutni', currentStatus: '',
		todayText: 'Trenutni', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Zapri', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Teden', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['sl']);
})(jQuery);
