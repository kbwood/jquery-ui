/* Hungarian initialisation for the jQuery UI date picker plugin. */
/* Written by Istvan Karaszi (jquery@spam.raszi.hu). */
(function($) {
	$.ui.datepicker.regional['hu'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
		'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
		'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		dateFormat: 'yyyy-mm-dd',
		firstDay: 1,
		prevText: '&laquo;&nbsp;vissza', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'előre&nbsp;&raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'ma', currentStatus: '',
		todayText: 'ma', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'bezárás', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Hé', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['hu']);
})(jQuery);
