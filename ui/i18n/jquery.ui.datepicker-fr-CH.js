/* Swiss-French initialisation for the jQuery UI date picker plugin. */
/* Written Martin Voelkle (martin.voelkle@e-tc.ch). */
(function($) {
	$.ui.datepicker.regional['fr-CH'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
		'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
		'Jul','Aoû','Sep','Oct','Nov','Déc'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;Préc', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Suiv&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Courant', currentStatus: '',
		todayText: 'Aujourd\'hui', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Fermer', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Sm', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['fr-CH']);
})(jQuery);
