/* Azerbaijani (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Jamil Najafov (necefov33@gmail.com). */
(function($) {
	$.ui.datepicker.regional['az'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','İyun',
		'İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','İyun',
		'İyul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'],
		dayNamesShort: ['B','Be','Ça','Ç','Ca','C','Ş'],
		dayNamesMin: ['B','B','Ç','С','Ç','C','Ş'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		prevText: '&#x3c;Geri', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'İrəli&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Bugün', currentStatus: '',
		todayText: 'Bugün', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Bağla', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Hf', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['az']);
})(jQuery);
