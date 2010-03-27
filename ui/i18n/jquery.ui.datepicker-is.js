/* Icelandic initialisation for the jQuery UI date picker plugin. */
/* Written by Haukur H. Thorsson (haukur@eskill.is). */
(function($) {
	$.ui.datepicker.regional['is'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Jan&uacute;ar','Febr&uacute;ar','Mars','Apr&iacute;l','Ma&iacute','J&uacute;n&iacute;',
		'J&uacute;l&iacute;','&Aacute;g&uacute;st','September','Okt&oacute;ber','N&oacute;vember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Ma&iacute;','J&uacute;n',
		'J&uacute;l','&Aacute;g&uacute;','Sep','Okt','N&oacute;v','Des'],
		dayNames: ['Sunnudagur','M&aacute;nudagur','&THORN;ri&eth;judagur','Mi&eth;vikudagur','Fimmtudagur','F&ouml;studagur','Laugardagur'],
		dayNamesShort: ['Sun','M&aacute;n','&THORN;ri','Mi&eth;','Fim','F&ouml;s','Lau'],
		dayNamesMin: ['Su','M&aacute;','&THORN;r','Mi','Fi','F&ouml;','La'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c; Fyrri', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'N&aelig;sti &#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: '&Iacute; dag', currentStatus: '',
		todayText: '&Iacute; dag', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Loka', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Vika', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['is']);
})(jQuery);
