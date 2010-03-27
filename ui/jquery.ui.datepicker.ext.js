/*
 * jQuery UI Datepicker @VERSION
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/DatepickerExt
 *
 * Depends:
 *	jquery.ui.datepicker.js
 */

(function($) {

$.extend($.ui.datepicker, {

	// Template for generating a calendar picker showing week of year
	weekOfYearRenderer: $.extend({}, $.ui.datepicker.defaultRenderer, {
		weekHeader: '<tr><th class="calendars-week">' +
		'<span title="{l10n:weekStatus}">{l10n:weekText}</span></th>{days}</tr>',
		week: '<tr><td class="calendars-week">{weekOfYear}</td>{days}</tr>'
	}),

	/* Don't allow weekends to be selected.
	   Usage: onDate: $.ui.datepicker.noWeekends.
	   @param  date  (Date) the current date
	   @return  (object) information about this date */
	noWeekends: function(date) {
		return {selectable: (date.getDay() || 7) < 6};
	},

	/* Change the first day of the week by clicking on the day header.
	   Usage: onShow: $.ui.datepicker.changeFirstDay.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  dp      (object) the current instance settings */
	changeFirstDay: function(picker, dp) {
		var target = $(this);
		picker.find('th span').each(function() {
			if (this.parentNode.className.match(/.*ui-datepicker-week.*/)) {
				return;
			}
			$('<a href="javascript:void(0)" class="' + this.className +
					'" title="Change first day of the week">' + $(this).text() + '</a>').
				click(function() {
					var dow = parseInt(this.className.replace(/^.*ui-datepicker-dow-(\d+).*$/, '$1'), 10);
					dp.option({firstDay: dow});
				}).
				replaceAll(this);
		});
	},

	/* Add a callback when hovering over dates.
	   Usage: onShow: $.ui.datepicker.hoverCallback(onHover).
	   @param  onHover  (function) the callback when hovering,
	                    it receives the current date and a flag indicating selectability
	                    as parameters on entry, and no parameters on exit,
	                    this refers to the target input or division */
	hoverCallback: function(onHover) {
		return function(picker, dp) {
			var target = this;
			var renderer = dp._get('renderer');
			picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
				hover(function() {
					onHover.apply(dp.element, [dp.retrieveDate(this),
						this.nodeName.toLowerCase() == 'a']);
				},
				function() { onHover.apply(dp.element, []); });
		};
	},

	/* Highlight the entire week when hovering over it.
	   Usage: onShow: $.ui.datepicker.highlightWeek.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  dp      (object) the current instance settings */
	highlightWeek: function(picker, dp) {
		var target = this;
		var renderer = dp._get('renderer');
		picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
			hover(function() {
				$(this).parents('tr').find(renderer.daySelector + ' *').
					addClass(renderer.highlightedClass);
			},
			function() {
				$(this).parents('tr').find(renderer.daySelector + ' *').
					removeClass(renderer.highlightedClass);
			});
	},

	/* Show a status bar with messages.
	   Usage: onShow: $.ui.datepicker.showStatus.
	   @param  picker  (jQuery) the completed datepicker division
	   @param  dp      (object) the current instance settings */
	showStatus: function(picker, dp) {
		var target = this;
		var renderer = dp._get('renderer');
		var defaultStatus = dp._get('defaultStatus') || '&nbsp;';
		var status = $('<div class="ui-datepicker-status ui-helper-clearfix">' + defaultStatus + '</div>').
			insertAfter(picker.find('.ui-datepicker-row-break:last'));
		picker.find('*[title]').each(function() {
				var title = $(this).attr('title');
				$(this).removeAttr('title').hover(
					function() { status.text(title || defaultStatus); },
					function() { status.text(defaultStatus); });
			});
	}
});

})(jQuery);
