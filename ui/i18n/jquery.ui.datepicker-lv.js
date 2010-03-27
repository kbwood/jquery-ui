/* Latvian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas.paleicikas@metasite.net> */
(function($) {
	$.ui.datepicker.regional['lv'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Janvāris','Februāris','Marts','Aprīlis','Maijs','Jūnijs',
		'Jūlijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jūn',
		'Jūl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['svētdiena','pirmdiena','otrdiena','trešdiena','ceturtdiena','piektdiena','sestdiena'],
		dayNamesShort: ['svt','prm','otr','tre','ctr','pkt','sst'],
		dayNamesMin: ['Sv','Pr','Ot','Tr','Ct','Pk','Ss'],
		dateFormat: 'dd-mm-yyyy',
		firstDay: 1,
		prevText: 'Iepr', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Nāka', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Šodien', currentStatus: '',
		todayText: 'Šodien', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Aizvērt', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Nav', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['lv']);
})(jQuery);
