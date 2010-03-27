/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
(function($) {
	$.ui.datepicker.regional['pt-BR'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		prevText: '&#x3c;Anterior', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Pr&oacute;ximo&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Hoje', currentStatus: '',
		todayText: 'Hoje', todayStatus: '',
		clearText: '-', clearStatus: '',
		closeText: 'Fechar', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Sm', weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['pt-BR']);
})(jQuery);
