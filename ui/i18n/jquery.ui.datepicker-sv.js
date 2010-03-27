/* Swedish initialisation for the jQuery UI date picker plugin. */
/* Written by Anders Ekdahl ( anders@nomadiz.se). */
(function($) {
    $.ui.datepicker.regional['sv'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
        'Juli','Augusti','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
		dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		dayNamesMin: ['Sö','Må','Ti','On','To','Fr','Lö'],
		dateFormat: 'yyyy-mm-dd',
		firstDay: 1,
		prevText: '&laquo;Förra', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Nästa&raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Idag', currentStatus: '',
		todayText: 'Idag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Stäng', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Ve', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
    $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['sv']);
})(jQuery);
