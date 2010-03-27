/* Armenian(UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Levon Zakaryan (levon.zakaryan@gmail.com)*/
(function($) {
	$.ui.datepicker.regional['hy'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս',
		'Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'],
		monthNamesShort: ['Հունվ','Փետր','Մարտ','Ապր','Մայիս','Հունիս',
		'Հուլ','Օգս','Սեպ','Հոկ','Նոյ','Դեկ'],
		dayNames: ['կիրակի','եկուշաբթի','երեքշաբթի','չորեքշաբթի','հինգշաբթի','ուրբաթ','շաբաթ'],
		dayNamesShort: ['կիր','երկ','երք','չրք','հնգ','ուրբ','շբթ'],
		dayNamesMin: ['կիր','երկ','երք','չրք','հնգ','ուրբ','շբթ'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;Նախ.', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Հաջ.&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Այսօր', currentStatus: '',
		todayText: 'Այսօր', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Փակել', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'ՇԲՏ', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['hy']);
})(jQuery);
