/* Inicialització en català per a l'extenció 'calendar' per jQuery. */
/* Writers: (joan.leon@gmail.com). */
(function($) {
	$.ui.datepicker.regional['ca'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Gener','Febrer','Mar&ccedil;','Abril','Maig','Juny',
		'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
		monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Oct','Nov','Des'],
		dayNames: ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'],
		dayNamesShort: ['Dug','Dln','Dmt','Dmc','Djs','Dvn','Dsb'],
		dayNamesMin: ['Dg','Dl','Dt','Dc','Dj','Dv','Ds'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: '&#x3c;Ant', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Seg&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Avui', currentStatus: '',
		todayText: 'Avui', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Tancar', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Sm', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['ca']);
})(jQuery);
