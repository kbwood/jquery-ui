/*
 * jQuery UI Datepicker @VERSION
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */

(function($) {

var popupClass = '-popup'; // Marker for popup division
var triggerClass = '-trigger'; // Marker for trigger element
var disabledClass = '-disabled'; // Marker for disabled element
var coverClass = '-cover'; // Marker for iframe backing element
var monthYearClass = '-month-year'; // Marker for month/year inputs
var curMonthClass = '-month-'; // Marker for current month/year
var anyYearClass = '-any-year'; // Marker for year direct input
var curDoWClass = '-dow-'; // Marker for day of week

var curDP = null; // The current datepicker instance showing

var ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
	Math.floor(1970 / 400)) * 24 * 60 * 60 * 1000 * 10000);

var defaultRenderer = { // Default template for generating a calendar picker
	// Anywhere: '{l10n:name}' to insert localised value for name,
	// '{link:name}' to insert a link trigger for command name,
	// '{button:name}' to insert a button trigger for command name,
	// '{popup:start}...{popup:end}' to mark a section for inclusion in a popup datepicker only,
	// '{inline:start}...{inline:end}' to mark a section for inclusion in an inline datepicker only
	// Overall structure: '{months}' to insert calendar months
	picker: '<div{popup:start} id="ui-datepicker-div"{popup:end} class="ui-datepicker ui-widget ' +
	'ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">' +
	'{link:prev}{link:next}{months}<div class="ui-helper-clearfix"></div></div>',
	// One row of months: '{months}' to insert calendar months
	monthRow: '<div class="ui-datepicker-row-break">{months}</div>',
	// A single month: '{monthHeader:dateFormat}' to insert the month header -
	// dateFormat is optional and defaults to 'M yyyy',
	// '{weekHeader}' to insert a week header, '{weeks}' to insert the month's weeks
	month: '<div class="ui-datepicker-group"><div class="ui-datepicker-header ' +
	'ui-widget-header ui-helper-clearfix ui-corner-all">{monthHeader:M yyyy}</div>' +
	'<table class="ui-datepicker-calendar"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
	// A week header: '{days}' to insert individual day names
	weekHeader: '<tr>{days}</tr>',
	// Individual day header: '{day}' to insert day name
	dayHeader: '<th>{day}</th>',
	// One week of the month: '{days}' to insert the week's days, '{weekOfYear}' to insert week of year
	week: '<tr>{days}</tr>',
	// An individual day: '{day}' to insert day value
	day: '<td>{day}</td>',
	// jQuery selector, relative to picker, for a single month
	monthSelector: '.ui-datepicker-group',
	// jQuery selector, relative to picker, for individual days
	daySelector: 'td',
	// Class for right-to-left (RTL) languages
	rtlClass: 'ui-datepicker-rtl',
	// Class for multi-month datepickers
	multiClass: 'ui-datepicker-multi',
	// Class for selectable dates
	defaultClass: 'ui-state-default',
	// Class for currently selected dates
	selectedClass: 'ui-state-active',
	// Class for highlighted dates
	highlightedClass: 'ui-state-hover',
	// Class for today
	todayClass: 'ui-state-highlight',
	// Class for days from other months
	otherMonthClass: 'ui-datepicker-other-month',
	// Class for days on weekends
	weekendClass: 'ui-datepicker-week-end',
	// Class prefix for commands
	commandClass: 'ui-datepicker-cmd',
	// Extra class(es) for commands that are buttons
	commandButtonClass: 'ui-state-default ui-corner-all',
	// Extra class(es) for commands that are links
	commandLinkClass: 'ui-icon',
	// Class for disabled commands
	disabledClass: 'ui-datepicker-disabled'
};

// Template to include today and close buttons at the bottom
var buttonsRenderer = $.extend({}, defaultRenderer, {
	picker: defaultRenderer.picker.replace(/\{months\}/,
	'{months}<div class="ui-datepicker-buttonpane ui-widget-content">' +
	'{button:today}{popup:start}{button:close}{popup:end}</div>')
});

var defaultCommands = { // Command actions that may be added to a layout by name
	// name: { // The command name, use '{button:name}' or '{link:name}' in layouts
	//		text: '', // The field in the regional settings for the displayed text
	//		status: '', // The field in the regional settings for the status text
	//      // The keystroke to trigger the action
	//		keystroke: {keyCode: nn, ctrlKey: boolean, altKey: boolean, shiftKey: boolean},
	//		enabled: fn, // The function that indicates the command is enabled
	//		date: fn, // The function to get the date associated with this action
	//		action: fn} // The function that implements the action
	prev: {text: 'prevText', status: 'prevStatus', // Previous month
		keystroke: {keyCode: $.ui.keyCode.PAGE_UP},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				-dp._get('monthsOffset'), 'm');
			curDate.setDate(0);
			return (!minDate || curDate.getTime() >= minDate.getTime()); },
		date: function(dp) {
			var minDate = dp._get('minDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				0 - dp._get('monthsToStep') - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (minDate && minDate.getTime() > curDate.getTime() ? minDate : curDate); },
		action: function(dp) { dp.changeMonth(-dp._get('monthsToStep')); }
	},
	prevJump: {text: 'prevJumpText', status: 'prevJumpStatus', // Previous year
		keystroke: {keyCode: $.ui.keyCode.PAGE_UP, ctrlKey: true},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				-dp._get('monthsOffset'), 'm');
			curDate.setDate(0);
			return (!minDate || curDate.getTime() >= minDate.getTime()); },
		date: function(dp) {
			var minDate = dp._get('minDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				0 - dp._get('monthsToJump') - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (minDate && minDate.getTime() > curDate.getTime() ? minDate : curDate); },
		action: function(dp) { dp.changeMonth(-dp._get('monthsToJump')); }
	},
	next: {text: 'nextText', status: 'nextStatus', // Next month
		keystroke: {keyCode: $.ui.keyCode.PAGE_DOWN},
		enabled: function(dp) {
			var maxDate = dp._get('maxDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				1 - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (!maxDate || curDate.getTime() <= maxDate.getTime()); },
		date: function(dp) {
			var maxDate = dp._get('maxDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				dp._get('monthsToStep') - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (maxDate && maxDate.getTime() < curDate.getTime() ? maxDate : curDate); },
		action: function(dp) { dp.changeMonth(dp._get('monthsToStep')); }
	},
	nextJump: {text: 'nextJumpText', status: 'nextJumpStatus', // Next year
		keystroke: {keyCode: $.ui.keyCode.PAGE_DOWN, ctrlKey: true},
		enabled: function(dp) {
			var maxDate = dp._get('maxDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				1 - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (!maxDate || curDate.getTime() <= maxDate.getTime()); },
		date: function(dp) {
			var maxDate = dp._get('maxDate');
			var curDate = $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate),
				dp._get('monthsToJump') - dp._get('monthsOffset'), 'm');
			curDate.setDate(1);
			return (maxDate && maxDate.getTime() < curDate.getTime() ? maxDate : curDate); },
		action: function(dp) { dp.changeMonth(dp._get('monthsToJump')); }
	},
	today: {text: 'todayText', status: 'todayStatus', // Today's month
		keystroke: {keyCode: $.ui.keyCode.HOME, ctrlKey: true},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			var maxDate = dp._get('maxDate');
			var curDate = $.ui.datepicker.newDate();
			return (!minDate || curDate.getTime() >= minDate.getTime()) &&
				(!maxDate || curDate.getTime() <= maxDate.getTime()); },
		date: function(dp) { return $.ui.datepicker.newDate(); },
		action: function(dp) {
			var today = new Date();
			dp.showMonth(today.getFullYear(), today.getMonth() + 1, today.getDate()); }
	},
	current: {text: 'currentText', status: 'currentStatus', // Current month
		keystroke: {keyCode: $.ui.keyCode.HOME, ctrlKey: true},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			var maxDate = dp._get('maxDate');
			var curDate = dp._selectedDate || $.ui.datepicker.newDate();
			return (!minDate || curDate.getTime() >= minDate.getTime()) &&
				(!maxDate || curDate.getTime() <= maxDate.getTime()); },
		date: function(dp) { return dp._selectedDate || $.ui.datepicker.newDate(); },
		action: function(dp) {
			var curDate = dp._selectedDate || $.ui.datepicker.newDate();
			dp.showMonth(curDate.getFullYear(), curDate.getMonth() + 1); }
	},
	clear: {text: 'clearText', status: 'clearStatus', // Clear the datepicker
		keystroke: {keyCode: $.ui.keyCode.END, ctrlKey: true},
		enabled: function(dp) { return true; },
		date: function(dp) { return null; },
		action: function(dp) { dp.clear(); }
	},
	close: {text: 'closeText', status: 'closeStatus', // Close the datepicker
		keystroke: {keyCode: $.ui.keyCode.ESCAPE},
		enabled: function(dp) { return true; },
		date: function(dp) { return null; },
		action: function(dp) { dp.hide(); }
	},
	prevWeek: {text: 'prevWeekText', status: 'prevWeekStatus', // Previous week
		keystroke: {keyCode: $.ui.keyCode.UP, ctrlKey: true},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			return (!minDate || $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), -7, 'd').
				getTime() >= minDate.getTime()); },
		date: function(dp) { return $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), -7, 'd'); },
		action: function(dp) { dp.changeDay(-7); }
	},
	prevDay: {text: 'prevDayText', status: 'prevDayStatus', // Previous day
		keystroke: {keyCode: $.ui.keyCode.LEFT, ctrlKey: true},
		enabled: function(dp) {
			var minDate = dp._get('minDate');
			return (!minDate || $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), -1, 'd').
				getTime() >= minDate.getTime()); },
		date: function(dp) { return $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), -1, 'd'); },
		action: function(dp) { dp.changeDay(-1); }
	},
	nextDay: {text: 'nextDayText', status: 'nextDayStatus', // Next day
		keystroke: {keyCode: $.ui.keyCode.RIGHT, ctrlKey: true},
		enabled: function(dp) {
			var maxDate = dp._get('maxDate');
			return (!maxDate || $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), +1, 'd').
				getTime() <= maxDate.getTime()); },
		date: function(dp) { return $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), +1, 'd'); },
		action: function(dp) { dp.changeDay(+1); }
	},
	nextWeek: {text: 'nextWeekText', status: 'nextWeekStatus', // Next week
		keystroke: {keyCode: $.ui.keyCode.DOWN, ctrlKey: true},
		enabled: function(dp) {
			var maxDate = dp._get('maxDate');
			return (!maxDate || $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), +7, 'd').
				getTime() <= maxDate.getTime()); },
		date: function(dp) { return $.ui.datepicker.add($.ui.datepicker.newDate(dp._drawDate), +7, 'd'); },
		action: function(dp) { dp.changeDay(+7); }
	}
};

$.widget('ui.datepicker', {
	_init: function() {
		if (this.element.hasClass(this.widgetBaseClass)) {
			return;
		}
		this.element.addClass(this.widgetBaseClass);
		this._selectedDate = null;
		this._drawDate = null;
		this._inline = $.inArray(this.element[0].nodeName.toLowerCase(), ['div', 'span']) > -1;
		if (this._inline) {
			this._update();
		}
		else {
			this._attachments();
			this.element.bind('keydown.' + this.widgetName, this._keyDown).
				bind('keypress.' + this.widgetName, this._keyPress).
				bind('keyup.' + this.widgetName, this._keyUp);
		}
	},

	destroy: function() {
		if (!this.element.hasClass(this.widgetBaseClass)) {
			return;
		}
		if (curDP == this) {
			this.hide();
		}
		if (this._button) {
			this._button.remove();
		}
		if (this._get('autoSize') && !this._inline) {
			this.element.removeAttr('size');
		}
		this.element.removeClass(this.widgetBaseClass + ' ' + this.widgetBaseClass +
				disabledClass + ' ' + this.namespace + '-state-disabled').
			removeAttr('aria-disabled').
			removeData(this.widgetName).
			unbind('.' + this.widgetName).
			empty();
		return this;
	},

	/* Retrieve current option value, computing date values if necessary.
	   @param  key  (string) the option name
	   @return  (any) the option value */
	_get: function(key) {
		var value = (this.options[key] != null ? this.options[key] : $.ui.datepicker.defaults[key]);
		if (key == 'defaultDate' || key == 'minDate' || key == 'maxDate') {
			value = $.ui.datepicker.determineDate(value, null, this._selectedDate,
				this._get('dateFormat'), this._getDateSettings());
		}
		return value;
	},	

	/* Refresh the datepicker when values are updated.
	   @param  key    (string) the option name
	   @param  value  (any) the new value */
	_setOption: function(key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		this._drawDate = this._checkMinMax(this._drawDate);
		this._selectedDate = this._checkMinMax(this._extractDate(this.element.val()));
		if (!this._inline) {
			this._attachments();
		}
		this._update();
	},	

	/* Attach events and trigger, if necessary. */
	_attachments: function() {
		this.element.unbind('focus.' + this.widgetName);
		if (this._get('showOnFocus')) {
			this.element.bind('focus.' + this.widgetName, this.show);
		}
		if (this._button) {
			this._button.remove();
		}
		var self = this;
		this._button = (!this._get('showTrigger') ? $([]) :
			$(this._get('showTrigger')).clone().addClass(this.widgetBaseClass + triggerClass)
				[this._get('isRTL') ? 'insertBefore' : 'insertAfter'](this.element).
				click(function() {
					if (!self.isDisabled()) {
						self[curDP == self ? 'hide' : 'show']();
					}
				}));
		this._autoSize();
		if (this._get('selectDefaultDate') && this._get('defaultDate') && !this._selectedDate) {
			this.setDate(this.element, (this._get('defaultDate') || $.ui.datepicker.newDate()));
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function() {
		if (this._get('autoSize') && !this._inline) {
			var date = $.ui.datepicker.newDate(2009, 10, 20); // Ensure double digits
			var dateFormat = this._get('dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(this._get('dateFormat').match(/MM/) ? // Longest month
					'monthNames' : 'monthNamesShort')));
				date.setDate(findMax(this._get(this._get('dateFormat').match(/DD/) ? // Longest day
					'dayNames' : 'dayNamesShort')) + 20 - date.getDay());
			}
			this.element.attr('size', $.ui.datepicker.formatDate(
				dateFormat, date, this._getDateSettings()).length);
		}
	},

	/* Enable the datepicker and any associated trigger. */
	enable: function() {
		if (!this.element.hasClass(this.widgetBaseClass)) {
			return;
		}
		this.element.removeClass(this.widgetBaseClass + disabledClass);
		if (this._inline)
			this.element.children('.' + this.widgetBaseClass + disabledClass).remove().end().
				find('button,select').attr('disabled', '').end().
				find('a').attr('href', 'javascript:void(0)');
		else {
			this.element[0].disabled = false;
			this._button.filter('button.' + this.widgetBaseClass + triggerClass).
				attr('disabled', '').end().
				filter('img.' + this.widgetBaseClass + triggerClass).
				css({opacity: '1.0', cursor: ''});
		}
	},

	/* Disable the datepicker and any associated trigger. */
	disable: function() {
		if (!this.element.hasClass(this.widgetBaseClass))
			return;
		this.element.addClass(this.widgetBaseClass + disabledClass);
		if (this._inline) {
			var inline = this.element.children(':last');
			var offset = inline.offset();
			var relOffset = {left: 0, top: 0};
			inline.parents().each(function() {
				if ($(this).css('position') == 'relative') {
					relOffset = $(this).offset();
					return false;
				}
			});
			this.element.prepend('<div class="' + this.widgetBaseClass + disabledClass + '" style="' +
				'width: ' + inline.outerWidth() + 'px; height: ' + inline.outerHeight() +
				'px; left: ' + (offset.left - relOffset.left) +
				'px; top: ' + (offset.top - relOffset.top) + 'px;"></div>').
				find('button,select').attr('disabled', 'disabled').end().
				find('a').removeAttr('href');
		}
		else {
			this.hide();
			this.element[0].disabled = true;
			this._button.filter('button.' + this.widgetBaseClass + triggerClass).
				attr('disabled', 'disabled').end().
				filter('img.' + this.widgetBaseClass + triggerClass).
				css({opacity: '0.5', cursor: 'default'});
		}
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @return  (boolean) true if disabled, false if enabled */
	isDisabled: function() {
		return this.element.hasClass(this.widgetBaseClass + disabledClass);
	},

	/* Show a popup datepicker.
	   @param  event  (Event) the triggering event */
	show: function(event) {
		var self = (event && $.ui.datepicker.getInstance(event.target)) || this;
		if (curDP == self) {
			return;
		}
		if (curDP) {
			self.hide(true);
		}
		if (self) {
			curDP = self
			// Retrieve existing date(s)
			self._selectedDate = self._extractDate(self.element.val());
			self._drawDate = self._checkMinMax((self._selectedDate ||
				self._get('defaultDate') || $.ui.datepicker.newDate()), self);
			self._prevDate = $.ui.datepicker.newDate(self._drawDate);
			// Generate content
			self._update(true);
			// Adjust position before showing
			var edge = (self._get('isRTL') ? 'right' : 'left');
			self._div.position({my: self._get('myPosition') || edge + ' top',
				at: self._get('atPosition') || edge + ' bottom', of: self.element});
			// And display
			var showAnim = self._get('showAnim');
			var showSpeed = self._get('showSpeed');
			showSpeed = (showSpeed == 'normal' ? '_default' : showSpeed);
			var postProcess = function() {
				var borders = self._getBorders(self._div);
				self._div.find('.' + this.widgetBaseClass + coverClass). // IE6- only
					css({left: -borders[0], top: -borders[1],
						width: self._div.outerWidth() + borders[0],
						height: self._div.outerHeight() + borders[1]});
			};
			if ($.effects && $.effects[showAnim]) {
				self._div.show(showAnim, self._get('showOptions'), showSpeed, postProcess);
			}
			else {
				self._div[showAnim || 'show']((showAnim ? showSpeed : ''), postProcess);
			}
			if (!showAnim) {
				postProcess();
			}
		}
	},

	/* Extract a possible date from a string.
	   @param  dateText  (string) the text to extract from
	   @return  (Date) the extracted date */
	_extractDate: function(dateText) {
		try {
			return $.ui.datepicker.parseDate(
				this._get('dateFormat'), dateText, this._getDateSettings());
		}
		catch (e) {
			// Ignore
		}
		return null;
	},

	/* Update the datepicker display.
	   @param  hidden  (boolean) true to initially hide the datepicker */
	_update: function(hidden) {
		if (this._inline) {
			this.element.html(this._generateContent());
		}
		else if (curDP == this) {
			if (!this._div) {
				this._div = $('<div></div>').addClass(this.widgetBaseClass + popupClass).
					css({display: (hidden ? 'none' : 'static'), position: 'absolute',
						left: this.element.offset().left,
						top: this.element.offset().top + this.element.outerHeight()}).
					appendTo($(this._get('popupContainer') || 'body'));
			}
			this._div.html(this._generateContent());
			this.element.focus();
		}
		if (this._inline || curDP == this) {
			if (!this._prevDate || this._prevDate.getFullYear() != this._drawDate.getFullYear() ||
					this._prevDate.getMonth() != this._drawDate.getMonth()) {
				this._trigger('changeMonthYear', null, $.ui.datepicker.newDate(
					this._drawDate.getFullYear(), this._drawDate.getMonth() + 1, 1));
			}
		}
	},

	/* Update the input field and any alternate field with the current dates.
	   @param  keyUp   (boolean, internal) true if coming from keyUp processing */
	_updateInput: function(keyUp) {
		var dateSettings = this._getDateSettings();
		var value = (keyUp ? '' : $.ui.datepicker.formatDate(this._get('dateFormat'),
			this._selectedDate, dateSettings));
		var altValue = $.ui.datepicker.formatDate(this._get('altFormat') || this._get('dateFormat'),
			this._selectedDate, dateSettings);
		if (!this._inline && !keyUp) {
			this.element.val(value);
		}
		$(this._get('altField')).val(altValue);
		if (!keyUp && !this._inSelect) {
			this._inSelect = true; // Prevent endless loops
			this._trigger('select', null, this._selectedDate);
			this._inSelect = false;
		}
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			var extra = ($.browser.msie ? 1 : 0);
			return {thin: 1 + extra, medium: 3 + extra, thick: 5 + extra}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Hide a popup datepicker.
	   @param  immediate  (boolean) true to close immediately without animation */
	hide: function(immediate) {
		if (this == curDP || immediate) {
			var showAnim = (immediate ? '' : curDP._get('showAnim'));
			var showSpeed = curDP._get('showSpeed');
			showSpeed = (showSpeed == 'normal' ? '_default' : showSpeed);
			var postProcess = function() {
				curDP._div.remove();
				curDP._div = null;
				curDP._trigger('close', null, curDP._selectedDate);
				curDP = null;
			};
			curDP._div.stop();
			if ($.effects && $.effects[showAnim]) {
				curDP._div.hide(showAnim, curDP._get('showOptions'), showSpeed, postProcess);
			}
			else {
				var hideAnim = (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'));
				curDP._div[hideAnim]((showAnim ? showSpeed : ''), postProcess);
			}
			if (!showAnim) {
				postProcess();
			}
		}
	},

	/* Handle keystrokes in the datepicker.
	   @param  event  (KeyEvent) the keystroke
	   @return  (boolean) true if not handled, false if handled */
	_keyDown: function(event) {
		var self = $.ui.datepicker.getInstance(event.target);
		var handled = false;
		if (self._div) {
			if (event.keyCode == $.ui.keyCode.TAB) { // Close
				self.hide();
			}
			else if (event.keyCode == $.ui.keyCode.ENTER) { // Select
				self.selectDate(self._div.find('a.' + self._get('renderer').highlightedClass)[0]);
				handled = true;
			}
			else { // Command keystrokes
				var commands = self._get('commands');
				for (var name in commands) {
					var command = commands[name];
					if (command.keystroke.keyCode == event.keyCode &&
							!!command.keystroke.ctrlKey == (event.ctrlKey || event.metaKey) &&
							!!command.keystroke.altKey == event.altKey &&
							!!command.keystroke.shiftKey == event.shiftKey) {
						self.performAction(name);
						handled = true;
						break;
					}
				}
			}
		}
		else { // Show on 'current' keystroke
			var command = self._get('commands').current;
			if (command.keystroke.keyCode == event.keyCode &&
					!!command.keystroke.ctrlKey == (event.ctrlKey || event.metaKey) &&
					!!command.keystroke.altKey == event.altKey &&
					!!command.keystroke.shiftKey == event.shiftKey) {
				self.show();
				handled = true;
			}
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
		self._ctrlKey = ((event.keyCode < 48 && event.keyCode != $.ui.keyCode.SPACE) ||
			event.ctrlKey || event.metaKey);
		return !handled;
	},

	/* Filter keystrokes in the datepicker.
	   @param  event  (KeyEvent) the keystroke
	   @return  (boolean) true if allowed, false if not allowed */
	_keyPress: function(event) {
		var self = $.ui.datepicker.getInstance(event.target);
		if (self && self._get('constrainInput')) {
			var ch = String.fromCharCode(event.keyCode || event.charCode);
			var allowedChars = self._allowedChars();
			return (self._ctrlKey || ch < ' ' || !allowedChars || allowedChars.indexOf(ch) > -1);
		}
		return true;
	},

	/* Determine the set of characters allowed by the date format.
	   @return  (string) the set of allowed characters, or null if anything allowed */
	_allowedChars: function() {
		var dateFormat = this._get('dateFormat');
		var allowedChars = '';
		var literal = false;
		var hasNum = false;
		for (var i = 0; i < dateFormat.length; i++) {
			var ch = dateFormat.charAt(i);
			if (literal) {
				if (ch == "'" && dateFormat.charAt(i + 1) != "'") {
					literal = false;
				}
				else {
					allowedChars += ch;
				}
			}
			else {
				switch (ch) {
					case 'd': case 'm': case 'o': case 'w':
						allowedChars += (hasNum ? '' : '0123456789'); hasNum = true; break;
					case 'y': case '@': case '!':
						allowedChars += (hasNum ? '' : '0123456789') + '-'; hasNum = true; break;
					case 'J':
						allowedChars += (hasNum ? '' : '0123456789') + '-.'; hasNum = true; break;
					case 'D': case 'M': case 'Y':
						return null; // Accept anything
					case "'":
						if (dateFormat.charAt(i + 1) == "'") {
							allowedChars += "'";
						}
						else {
							literal = true;
						}
						break;
					default:
						allowedChars += ch;
				}
			}
		}
		return allowedChars;
	},

	/* Synchronise datepicker with the field.
	   @param  event  (KeyEvent) the keystroke
	   @return  (boolean) true if allowed, false if not allowed */
	_keyUp: function(event) {
		var self = $.ui.datepicker.getInstance(event.target);
		if (self && !self._ctrlKey) {
			try {
				var date = self._extractDate(self.element.val());
				if (date) {
					self.setDate(date, null, true);
				}
			}
			catch (event) {
				// Ignore
			}
		}
		return true;
	},

	/* Clear an input and close a popup datepicker. */
	clear: function() {
		this._selectedDate = null;
		this.hide();
		if (this._get('selectDefaultDate') && this._get('defaultDate')) {
			this.setDate(this._get('defaultDate') || $.ui.datepicker.newDate());
		}
		else {
			this._updateInput();
		}
	},

	/* Retrieve the selected date(s) for a calendar picker.
	   @return  (Date) the selected date */
	getDate: function() {
		return this._selectedDate;
	},

	/* Set the selected date(s) for a calendar picker.
	   @param  date    (Date or number or string or [] of these) the selected date
	   @param  keyUp   (boolean, internal) true if coming from keyUp processing
	   @param  setOpt  (boolean, internal) true if coming from option processing
	   @throws  error if date is out of allowed range */
	setDate: function(date, keyUp, setOpt) {
		var dateFormat = this._get('dateFormat');
		var minDate = this._get('minDate');
		var maxDate = this._get('maxDate');
		var curDate = this._selectedDate;
		this._selectedDate = null;
		var date = $.ui.datepicker.determineDate(date, null,
			curDate, dateFormat, this._getDateSettings());
		if (date) {
			if ((minDate && date.getTime() < minDate.getTime()) ||
				(maxDate && date.getTime() > maxDate.getTime())) {
				throw 'Date is out of allowed range';
			}
			this._selectedDate = date;
		}
		this._prevDate = (this._drawDate ? $.ui.datepicker.newDate(this._drawDate) : null);
		this._drawDate = this._checkMinMax(this._selectedDate ||
			this._get('defaultDate') || $.ui.datepicker.newDate());
		if (!setOpt) {
			this._update();
			this._updateInput(keyUp);
		}
	},

	/* Perform a named action for a calendar picker.
	   @param  action  (string) the name of the action */
	performAction: function(action) {
		if (!this.isDisabled()) {
			var commands = this._get('commands');
			if (commands[action] && commands[action].enabled.apply(this.element[0], [this])) {
				commands[action].action.apply(this.element[0], [this]);
			}
		}
	},

	/* Set the currently shown month, defaulting to today's.
	   @param  year   (number) the year to show (optional)
	   @param  month  (number) the month to show (1-12) (optional)
	   @param  day    (number) the day to show (optional) */
	showMonth: function(year, month, day) {
		if (day != null || this._drawDate.getFullYear() != year ||
				this._drawDate.getMonth() + 1 != month) {
			this._prevDate = $.ui.datepicker.newDate(this._drawDate);
			var show = this._checkMinMax((year != null ?
				$.ui.datepicker.newDate(year, month, 1) : $.ui.datepicker.newDate()), self);
			this._drawDate = $.ui.datepicker.newDate(show.getFullYear(), show.getMonth() + 1, 
				(day != null ? day : Math.min(this._drawDate.getDate(),
				$.ui.datepicker.daysInMonth(show.getFullYear(), show.getMonth() + 1))));
			this._update();
		}
	},

	/* Adjust the currently shown month.
	   @param  offset  (number) the number of months to change by */
	changeMonth: function(offset) {
		var date = this._checkMinMax($.ui.datepicker.add(
			$.ui.datepicker.newDate(this._drawDate), offset, 'm'));
		this.showMonth(date.getFullYear(), date.getMonth() + 1, date.getDate());
	},

	/* Adjust the currently shown day.
	   @param  offset  (number) the number of days to change by */
	changeDay: function(offset) {
		var date = $.ui.datepicker.add($.ui.datepicker.newDate(this._drawDate), offset, 'd');
		this.showMonth(date.getFullYear(), date.getMonth() + 1, date.getDate());
	},

	/* Restrict a date to the minimum/maximum specified.
	   @param  date  (Date) the date to check
	   @return  (Date) the restricted date */
	_checkMinMax: function(date) {
		if (!date) {
			return date;
		}
		var minDate = this._get('minDate');
		var maxDate = this._get('maxDate');
		date = (minDate && date.getTime() < minDate.getTime() ? $.ui.datepicker.newDate(minDate) : date);
		date = (maxDate && date.getTime() > maxDate.getTime() ? $.ui.datepicker.newDate(maxDate) : date);
		return date;
	},

	/* Retrieve the date associated with an entry in the datepicker.
	   @param  elem  (element) the selected datepicker element
	   @return  (Date) the corresponding date, or null */
	retrieveDate: function(elem) {
		return $.ui.datepicker.newDate(parseInt(elem.className.replace(/^.*dp(\d+).*$/, '$1'), 10));
	},

	/* Select a date for this datepicker.
	   @param  elem  (element) the selected datepicker element */
	selectDate: function(elem) {
		if (!this.isDisabled()) {
			this._selectedDate = this.retrieveDate(elem);
			this._updateInput();
			(this._inline ? this._update() : this.hide());
		}
	},

	/* Generate the datepicker content for this control.
	   @return  (jQuery) the datepicker content */
	_generateContent: function() {
		var renderer = this._get('renderer');
		var dateSettings = this._getDateSettings();
		var monthsToShow = this._get('monthsToShow');
		monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
		this._drawDate = this._checkMinMax(
			this._drawDate || this._get('defaultDate') || $.ui.datepicker.newDate(), self);
		var drawDate = $.ui.datepicker.newDate(this._drawDate);
		drawDate.setMonth(drawDate.getMonth() - this._get('monthsOffset'));
		// Generate months
		var monthRows = '';
		for (var row = 0; row < monthsToShow[0]; row++) {
			var months = '';
			for (var col = 0; col < monthsToShow[1]; col++) {
				months += this._generateMonth(drawDate.getFullYear(),
					drawDate.getMonth(), renderer, dateSettings, (row == 0 && col == 0));
				drawDate.setMonth(drawDate.getMonth() + 1);
			}
			monthRows += this._prepare(renderer.monthRow).replace(/\{months\}/, months);
		}
		var picker = this._prepare(renderer.picker).replace(/\{months\}/, monthRows).
			replace(/\{weekHeader\}/g, this._generateDayHeaders(renderer)) +
			($.browser.msie && parseInt($.browser.version, 10) < 7 && !self.inline ?
			'<iframe src="javascript:void(0);" class="' + this.widgetBaseClass + coverClass +
			'"></iframe>' : '');
		// Add commands
		var commands = this._get('commands');
		var asDateFormat = this._get('commandsAsDateFormat');
		var self = this;
		var addCommand = function(type, open, close, name, classes) {
			if (picker.indexOf('{' + type + ':' + name + '}') == -1) {
				return;
			}
			var command = commands[name];
			var date = (asDateFormat ? command.date.apply(self.element[0], [self]) : null);
			picker = picker.replace(new RegExp('\\{' + type + ':' + name + '\\}', 'g'),
				'<' + open + (command.status ? ' title="' + self._get(command.status) + '"' : '') +
				' class="' + renderer.commandClass + ' ' +
				renderer.commandClass + '-' + name + ' ' + classes +
				(command.enabled(self) ? '' : ' ' + renderer.disabledClass) + '">' +
				(date ? $.ui.datepicker.formatDate(self._get(command.text), date, dateSettings) :
				self._get(command.text)) + '</' + close + '>');
		};
		for (var name in commands) {
			addCommand('button', 'button type="button"', 'button', name,
				renderer.commandButtonClass);
			addCommand('link', 'a href="javascript:void(0)"', 'a', name,
				renderer.commandLinkClass);
		}
		picker = $(picker);
		// Add calendar behaviour
		picker.find(renderer.daySelector + ' a').hover( // Track days
				function() { $(this).addClass(renderer.highlightedClass); },
				function() {
					(self._inline ? $(this).parents('.' + self.widgetBaseClass) : self._div).
						find(renderer.daySelector + ' a').
						removeClass(renderer.highlightedClass);
				}).
			click(function() { // Select date
				self.selectDate(this);
			}).end().
			find('select.' + this.widgetBaseClass + monthYearClass +
				':not(.' + this.widgetBaseClass + anyYearClass + ')').
			change(function() { // Month/year
				var monthYear = $(this).val().split('/');
				self.showMonth(parseInt(monthYear[1], 10), parseInt(monthYear[0], 10));
			}).end().
			find('select.' + this.widgetBaseClass + anyYearClass).click(function() { // Any year
				$(this).next('input').css({left: this.offsetLeft, top: this.offsetTop,
					width: this.offsetWidth, height: this.offsetHeight}).show().focus();
			}).end().
			find('input.' + this.widgetBaseClass + monthYearClass).change(function() { // Any year entry
				var year = parseInt($(this).val(), 10);
				year = (isNaN(year) ? self._drawDate.getFullYear() : year);
				self.showMonth(year, self._drawDate.getMonth() + 1, self._drawDate.getDate());
			}).keydown(function(event) { // Any year escape
				if (event.keyCode == $.ui.keyCode.ESCAPE) {
					$(event.target).hide();
					self.element.focus();
				}
			});
		// Add command behaviour
		picker.find('.' + renderer.commandClass).click(function() {
				var action = this.className.replace(
					new RegExp('^.*' + renderer.commandClass + '-([^ ]+).*$'), '$1');
				self.performAction(action);
			});
		// Add classes
		if (this._get('isRTL')) {
			picker.addClass(renderer.rtlClass);
		}
		if (monthsToShow[0] * monthsToShow[1] > 1) {
			picker.addClass(renderer.multiClass);
		}
		var pickerClass = this._get('pickerClass');
		if (pickerClass) {
			picker.addClass(pickerClass);
		}
		// Resize
		$('body').append(picker);
		picker.width(monthsToShow[1] * picker.find(renderer.monthSelector).outerWidth());
		// Pre-show customisation
		var onShow = this._get('onShow');
		if ($.isFunction(onShow)) {
			onShow.apply(this.element[0], [picker, this]);
		}
		return picker;
	},

	/* Generate the content for a single month.
	   @param  year          (number) the year to generate
	   @param  month         (number) the month to generate (0-11)
	   @param  renderer      (object) the rendering templates
	   @param  dateSettings  (object) the localised settings
	   @param  first         (boolean) true if first of multiple months
	   @return  (string) the month content */
	_generateMonth: function(year, month, renderer, dateSettings, first) {
		var daysInMonth = $.ui.datepicker.daysInMonth(year, month + 1);
		var monthsToShow = this._get('monthsToShow');
		monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
		var fixedWeeks = this._get('fixedWeeks') || (monthsToShow[0] * monthsToShow[1] > 1);
		var firstDay = this._get('firstDay');
		var leadDays = ($.ui.datepicker.newDate(year, month + 1, 1).getDay() - firstDay + 7) % 7;
		var numWeeks = (fixedWeeks ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
		var showOtherMonths = this._get('showOtherMonths');
		var selectOtherMonths = this._get('selectOtherMonths') && showOtherMonths;
		var dayStatus = this._get('dayStatus');
		var minDate = this._get('minDate');
		var maxDate = this._get('maxDate');
		var showWeeks = renderer.week.indexOf('{weekOfYear}') > -1;
		var calculateWeek = this._get('calculateWeek') || $.ui.datepicker.iso8601Week;
		var onDate = this._get('onDate');
		onDate = ($.isFunction(onDate) ? onDate : null);
		var today = $.ui.datepicker.newDate();
		var drawDate = $.ui.datepicker.newDate(year, month + 1, 1);
		drawDate.setDate(drawDate.getDate() - leadDays -
			(fixedWeeks && drawDate.getDay() == firstDay ? 7 : 0));
		// Generate weeks
		var weeks = '';
		for (var week = 0; week < numWeeks; week++) {
			var weekOfYear = (!showWeeks || !calculateWeek ? '' :
				'<span class="dp' + drawDate.getTime() + '">' + calculateWeek(drawDate) + '</span>');
			var days = '';
			for (var day = 0; day < 7; day++) {
				var selected = (this._selectedDate && this._selectedDate.getTime() == drawDate.getTime());
				var dateInfo = (!onDate ? {} :
					onDate.apply(this.element[0], [drawDate, drawDate.getMonth() == month]));
				var selectable = (dateInfo.selectable == null || dateInfo.selectable) &&
					(selectOtherMonths || drawDate.getMonth() == month) &&
					(!minDate || drawDate.getTime() >= minDate.getTime()) &&
					(!maxDate || drawDate.getTime() <= maxDate.getTime());
				days += this._prepare(renderer.day).replace(/\{day\}/g,
					(selectable ? '<a href="javascript:void(0)"' : '<span') +
					' class="dp' + drawDate.getTime() + ' ' + (dateInfo.dateClass || '') +
					(selected && (selectOtherMonths || drawDate.getMonth() == month) ?
					' ' + renderer.selectedClass : '') +
					(selectable ? ' ' + renderer.defaultClass : '') +
					((drawDate.getDay() || 7) < 6 ? '' : ' ' + renderer.weekendClass) +
					(drawDate.getMonth() == month ? '' : ' ' + renderer.otherMonthClass) +
					(drawDate.getTime() == today.getTime() && drawDate.getMonth() == month ?
					' ' + renderer.todayClass : '') +
					(drawDate.getTime() == this._drawDate.getTime() && drawDate.getMonth() == month ?
					' ' + renderer.highlightedClass : '') + '"' +
					(dateInfo.title || (dayStatus && selectable) ? ' title="' + (dateInfo.title ||
					$.ui.datepicker.formatDate(dayStatus, drawDate, dateSettings)) + '"' : '') + '>' +
					(showOtherMonths || drawDate.getMonth() == month ?
					dateInfo.content || drawDate.getDate() : '&nbsp;') +
					(selectable ? '</a>' : '</span>'));
				drawDate.setDate(drawDate.getDate() + 1);
			}
			weeks += this._prepare(renderer.week).replace(/\{days\}/g, days).
				replace(/\{weekOfYear\}/g, weekOfYear);
		}
		var monthHeader = this._prepare(renderer.month).match(/\{monthHeader(:[^\}]+)?\}/);
		monthHeader = (monthHeader[0].length <= 13 ? 'MM yyyy' :
			monthHeader[0].substring(13, monthHeader[0].length - 1));
		monthHeader = (first && this._get('changeMonth') ? this._generateMonthSelection(
			year, month, minDate, maxDate, monthHeader, dateSettings) :
			$.ui.datepicker.formatDate(monthHeader,
			$.ui.datepicker.newDate(year, month + 1, 1), dateSettings));
		var weekHeader = this._prepare(renderer.weekHeader).
			replace(/\{days\}/g, this._generateDayHeaders(renderer));
		return this._prepare(renderer.month).replace(/\{monthHeader(:[^\}]+)?\}/g, monthHeader).
			replace(/\{weekHeader\}/g, weekHeader).replace(/\{weeks\}/g, weeks);
	},

	/* Generate the HTML for the day headers.
	   @param  renderer  (object) the rendering templates
	   @return  (string) a week's worth of day headers */
	_generateDayHeaders: function(renderer) {
		var firstDay = this._get('firstDay');
		var dayNames = this._get('dayNames');
		var dayNamesMin = this._get('dayNamesMin');
		var header = '';
		for (var day = 0; day < 7; day++) {
			var dow = (day + firstDay) % 7;
			header += this._prepare(renderer.dayHeader).replace(/\{day\}/g,
				'<span class="' + this.widgetBaseClass + curDoWClass + dow + '" title="' +
				dayNames[dow] + '">' + dayNamesMin[dow] + '</span>');
		}
		return header;
	},

	/* Generate selection controls for month/year.
	   @param  year          (number) the year to generate
	   @param  month         (number) the month to generate (0-11)
	   @param  minDate       (CDate) the minimum date allowed
	   @param  maxDate       (CDate) the maximum date allowed
	   @param  monthHeader   (string) the month/year format
	   @param  dateSettings  (object) the localised settings
	   @return  (string) the month selection content */
	_generateMonthSelection: function(year, month, minDate, maxDate, monthHeader, dateSettings) {
		// Months
		var monthNames = this._get('monthNames' + (monthHeader.match(/mm/i) ? '' : 'Short'));
		var html = monthHeader.replace(/m+/i, '\\x2E').replace(/y+/i, '\\x2F');
		var selector = '<select class="' + this.widgetBaseClass + monthYearClass +
			'" title="' + this._get('monthStatus') + '">';
		for (var m = 1; m <= 12; m++) {
			if ((!minDate || $.ui.datepicker.newDate(year, m, $.ui.datepicker.daysInMonth(year, m)).
					getTime() >= minDate.getTime()) &&
					(!maxDate || $.ui.datepicker.newDate(year, m, 1).getTime() <= maxDate.getTime())) {
				selector += '<option value="' + m + '/' + year + '"' +
					(month == m - 1 ? ' selected="selected"' : '') + '>' + monthNames[m - 1] + '</option>';
			}
		}
		selector += '</select>';
		html = html.replace(/\\x2E/, selector);
		// Years
		var yearRange = this._get('yearRange');
		if (yearRange == 'any') {
			selector = '<select class="' + this.widgetBaseClass + monthYearClass + ' ' +
				this.widgetBaseClass + anyYearClass + '" title="' + this._get('yearStatus') + '">' +
				'<option>' + year + '</option></select>' +
				'<input class="' + this.widgetBaseClass + monthYearClass + ' ' +
				this.widgetBaseClass + curMonthClass + month + '" value="' + year + '">';
		}
		else {
			yearRange = yearRange.split(':');
			if (yearRange.length == 1) {
				yearRange.push(yearRange[0]);
			}
			var todayYear = new Date().getFullYear();
			var start = (yearRange[0].match('c[+-].*') ? year + parseInt(yearRange[0].substring(1), 10) :
				((yearRange[0].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[0] || todayYear, 10)));
			var end = (yearRange[1].match('c[+-].*') ? year + parseInt(yearRange[1].substring(1), 10) :
				((yearRange[1].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[1] || todayYear, 10)));
			selector = '<select class="' + this.widgetBaseClass + monthYearClass +
				'" title="' + this._get('yearStatus') + '">';
			var min = $.ui.datepicker.newDate(start + 1, 1, 1);
			min.setDate(min.getDate() - 1);
			min = (minDate && minDate.getTime() > min.getTime() ? minDate : min).getFullYear();
			var max = $.ui.datepicker.newDate(end, 1, 1);
			max = (maxDate && maxDate.getTime() < max.getTime() ? maxDate : max).getFullYear();
			for (var y = min; y <= max; y++) {
				selector += '<option value="' + (month + 1) + '/' + y + '"' +
					(year == y ? ' selected="selected"' : '') + '>' + y + '</option>';
			}
			selector += '</select>';
		}
		html = html.replace(/\\x2F/, selector);
		return html;
	},

	/* Prepare a render template for use.
	   Exclude popup/inline sections that are not applicable.
	   Localise text of the form: {l10n:name}.
	   @param  text  (string) the text to localise
	   @return  (string) the localised text */
	_prepare: function(text) {
		var replaceSection = function(type, retain) {
			while (true) {
				var start = text.indexOf('{' + type + ':start}');
				if (start == -1) {
					return;
				}
				var end = text.substring(start).indexOf('{' + type + ':end}');
				if (end > -1) {
					text = text.substring(0, start) +
						(retain ? text.substr(start + type.length + 8, end - type.length - 8) : '') +
						text.substring(start + end + type.length + 6);
				}
			}
		};
		replaceSection('inline', this._inline);
		replaceSection('popup', !this._inline);
		var pattern = /\{l10n:([^\}]+)\}/;
		var matches = null;
		while (matches = pattern.exec(text)) {
			text = text.replace(matches[0], this._get(matches[1]));
		}
		return text;
	},

	/* Retrieve the formatting settings for this instance.
	   @return  (object) the formatting settings */
	_getDateSettings: function() {
		return {dayNamesShort: this._get('dayNamesShort'), dayNames: this._get('dayNames'),
			monthNamesShort: this._get('monthNamesShort'), monthNames: this._get('monthNames'),
			calculateWeek: this._get('calculateWeek'), shortYearCutoff: this._get('shortYearCutoff')};
	}
});

$.extend($.ui.datepicker, {
	version: '@VERSION',
	eventPrefix: 'datepicker',
	getter: 'getDate,isDisabled',
	defaultRenderer: defaultRenderer,
	buttonsRenderer: buttonsRenderer,
	defaultCommands: defaultCommands,
	defaults: { // Global defaults
		showOnFocus: true, // True for popup on focus, false for not
		showTrigger: null, // Element to be cloned for a trigger, null for none
		showAnim: 'show', // Name of jQuery animation for popup, '' for no animation
		showOptions: {}, // Options for enhanced animations
		showSpeed: 'normal', // Duration of display/closure
		popupContainer: null, // The element to which a popup calendar is added, null for body
		myPosition: '', // Alignment of popup - source - default 'left top'
		atPosition: '', // Alignment of popup - target - default 'left bottom'
		fixedWeeks: false, // True to always show 6 weeks, false to only show as many as are needed
		calculateWeek: null, // Override week of the year calculation, defaults to ISO 8601
		monthsToShow: 1, // How many months to show, cols or [rows, cols]
		monthsOffset: 0, // How many months to offset the primary month by
		monthsToStep: 1, // How many months to move when prev/next clicked
		monthsToJump: 12, // How many months to move when large prev/next clicked
		changeMonth: false, // True to change month/year via drop-down, false for navigation only
		yearRange: 'c-10:c+10', // Range of years to show in drop-down: 'any' for direct text entry
			// or 'start:end', where start/end are '+-nn' for relative to today
			// or 'c+-nn' for relative to the currently selected date
			// or 'nnnn' for an absolute year
		shortYearCutoff: '+10', // Cutoff point for two digit years in the current century -
			// either absolute number (0-99) or string offset from current year
		showOtherMonths: false, // True to show dates from other months, false to not show them
		selectOtherMonths: false, // True to allow selection of dates from other months too
		defaultDate: null, // Date to show if no other selected
		selectDefaultDate: false, // True to pre-select the default date if no other is chosen
		minDate: null, // The minimum selectable date
		maxDate: null, // The maximum selectable date
		dateFormat: null, // Format for dates, defaults to calendar setting if null
		autoSize: false, // True to size the input field according to the date format
		onDate: null, // Callback as a date is added to the datepicker
		onShow: null, // Callback just before a datepicker is shown
		changeMonthYear: null, // Event when changing the month displayed
		select: null, // Event when a date is selected
		close: null, // Event when a popup datepicker is closed
		altField: null, // Alternate field to update in synch with the datepicker
		altFormat: null, // Date format for alternate field, defaults to dateFormat
		constrainInput: true, // True to constrain typed input to dateFormat allowed characters
		commandsAsDateFormat: false, // True to apply formatDate to the command texts
		commands: defaultCommands // Command actions that may be added to a layout by name
	},
	
	regional: { // Localisations
		'': { // English
			renderer: defaultRenderer, // The rendering templates
			monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'],
			monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
			dateFormat: 'mm/dd/yyyy', // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			prevText: '&lt;Prev', // Text for the previous month command
			prevStatus: 'Show the previous month', // Status text for the previous month command
			prevJumpText: '&lt;&lt;', // Text for the previous year command
			prevJumpStatus: 'Show the previous year', // Status text for the previous year command
			nextText: 'Next&gt;', // Text for the next month command
			nextStatus: 'Show the next month', // Status text for the next month command
			nextJumpText: '&gt;&gt;', // Text for the next year command
			nextJumpStatus: 'Show the next year', // Status text for the next year command
			currentText: 'Current', // Text for the current month command
			currentStatus: 'Show the current month', // Status text for the current month command
			todayText: 'Today', // Text for the today's month command
			todayStatus: 'Show today\'s month', // Status text for the today's month command
			clearText: 'Clear', // Text for the clear command
			clearStatus: 'Clear all the dates', // Status text for the clear command
			closeText: 'Close', // Text for the close command
			closeStatus: 'Close the datepicker', // Status text for the close command
			yearStatus: 'Change the year', // Status text for year selection
			monthStatus: 'Change the month', // Status text for month selection
			weekText: 'Wk', // Text for week of the year column header
			weekStatus: 'Week of the year', // Status text for week of the year column header
			dayStatus: 'Select DD, M d, yyyy', // Status text for selectable days
			defaultStatus: 'Select a date', // Status text shown by default
			isRTL: false // True if language is right-to-left
		}
	},

	/* Retrieve the datepicker instance for a field.
	   @param  target  (element) the attached control
	   @return  (ui.datepicker) the connect datepicker, or null if none */
	getInstance: function(target) {
		return $.data(target, this.widgetName).datepicker;
	},

	/* Create a new normalised date.
	   @param  year   (Date) date to clone (null for today) or
	                  (number) timestamp or
	                  (number) year for date
	   @param  month  (number, optional) month for date (1-12)
	   @param  day    (number, optional) day for date
	   @return  (Date) the new date */
	newDate: function(year, month, day) {
		return this.normaliseDate(year == null ? new Date() :
			(typeof year != 'number' ? new Date(year.getTime()) :
			(month != null ? new Date(year, month - 1, day) : new Date(year))));
	},

	/* Clear time values and handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	normaliseDate: function(date) {
		if (!date) return null;
		date.setMilliseconds(0);
		date.setSeconds(0);
		date.setMinutes(0);
		date.setHours(0);
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Find the number of days in a given month.
	   @param  year   (Date) the date to inspect or
	                  (number) the year to inspect
	   @param  month  (number, optional) the month to inspect (1-12)
	   @return  (number) the number of days in the given month */
	daysInMonth: function(year, month) {
		if (year.getFullYear) {
			month = year.getMonth() + 1;
			year = year.getFullYear();
		}
		return 32 - new Date(year, month - 1, 32).getDate();
	},

	/* Calculate the week of the year, according to ISO 8601.
	   @param  year   (Date) the date to calculate for or
	                  (number) the year to calculate for
	   @param  month  (number, optional) the month to calculate for (1-12)
	   @param  day    (number, optional) the day to calculate for
	   @return  (number) the corresponding week of the year (1-53) */
	iso8601Week: function(year, month, day) {
		var checkDate = (year.getFullYear ?
			$.ui.datepicker.newDate(year) : $.ui.datepicker.newDate(year, month, day));
		// Find Thursday of this week starting on Monday
		$.ui.datepicker.add(checkDate, 4 - (checkDate.getDay() || 7), 'd');
		return Math.floor(($.ui.datepicker.dayOfYear(checkDate) - 1) / 7) + 1;
	},

	/* Calculate the day of the year.
	   @param  year   (Date) the date to calculate for or
	                  (number) the year to calculate for
	   @param  month  (number, optional) the month to calculate for (1-12)
	   @param  day    (number, optional) the day to calculate for
	   @return  (number) its day of the year (1-366) */
	dayOfYear: function(year, month, day) {
		var date = (year.getFullYear ? year : new Date(year, month - 1, day));
		return Math.floor((date.getTime() -
			this.newDate(date.getFullYear(), 1, 0).getTime()) / 86400000);
	},

	/* Add a number of periods to a date.
	   @param  date    (Date) the starting date
	   @param  offset  (number) the number of periods
	   @param  period  (string) the type of period (d|w|m|y)
	   @return  (Date) the updated date */
	add: function(date, offset, period) {
		if (!date)
			return null;
		period = period.toLowerCase();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		if (period == 'd') {
			day += offset;
		}
		else if (period == 'w') {
			day += (offset * 7);
		}
		else if (period == 'm') {
			month += offset;
		}
		else if (period == 'y') {
			year += offset;
		}
		date.setTime(this.normaliseDate(new Date(year, month, (period == 'd' || period == 'w' ?
			day : Math.min(day, this.daysInMonth(year, month + 1))))).getTime());
		return date;
	},

	// Predefined date formats	
	ATOM: 'yyyy-mm-dd', // RFC 3339/ISO 8601
	COOKIE: 'D, dd M yyyy',
	FULL: 'DD, MM d, yyyy',
	ISO_8601: 'yyyy-mm-dd',
	JULIAN: 'J',
	RFC_822: 'D, d M yy',
	RFC_850: 'DD, dd-M-yy',
	RFC_1036: 'D, d M yy',
	RFC_1123: 'D, d M yyyy',
	RFC_2822: 'D, d M yyyy',
	RSS: 'D, d M yy', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yyyy-mm-dd', // ISO 8601

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   w  - week of year (no leading zero)
	   ww - week of year (two digit)
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   yy - year (two digit)
	   yyyy - year (four digit)
	   @  - Unix timestamp (secs since 01/01/1970)
	   !  - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote
	   @param  format    (string) the desired format of the date
	   @param  date      (Date) the date value to format
	   @param  settings  (object) attributes include:
	                     dayNamesShort    (string[]) abbreviated names of the days from Sunday (optional)
	                     dayNames         (string[]) names of the days from Sunday (optional)
	                     monthNamesShort  (string[]) abbreviated names of the months (optional)
	                     monthNames       (string[]) names of the months (optional)
	                     calculateWeek    (function) function that determines week of the year (optional)
	   @return  (string) the date in the above format */
	formatDate: function(format, date, settings) {
		if (!date) {
			return '';
		}
		settings = settings || {};
		var dayNamesShort = settings.dayNamesShort || $.ui.datepicker.defaults.dayNamesShort;
		var dayNames = settings.dayNames || $.ui.datepicker.defaults.dayNames;
		var monthNamesShort = settings.monthNamesShort || $.ui.datepicker.defaults.monthNamesShort;
		var monthNames = settings.monthNames || $.ui.datepicker.defaults.monthNames;
		var calculateWeek = settings.calculateWeek || $.ui.datepicker.defaults.calculateWeek ||
			$.ui.datepicker.iso8601Week;
		// Check whether a format character is doubled
		var doubled = function(match, step) {
			var matches = 1;
			while (iFormat + matches < format.length && format.charAt(iFormat + matches) == match) {
				matches++;
			}
			iFormat += matches - 1;
			return Math.floor(matches / (step || 1)) > 1;
		};
		// Format a number, with leading zeroes if necessary
		var formatNumber = function(match, value, len, step) {
			var num = '' + value;
			if (doubled(match, step)) {
				while (num.length < len) {
					num = '0' + num;
				}
			}
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (doubled(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) == "'" && !doubled("'")) {
					literal = false;
				}
				else {
					output += format.charAt(iFormat);
				}
			}
			else {
				switch (format.charAt(iFormat)) {
					case 'd': output += formatNumber('d', date.getDate(), 2); break;
					case 'D': output += formatName('D', date.getDay(), dayNamesShort, dayNames); break;
					case 'o': output += formatNumber('o', $.ui.datepicker.dayOfYear(date), 3); break;
					case 'w': output += formatNumber('w', calculateWeek(date), 2); break;
					case 'm': output += formatNumber('m', date.getMonth() + 1, 2); break;
					case 'M': output += formatName('M', date.getMonth(), monthNamesShort, monthNames); break;
					case 'y':
						output += (doubled('y', 2) ? date.getFullYear() :
							(date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
						break;
					case '@': output += Math.floor(date.getTime() / 1000); break;
					case '!': output += date.getTime() * 10000 + ticksTo1970; break;
					case "'":
						if (doubled("'")) {
							output += "'";
						}
						else {
							literal = true;
						}
						break;
					default:
						output += format.charAt(iFormat);
				}
			}
		}
		return output;
	},

	/* Parse a string value into a date object.
	   See formatDate for the possible formats, plus:
	   * - ignore rest of string
	   @param  format    (string) the expected format of the date
	   @param  value     (string) the date in the above format
	   @param  settings  (object) attributes include:
	                     shortYearCutoff  (number) the cutoff year for determining the century (optional)
	                     dayNamesShort    (string[]) abbreviated names of the days from Sunday (optional)
	                     dayNames         (string[]) names of the days from Sunday (optional)
	                     monthNamesShort  (string[]) abbreviated names of the months (optional)
	                     monthNames       (string[]) names of the months (optional)
	   @return  (Date) the extracted date value or null if value is blank
	   @throws  errors if the format and/or value are missing, if the value doesn't match the format,
	            or if the date is invalid */
	parseDate: function(format, value, settings) {
		if (!format || value == null) {
			throw 'Invalid arguments';
		}
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '') {
			return null;
		}
		settings = settings || {};
		var shortYearCutoff = settings.shortYearCutoff || $.ui.datepicker.defaults.shortYearCutoff;
		var shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		var dayNamesShort = settings.dayNamesShort || $.ui.datepicker.defaults.dayNamesShort;
		var dayNames = settings.dayNames || $.ui.datepicker.defaults.dayNames;
		var monthNamesShort = settings.monthNamesShort || $.ui.datepicker.defaults.monthNamesShort;
		var monthNames = settings.monthNames || $.ui.datepicker.defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var shortYear = false;
		var literal = false;
		// Check whether a format character is doubled
		var doubled = function(match, step) {
			var matches = 1;
			while (iFormat + matches < format.length && format.charAt(iFormat + matches) == match) {
				matches++;
			}
			iFormat += matches - 1;
			return Math.floor(matches / (step || 1)) > 1;
		};
		// Extract a number from the string value
		var getNumber = function(match, step) {
			doubled(match, step);
			var size = [2, 3, 4, 11, 20]['oy@!'.indexOf(match) + 1];
			var digits = new RegExp('^-?\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num) {
				throw 'Missing number at position {0}'.replace(/\{0\}/, iValue);
			}
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var calendar = this;
		var getName = function(match, shortNames, longNames, step) {
			var names = (doubled(match, step) ? longNames : shortNames);
			for (var i = 0; i < names.length; i++) {
				if (value.substr(iValue, names[i].length) == names[i]) {
					iValue += names[i].length;
					return i + 1;
				}
			}
			throw 'Unknown name at position {0}'.replace(/\{0\}/, iValue);
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat)) {
				throw 'Unexpected literal at position {0}'.replace(/\{0\}/, iValue);
			}
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) == "'" && !doubled("'")) {
					literal = false;
				}
				else {
					checkLiteral();
				}
			}
			else {
				switch (format.charAt(iFormat)) {
					case 'd': day = getNumber('d'); break;
					case 'D': getName('D', dayNamesShort, dayNames); break;
					case 'o': doy = getNumber('o'); break;
					case 'w': getNumber('w'); break;
					case 'm': month = getNumber('m'); break;
					case 'M': month = getName('M', monthNamesShort, monthNames); break;
					case 'y':
						var iSave = iFormat;
						shortYear = !doubled('y', 2);
						iFormat = iSave;
						year = getNumber('y', 2);
						break;
					case '@': 
						var date = new Date(getNumber('@') * 1000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!': 
						var date = new Date((getNumber('!') - ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '*': iValue = value.length; break;
					case "'":
						if (doubled("'")) {
							checkLiteral();
						}
						else {
							literal = true;
						}
						break;
					default: checkLiteral();
				}
			}
		}
		if (iValue < value.length) {
			throw 'Additional text found at end';
		}
		if (year == -1) {
			year = this.today().year();
		}
		else if (year < 100 && shortYear) {
			year += (shortYearCutoff == -1 ? 1900 : new Date().getFullYear() -
				new Date().getFullYear() % 100 - (year <= shortYearCutoff ? 0 : 100));
		}
		if (doy > -1) {
			month = 1;
			day = doy;
			for (var dim = $.ui.datepicker.daysInMonth(year, month); day > dim;
					dim = $.ui.datepicker.daysInMonth(year, month)) {
				month++;
				day -= dim;
			}
		}
		var date = $.ui.datepicker.newDate(year, month, day);
		if (year != date.getFullYear() || month != date.getMonth() + 1 || day != date.getDate()) {
			throw 'Invalid date';
		}
		return date;
	},

	/* A date may be specified as an exact value or a relative one.
	   @param  dateSpec     (Date or number or string) the date as an object or string
	                        in the given format or an offset - numeric days from today,
	                        or string amounts and periods, e.g. '+1m +2w'
	   @param  defaultDate  (Date) the date to use if no other supplied, may be null
	   @param  currentDate  (Date) the current date as a possible basis for relative dates,
	                        if null today is used (optional)
	   @param  dateFormat   (string) the expected date format - see formatDate above (optional)
	   @param  settings     (object) attributes include:
	                        shortYearCutoff  (number) the cutoff year for determining the century (optional)
	                        dayNamesShort    (string[7]) abbreviated names of the days from Sunday (optional)
	                        dayNames         (string[7]) names of the days from Sunday (optional)
	                        monthNamesShort  (string[12]) abbreviated names of the months (optional)
	                        monthNames       (string[12]) names of the months (optional)
	   @return  (Date) the decoded date */
	determineDate: function(dateSpec, defaultDate, currentDate, dateFormat, settings) {
		if (currentDate && typeof currentDate != 'object') {
			settings = dateFormat;
			dateFormat = currentDate;
			currentDate = null;
		}
		if (typeof dateFormat != 'string') {
			settings = dateFormat;
			dateFormat = '';
		}
		var self = this;
		var offsetString = function(offset) {
			try {
				return $.ui.datepicker.parseDate(dateFormat, offset, settings);
			}
			catch (e) {
				// Ignore
			}
			offset = offset.toLowerCase();
			var date = $.ui.datepicker.newDate(offset.match(/^c/) && currentDate ? currentDate : null);
			var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				date = $.ui.datepicker.add(date, parseInt(matches[1], 10), matches[2] || 'd');
				matches = pattern.exec(offset);
			}
			return date;
		};
		defaultDate = (defaultDate ? $.ui.datepicker.newDate(defaultDate) : null);
		dateSpec = (dateSpec == null ? defaultDate :
			(typeof dateSpec == 'string' ? offsetString(dateSpec) : (typeof dateSpec == 'number' ?
			(isNaN(dateSpec) || dateSpec == Infinity || dateSpec == -Infinity ? defaultDate :
			$.ui.datepicker.add($.ui.datepicker.newDate(), dateSpec, 'd')) : dateSpec)));
		return dateSpec;
	},

	/* Apply multiple event functions.
	   Usage, for example: onShow: multipleEvents(fn1, fn2, ...)
	   @param  fns  (function...) the functions to apply */
	multipleEvents: function(fns) {
		var funcs = arguments;
		return function(args) {
			for (var i = 0; i < funcs.length; i++) {
				funcs[i].apply(this, arguments);
			}
		};
	}
});

$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['']);

// Close date picker if clicked elsewhere
$(document).click(function(event) {
	if (!curDP) {
		return;
	}
	var targets = $(event.target).parents().andSelf();
	if (!(targets.hasClass(curDP.widgetBaseClass + popupClass) ||
			targets.hasClass(curDP.widgetBaseClass) ||
			targets.hasClass(curDP.widgetBaseClass + triggerClass))) {
		curDP.hide();
	}
});

})(jQuery);
