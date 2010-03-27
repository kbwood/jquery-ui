/*
 * datepicker_options.js
 */

(function($) {

module("datepicker: options", {
	teardown: function() {
		stop();
		setTimeout(start, 13);
	}
});

test('set defaults', function() {
	expect(3);
	var inp = init('#inp');
	equal($.ui.datepicker.defaults.showOnFocus, true, 'Initial showOnFocus');
	$.extend($.ui.datepicker.defaults, {showOnFocus: false});
	equal($.ui.datepicker.defaults.showOnFocus, false, 'Change default showOnFocus');
	$.extend($.ui.datepicker.defaults, {showOnFocus: true});
	equal($.ui.datepicker.defaults.showOnFocus, true, 'Restore showOnFocus');
});

test('option', function() {
	expect(13);
	var inp = init('#inp');
	var inst = $.data(inp[0], PROP_NAME);
	// Set option
	equal(inst.options.showSpeed, null, 'Initial setting showSpeed');
	equal($.ui.datepicker.defaults.showSpeed, 'normal', 'Initial default showSpeed');
	equal(inst._get('showSpeed'), 'normal', 'Initial instance showSpeed');
	inp.datepicker('option', 'showSpeed', 'fast');
	equal(inst.options.showSpeed, 'fast', 'Change setting showSpeed');
	equal($.ui.datepicker.defaults.showSpeed, 'normal', 'Retain default showSpeed');
	equal(inst._get('showSpeed'), 'fast', 'Change instance showSpeed');
	inp.datepicker('option', {showSpeed: null});
	equal(inst.options.showSpeed, null, 'Change setting showSpeed');
	equal($.ui.datepicker.defaults.showSpeed, 'normal', 'Retain default showSpeed');
	equal(inst._get('showSpeed'), 'normal', 'Change instance showSpeed');
	inp.datepicker('option', {showSpeed: 'slow'});
	equal(inst.options.showSpeed, 'slow', 'Change setting showSpeed');
	equal($.ui.datepicker.defaults.showSpeed, 'normal', 'Retain default showSpeed');
	equal(inst._get('showSpeed'), 'slow', 'Change instance showSpeed');
	// Get option
	inp = init('#inp');
	inp.datepicker('option', 'showSpeed', 'fast');
	equal(inp.datepicker('option', 'showSpeed'), 'fast', 'Get instance showSpeed');
});

test('invocation', function() {
	expect(29);
	var inp = init('#inp');
	var body = $('body');
	// On focus
	var button = inp.siblings('button');
	ok(button.length == 0, 'Focus - button absent');
	var image = inp.siblings('img');
	ok(image.length == 0, 'Focus - image absent');
	inp.focus();
	ok($('#ui-datepicker-div:visible').length > 0, 'Focus - rendered on focus');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ESC});
	ok($('#ui-datepicker-div:visible').length == 0, 'Focus - hidden on exit');
	inp.focus();
	ok($('#ui-datepicker-div:visible').length > 0, 'Focus - rendered on focus');
	body.click();
	ok($('#ui-datepicker-div:visible').length == 0, 'Focus - hidden on external click');
	inp.datepicker('hide').datepicker('destroy');
	// On button
	inp = init('#inp', {showTrigger: '<button>Popup</button>', showOnFocus: false});
	ok($('#ui-datepicker-div:visible').length == 0, 'Button - initially hidden');
	button = inp.siblings('button');
	image = inp.siblings('img');
	ok(button.length == 1, 'Button - button present');
	ok(image.length == 0, 'Button - image absent');
	equal(button.text(), 'Popup', 'Button - button text');
	inp.focus();
	ok($('#ui-datepicker-div:visible').length == 0, 'Button - not rendered on focus');
	button.click();
	ok($('#ui-datepicker-div:visible').length > 0, 'Button - rendered on button click');
	button.click();
	ok($('#ui-datepicker-div:visible').length == 0, 'Button - hidden on second button click');
	inp.datepicker('hide').datepicker('destroy');
	// On image button
	inp = init('#inp', {showTrigger: '<img src="img/calendar.gif" title="Cal">', showOnFocus: false});
	ok($('#ui-datepicker-div:visible').length == 0, 'Image button - initially hidden');
	button = inp.siblings('button');
	ok(button.length == 0, 'Image button - button absent');
	image = inp.siblings('img');
	ok(image.length == 1, 'Image button - image present');
	equal(image.attr('src'), 'img/calendar.gif', 'Image button - image source');
	equal(image.attr('title'), 'Cal', 'Image button - image text');
	inp.focus();
	ok($('#ui-datepicker-div:visible').length == 0, 'Image button - not rendered on focus');
	image.click();
	ok($('#ui-datepicker-div:visible').length > 0, 'Image button - rendered on image click');
	image.click();
	ok($('#ui-datepicker-div:visible').length == 0, 'Image button - hidden on second image click');
	inp.datepicker('hide').datepicker('destroy');
	// On both
	inp = init('#inp', {showTrigger: '<button><img src="img/calendar.gif"></button>'});
	ok($('#ui-datepicker-div:visible').length == 0, 'Both - initially hidden');
	button = inp.siblings('button');
	ok(button.length == 1, 'Both - button present');
	image = inp.siblings('img');
	ok(image.length == 0, 'Both - image absent');
	image = button.children('img');
	ok(image.length == 1, 'Both - button image present');
	inp.focus();
	ok($('#ui-datepicker-div:visible').length > 0, 'Both - rendered on focus');
	body.click();
	ok($('#ui-datepicker-div:visible').length == 0, 'Both - hidden on external click');
	button.click();
	ok($('#ui-datepicker-div:visible').length > 0, 'Both - rendered on button click');
	button.click();
	ok($('#ui-datepicker-div:visible').length == 0, 'Both - hidden on second button click');
	inp.datepicker('hide').datepicker('destroy');
});

test('otherMonths', function() {
	expect(8);
	var inp = init('#inp');
	inp.val('06/01/2009').datepicker('show');
	var pop = $('#ui-datepicker-div');
	equal(pop.find('tbody').text(), '\u00a0123456789101112131415161718192021222324252627282930\u00a0\u00a0\u00a0\u00a0',
		'Other months - none');
	ok(pop.find('td:last span').length == 1 && $.trim(pop.find('td:last span').text()) == '', 'Other months - no content');
	inp.datepicker('hide').datepicker('option', 'showOtherMonths', true).datepicker('show');
	var pop = $('#ui-datepicker-div');
	equal(pop.find('tbody').text(), '311234567891011121314151617181920212223242526272829301234',
		'Other months - show');
	ok(pop.find('td:last span').length == 1 && $.trim(pop.find('td:last span').text()) != '', 'Other months - span content');
	inp.datepicker('hide').datepicker('option', 'selectOtherMonths', true).datepicker('show');
	var pop = $('#ui-datepicker-div');
	equal(pop.find('tbody').text(), '311234567891011121314151617181920212223242526272829301234',
		'Other months - select');
	ok(pop.find('td:last a').length == 1 && $.trim(pop.find('td:last a').text()) != '', 'Other months - link content');
	inp.datepicker('hide').datepicker('option', 'showOtherMonths', false).datepicker('show');
	var pop = $('#ui-datepicker-div');
	equal(pop.find('tbody').text(), '\u00a0123456789101112131415161718192021222324252627282930\u00a0\u00a0\u00a0\u00a0',
		'Other months - none');
	ok(pop.find('td:last span').length == 1 && $.trim(pop.find('td:last span').text()) == '', 'Other months - no content');
});

test('defaultDate', function() {
	expect(17);
	var inp = init('#inp');
	var date = new Date();
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date, 'Default date null');
	// Numeric values
	inp.datepicker('option', {defaultDate: -2}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 2);
	equalDate(inp.datepicker('getDate'), date, 'Default date -2');
	inp.datepicker('option', {defaultDate: 3}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 5);
	equalDate(inp.datepicker('getDate'), date, 'Default date 3');
	inp.datepicker('option', {defaultDate: 1 / 0}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 3);
	equalDate(inp.datepicker('getDate'), date, 'Default date Infinity');
	inp.datepicker('option', {defaultDate: 1 / 'a'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date, 'Default date NaN');
	// String offset values
	inp.datepicker('option', {defaultDate: '-1d'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 1);
	equalDate(inp.datepicker('getDate'), date, 'Default date -1d');
	inp.datepicker('option', {defaultDate: '+3D'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 4);
	equalDate(inp.datepicker('getDate'), date, 'Default date +3D');
	inp.datepicker('option', {defaultDate: ' -2 w '}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = new Date();
	date.setDate(date.getDate() - 14);
	equalDate(inp.datepicker('getDate'), date, 'Default date -2 w');
	inp.datepicker('option', {defaultDate: '+1 W'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 21);
	equalDate(inp.datepicker('getDate'), date, 'Default date +1 W');
	inp.datepicker('option', {defaultDate: ' -1 m '}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = addMonths(new Date(), -1);
	equalDate(inp.datepicker('getDate'), date, 'Default date -1 m');
	inp.datepicker('option', {defaultDate: '+2M'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = addMonths(new Date(), 2);
	equalDate(inp.datepicker('getDate'), date, 'Default date +2M');
	inp.datepicker('option', {defaultDate: '-2y'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = new Date();
	date.setFullYear(date.getFullYear() - 2);
	equalDate(inp.datepicker('getDate'), date, 'Default date -2y');
	inp.datepicker('option', {defaultDate: '+1 Y '}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setFullYear(date.getFullYear() + 3);
	equalDate(inp.datepicker('getDate'), date, 'Default date +1 Y');
	inp.datepicker('option', {defaultDate: '+1M +10d'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = addMonths(new Date(), 1);
	date.setDate(date.getDate() + 10);
	equalDate(inp.datepicker('getDate'), date, 'Default date +1M +10d');
	// String date values
	inp.datepicker('option', {defaultDate: '07/04/2007'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = new Date(2007, 7 - 1, 4);
	equalDate(inp.datepicker('getDate'), date, 'Default date 07/04/2007');
	inp.datepicker('option', {dateFormat: 'yy-mm-dd', defaultDate: '2007-04-02'}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = new Date(2007, 4 - 1, 2);
	equalDate(inp.datepicker('getDate'), date, 'Default date 2007-04-02');
	// Date value
	date = new Date(2007, 1 - 1, 26);
	inp.datepicker('option', {dateFormat: 'mm/dd/yy', defaultDate: date}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date, 'Default date 01/26/2007');
});

test('miscellaneous', function() {
	expect(16);
	var inp = init('#inp');
	// Year range
	var genRange = function(start, offset) {
		var range = '';
		for (var i = start; i < start + offset; i++) {
			range += i;
		}
		return range;
	};
	var curYear = new Date().getFullYear();
	inp.val('02/04/2008').datepicker('show');
	ok($('#ui-datepicker-div .ui-datepicker-month-year:last').length == 0,
		'Year range - read-only default');
	inp.datepicker('hide').datepicker('option', {changeMonth: true}).datepicker('show');		
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(2008 - 10, 21), 'Year range - changeable default');
	inp.datepicker('hide').datepicker('option', {yearRange: 'c-6:c+2', changeMonth: true}).datepicker('show');
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(2008 - 6, 9), 'Year range - c-6:c+2');
	inp.datepicker('hide').datepicker('option', {yearRange: '2000:2010', changeMonth: true}).datepicker('show');
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(2000, 11), 'Year range - 2000:2010');
	inp.datepicker('hide').datepicker('option', {yearRange: '-5:+3', changeMonth: true}).datepicker('show');
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(curYear - 5, 9), 'Year range - -5:+3');
	inp.datepicker('hide').datepicker('option', {yearRange: '2000:-5', changeMonth: true}).datepicker('show');
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(2000, curYear - 2004), 'Year range - 2000:-5');
	inp.datepicker('hide').datepicker('option', {yearRange: '', changeMonth: true}).datepicker('show');
	equal($('#ui-datepicker-div .ui-datepicker-month-year:last').text(),
		genRange(curYear, 1), 'Year range - blank');

	// Navigation as date format
	inp = init('#inp', {renderer: $.ui.datepicker.buttonsRenderer});
	inp.focus();
	equal($('#ui-datepicker-div .ui-datepicker-cmd-prev').text(), '<Prev', 'Navigation prev - default');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-today').text(), 'Today', 'Navigation today - default');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-next').text(), 'Next>', 'Navigation next - default');
	inp.datepicker('hide').datepicker('option', {commandsAsDateFormat: true,
		prevText: '< M', todayText: 'MM', nextText: 'M >'}).
		val('02/04/2008').datepicker('show');
	var longNames = $.ui.datepicker.regional[''].monthNames;
	var shortNames = $.ui.datepicker.regional[''].monthNamesShort;
	var date = new Date();
	equal($('#ui-datepicker-div .ui-datepicker-cmd-prev').text(), '< ' + shortNames[0],
		'Navigation prev - as date format');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-today').text(),
		longNames[date.getMonth()], 'Navigation today - as date format');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-next').text(),
		shortNames[2] + ' >', 'Navigation next - as date format');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal($('#ui-datepicker-div .ui-datepicker-cmd-prev').text(),
		'< ' + shortNames[1], 'Navigation prev - as date format + pgdn');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-today').text(),
		longNames[date.getMonth()], 'Navigation today - as date format + pgdn');
	equal($('#ui-datepicker-div .ui-datepicker-cmd-next').text(),
		shortNames[3] + ' >', 'Navigation next - as date format + pgdn');
});

test('minMax', function() {
	expect(17);
	var inp = init('#inp');
	var lastYear = new Date(2007, 6 - 1, 4);
	var nextYear = new Date(2009, 6 - 1, 4);
	var minDate = new Date(2008, 2 - 1, 29);
	var maxDate = new Date(2008, 12 - 1, 7);
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), lastYear,
		'Min/max - null, null - ctrl+pgup');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), nextYear,
		'Min/max - null, null - ctrl+pgdn');
	inp.datepicker('option', {minDate: minDate}).
		datepicker('hide').val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), minDate,
		'Min/max - 02/29/2008, null - ctrl+pgup');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), nextYear,
		'Min/max - 02/29/2008, null - ctrl+pgdn');
	inp.datepicker('option', {maxDate: maxDate}).
		datepicker('hide').val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), minDate,
		'Min/max - 02/29/2008, 12/07/2008 - ctrl+pgup');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), maxDate,
		'Min/max - 02/29/2008, 12/07/2008 - ctrl+pgdn');
	inp.datepicker('option', {minDate: null}).
		datepicker('hide').val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), lastYear,
		'Min/max - null, 12/07/2008 - ctrl+pgup');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), maxDate,
		'Min/max - null, 12/07/2008 - ctrl+pgdn');
	// Relative dates
	var date = new Date();
	date.setDate(date.getDate() - 7);
	inp.datepicker('option', {minDate: '-1w', maxDate: '+1 M +10 D '}).
		datepicker('hide').val('').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date,
		'Min/max - -1w, +1 M +10 D - ctrl+pgup');
	date = addMonths(new Date(), 1);
	date.setDate(date.getDate() + 10);
	inp.val('').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date,
		'Min/max - -1w, +1 M +10 D - ctrl+pgdn');
	// With existing date
	inp = init('#inp');
	inp.val('06/04/2008').datepicker('option', {minDate: minDate});
	equalDate(inp.datepicker('getDate'), new Date(2008, 6 - 1, 4), 'Min/max - setDate > min');
	inp.datepicker('option', {minDate: null}).val('01/04/2008').datepicker('option', {minDate: minDate});
	equalDate(inp.datepicker('getDate'), minDate, 'Min/max - setDate < min');
	inp.datepicker('option', {minDate: null}).val('06/04/2008').datepicker('option', {maxDate: maxDate});
	equalDate(inp.datepicker('getDate'), new Date(2008, 6 - 1, 4), 'Min/max - setDate < max');
	inp.datepicker('option', {maxDate: null}).val('01/04/2009').datepicker('option', {maxDate: maxDate});
	equalDate(inp.datepicker('getDate'), maxDate, 'Min/max - setDate > max');
	inp.datepicker('option', {maxDate: null}).val('01/04/2008').datepicker('option', {minDate: minDate, maxDate: maxDate});
	equalDate(inp.datepicker('getDate'), minDate, 'Min/max - setDate < min');
	inp.datepicker('option', {maxDate: null}).val('06/04/2008').datepicker('option', {minDate: minDate, maxDate: maxDate});
	equalDate(inp.datepicker('getDate'), new Date(2008, 6 - 1, 4), 'Min/max - setDate > min, < max');
	inp.datepicker('option', {maxDate: null}).val('01/04/2009').datepicker('option', {minDate: minDate, maxDate: maxDate});
	equalDate(inp.datepicker('getDate'), maxDate, 'Min/max - setDate > max');
});

test('setDate', function() {
	expect(26);
	var inp = init('#inp');
	var date1 = new Date(2008, 6 - 1, 4);
	var date2 = new Date();
	equal(inp.datepicker('getDate'), null, 'Set date - default');
	inp.datepicker('setDate', date1);
	equalDate(inp.datepicker('getDate'), date1, 'Set date - 2008-06-04');
	date1 = new Date();
	date1.setDate(date1.getDate() + 7);
	inp.datepicker('setDate', +7);
	equalDate(inp.datepicker('getDate'), date1, 'Set date - +7');
	date2.setFullYear(date2.getFullYear() + 2);
	inp.datepicker('setDate', '+2y');
	equalDate(inp.datepicker('getDate'), date2, 'Set date - +2y');
	inp.datepicker('setDate', date1, date2);
	equalDate(inp.datepicker('getDate'), date1, 'Set date - two dates');
	inp.datepicker('setDate');
	ok(inp.datepicker('getDate') == null, 'Set date - null');
	// Relative to current date
	date1 = new Date();
	date1.setDate(date1.getDate() + 7);
	inp.datepicker('setDate', 'c +7');
	equalDate(inp.datepicker('getDate'), date1, 'Set date - c +7');
	date1.setDate(date1.getDate() + 7);
	inp.datepicker('setDate', 'c+7');
	equalDate(inp.datepicker('getDate'), date1, 'Set date - c+7');
	date1.setDate(date1.getDate() - 21);
	inp.datepicker('setDate', 'c -3 w');
	equalDate(inp.datepicker('getDate'), date1, 'Set date - c -3 w');
	// Inline
	var inl = init('#inl');
	date1 = new Date(2008, 6 - 1, 4);
	date2 = new Date();
	equal(inl.datepicker('getDate'), null, 'Set date inline - default');
	inl.datepicker('setDate', date1);
	equalDate(inl.datepicker('getDate'), date1, 'Set date inline - 2008-06-04');
	date1 = new Date();
	date1.setDate(date1.getDate() + 7);
	inl.datepicker('setDate', +7);
	equalDate(inl.datepicker('getDate'), date1, 'Set date inline - +7');
	date2.setFullYear(date2.getFullYear() + 2);
	inl.datepicker('setDate', '+2y');
	equalDate(inl.datepicker('getDate'), date2, 'Set date inline - +2y');
	inl.datepicker('setDate', date1, date2);
	equalDate(inl.datepicker('getDate'), date1, 'Set date inline - two dates');
	inl.datepicker('setDate');
	ok(inl.datepicker('getDate') == null, 'Set date inline - null');
	// Alternate field
	var alt = $('#alt');
	inp.datepicker('option', {altField: '#alt', altFormat: 'yyyy-mm-dd'});
	date1 = new Date(2008, 6 - 1, 4);
	inp.datepicker('setDate', date1);
	equal(inp.val(), '06/04/2008', 'Set date alternate - 06/04/2008');
	equal(alt.val(), '2008-06-04', 'Set date alternate - 2008-06-04');
	// With minimum/maximum
	var expectError = function(callback, message, error) {
		try {
			callback();
			ok(false, message);
		}
		catch (e) {
			equal(e, error, message);
		}
	};
	inp = init('#inp');
	date1 = new Date(2008, 1 - 1, 4);
	date2 = new Date(2008, 3 - 1, 4);
	var date3 = new Date(2008, 6 - 1, 4);
	var minDate = new Date(2008, 2 - 1, 29);
	var maxDate = new Date(2008, 3 - 1, 28);
	inp.val('').datepicker('option', {minDate: minDate});
	expectError(function() { inp.val('').datepicker('setDate', date1); },
		'Set date with min - setDate < min', 'Date is out of allowed range');
	inp.val('').datepicker('setDate', date2);
	equalDate(inp.datepicker('getDate'), date2, 'Set date with min - setDate > min');
	inp.val('').datepicker('setDate', date3);
	equalDate(inp.datepicker('getDate'), date3, 'Set date with min - setDate >> min');
	inp.val('').datepicker('option', {maxDate: maxDate, minDate: null}).datepicker('setDate', date1);
	equalDate(inp.datepicker('getDate'), date1, 'Set date with max - setDate << max');
	inp.val('').datepicker('setDate', date2);
	equalDate(inp.datepicker('getDate'), date2, 'Set date with max - setDate < max');
	expectError(function() { inp.val('').datepicker('setDate', date3); },
		'Set date with max - setDate > max', 'Date is out of allowed range');
	inp.val('').datepicker('option', {minDate: minDate});
	expectError(function() { inp.val('').datepicker('setDate', date1); },
		'Set date with min/max - setDate < min', 'Date is out of allowed range');
	inp.val('').datepicker('setDate', date2);
	equalDate(inp.datepicker('getDate'), date2, 'Set date with min/max - min < setDate < max');
	expectError(function() { inp.val('').datepicker('setDate', date3); },
		'Set date with min/max - setDate > max', 'Date is out of allowed range');
});

test('altField', function() {
	expect(14);
	var inp = init('#inp');
	var alt = $('#alt');
	// No alternate field set
	alt.val('');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - enter');
	equal(alt.val(), '', 'Alt field - alt not set');
	// Alternate field set
	alt.val('');
	inp.datepicker('option', {altField: '#alt', altFormat: 'yyyy-mm-dd'}).
		val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - enter');
	equal(alt.val(), '2008-06-04', 'Alt field - alt - enter');
	// Move from initial date
	alt.val('');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '07/04/2008', 'Alt field - dp - pgdn');
	equal(alt.val(), '2008-07-04', 'Alt field - alt - pgdn');
	// Alternate field set - closed
	alt.val('');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - pgdn/esc');
	equal(alt.val(), '', 'Alt field - alt - pgdn/esc');
	// Clear date and alternate
	alt.val('');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equal(inp.val(), '', 'Alt field - dp - ctrl+end');
	equal(alt.val(), '', 'Alt field - alt - ctrl+end');
	// Verify alt field is updated on keyup
	alt.val('');
	inp.val('06/04/2008').datepicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keyup', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - manual entry');
	equal(alt.val(), '2008-06-04', 'Alt field - manual entry');
	// Verify alt field is not updated on keyup if date is invalid
	inp.val('12/04/');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keyup', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '12/04/', 'Alt field - dp - manual entry incomplete');
	equal(alt.val(), '2008-06-04', 'Alt field - manual entry - not updated');
});

test('autoSize', function() {
	expect(15);
	var inp = init('#inp');
	equal(inp.attr('size'), 0, 'Auto size - default');
	inp.datepicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - mm/dd/yyyy');
	inp.datepicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - m/d/yyyy');
	inp.datepicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 15, 'Auto size - D M d yyyy');
	inp.datepicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 29, 'Auto size - DD, MM dd, yyyy');
	inp.removeAttr('size');
	// French
	inp.datepicker('option', $.extend({autoSize: false}, $.ui.datepicker.regional['fr']));
	equal(inp.attr('size'), 0, 'Auto size - fr - default');
	inp.datepicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - fr - dd/mm/yyyy');
	inp.datepicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - fr - m/d/yyyy');
	inp.datepicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 15, 'Auto size - fr - D M d yyyy');
	inp.datepicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 28, 'Auto size - fr - DD, MM dd, yyyy');
	inp.removeAttr('size');
	// Hebrew
	inp.datepicker('option', $.extend({autoSize: false}, $.ui.datepicker.regional['he']));
	equal(inp.attr('size'), 0, 'Auto size - he - default');
	inp.datepicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - he - dd/mm/yyyy');
	inp.datepicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - he - m/d/yyyy');
	inp.datepicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 14, 'Auto size - he - D M d yyyy');
	inp.datepicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 23, 'Auto size - he - DD, MM dd, yyyy');
	inp.removeAttr('size');
});

test('daylightSaving', function() {
	expect(25);
	var inp = init('#inp');
	ok(true, 'Daylight saving - ' + new Date());
	// Australia, Sydney - AM change, southern hemisphere
	inp.val('04/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(6) a').click();
	equal(inp.val(), '04/05/2008', 'Daylight saving - Australia 04/05/2008');
	inp.val('04/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(7) a').click();
	equal(inp.val(), '04/06/2008', 'Daylight saving - Australia 04/06/2008');
	inp.val('04/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(8) a').click();
	equal(inp.val(), '04/07/2008', 'Daylight saving - Australia 04/07/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(6) a').click();
	equal(inp.val(), '10/04/2008', 'Daylight saving - Australia 10/04/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(7) a').click();
	equal(inp.val(), '10/05/2008', 'Daylight saving - Australia 10/05/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(8) a').click();
	equal(inp.val(), '10/06/2008', 'Daylight saving - Australia 10/06/2008');
	// Brasil, Brasilia - midnight change, southern hemisphere
	inp.val('02/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(20) a').click();
	equal(inp.val(), '02/16/2008', 'Daylight saving - Brasil 02/16/2008');
	inp.val('02/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(21) a').click();
	equal(inp.val(), '02/17/2008', 'Daylight saving - Brasil 02/17/2008');
	inp.val('02/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(22) a').click();
	equal(inp.val(), '02/18/2008', 'Daylight saving - Brasil 02/18/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(13) a').click();
	equal(inp.val(), '10/11/2008', 'Daylight saving - Brasil 10/11/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(14) a').click();
	equal(inp.val(), '10/12/2008', 'Daylight saving - Brasil 10/12/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(15) a').click();
	equal(inp.val(), '10/13/2008', 'Daylight saving - Brasil 10/13/2008');
	// Lebanon, Beirut - midnight change, northern hemisphere
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(34) a').click();
	equal(inp.val(), '03/29/2008', 'Daylight saving - Lebanon 03/29/2008');
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(35) a').click();
	equal(inp.val(), '03/30/2008', 'Daylight saving - Lebanon 03/30/2008');
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(36) a').click();
	equal(inp.val(), '03/31/2008', 'Daylight saving - Lebanon 03/31/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(27) a').click();
	equal(inp.val(), '10/25/2008', 'Daylight saving - Lebanon 10/25/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(28) a').click();
	equal(inp.val(), '10/26/2008', 'Daylight saving - Lebanon 10/26/2008');
	inp.val('10/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(29) a').click();
	equal(inp.val(), '10/27/2008', 'Daylight saving - Lebanon 10/27/2008');
	// US, Eastern - AM change, northern hemisphere
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(13) a').click();
	equal(inp.val(), '03/08/2008', 'Daylight saving - US 03/08/2008');
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(14) a').click();
	equal(inp.val(), '03/09/2008', 'Daylight saving - US 03/09/2008');
	inp.val('03/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(15) a').click();
	equal(inp.val(), '03/10/2008', 'Daylight saving - US 03/10/2008');
	inp.val('11/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(6) a').click();
	equal(inp.val(), '11/01/2008', 'Daylight saving - US 11/01/2008');
	inp.val('11/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(7) a').click();
	equal(inp.val(), '11/02/2008', 'Daylight saving - US 11/02/2008');
	inp.val('11/01/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar td:eq(8) a').click();
	equal(inp.val(), '11/03/2008', 'Daylight saving - US 11/03/2008');
});

var beforeDayThis = null;
var beforeDayOK = true;

function beforeDay(date) {
	beforeDayThis = this;
	beforeDayOK &= (date > new Date(2008, 1 - 1, 26) && date < new Date(2008, 3 - 1, 6));
	return {selectable: (date.getDate() % 2 == 0), dateClass: (date.getDate() % 10 == 0 ? 'day10' : ''),
		title: (date.getDate() % 3 == 0 ? 'Divisble by 3' : '')};
}

function calcWeek(date) {
	var doy = date.getDate() + 6;
	for (var m = date.getMonth() - 1; m >= 0; m--)
		doy += $.ui.datepicker._getDaysInMonth(date.getFullYear(), m);
	// Simple count from 01/01 starting at week 1
	return Math.floor(doy / 7);
}

test('callbacks', function() {
	expect(8);
	// on date
	inp = init('#inp', {onDate: beforeDay});
	inp.val('02/04/2008').datepicker('show');
	var dp = $('#ui-datepicker-div');
	ok(beforeDayThis.id == inp[0].id, 'Before show day - this OK');
	ok(beforeDayOK, 'Before show day - dates OK');
	var day20 = dp.find('.ui-datepicker-calendar td :contains("20")');
	var day21 = dp.find('.ui-datepicker-calendar td :contains("21")');
	ok(day20.is('a'), 'Before show day - unselectable 20');
	ok(day21.is('span'), 'Before show day - unselectable 21');
	ok(day20.is('.day10'), 'Before show day - CSS 20');
	ok(!day21.is('.day10'), 'Before show day - CSS 21');
	equal(day20.attr('title'), 'Select Wednesday, Feb 20, 2008', 'Before show day - title 20');
	equal(day21.attr('title'), 'Divisble by 3', 'Before show day - title 21');
	inp.datepicker('hide').datepicker('destroy');
});

test('localisation', function() {
	expect(24);
	var inp = init('#inp', $.ui.datepicker.regional['fr']);
	inp.datepicker('option', {dateFormat: 'DD, d MM yyyy',
		renderer: $.ui.datepicker.buttonsRenderer, changeMonth: true}).
		val('').datepicker('show');
	var dp = $('#ui-datepicker-div');
	equal($('.ui-datepicker-cmd-close', dp).text(), 'Fermer', 'Localisation - close');
	equal($('.ui-datepicker-cmd-prev', dp).text(), '<Préc', 'Localisation - previous');
	equal($('.ui-datepicker-cmd-today', dp).text(), 'Aujourd\'hui', 'Localisation - today');
	equal($('.ui-datepicker-cmd-next', dp).text(), 'Suiv>', 'Localisation - next');
	var month = 0;
	$('.ui-datepicker-month-year:first option', dp).each(function() {
		equal($(this).text(), $.ui.datepicker.regional['fr'].monthNamesShort[month],
			'Localisation - month ' + month);
		month++;
	});
	var day = 1;
	$('.ui-datepicker-calendar th', dp).each(function() {
		equal($(this).text(), $.ui.datepicker.regional['fr'].dayNamesMin[day],
			'Localisation - day ' + day);
		day = (day + 1) % 7;
	});
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	var date = new Date();
	equal(inp.val(), $.ui.datepicker.regional['fr'].dayNames[date.getDay()] + ', ' +
		date.getDate() + ' ' + $.ui.datepicker.regional['fr'].monthNames[date.getMonth()] +
		' ' + date.getFullYear(), 'Localisation - formatting');
});

test('noWeekends', function() {
	expect(31);
	for (var i = 1; i <= 31; i++) {
		var date = new Date(2001, 1 - 1, i);
		deepEqual($.ui.datepicker.noWeekends(date), {selectable: (i + 1) % 7 >= 2},
			'No weekends ' + date);
	}
});

test('iso8601Week', function() {
	expect(12);
	var date = new Date(2000, 12 - 1, 31);
	equal($.ui.datepicker.iso8601Week(date), 52, 'ISO 8601 week ' + date);
	date = new Date(2001, 1 - 1, 1);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
	date = new Date(2001, 1 - 1, 7);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
	date = new Date(2001, 1 - 1, 8);
	equal($.ui.datepicker.iso8601Week(date), 2, 'ISO 8601 week ' + date);
	date = new Date(2003, 12 - 1, 28);
	equal($.ui.datepicker.iso8601Week(date), 52, 'ISO 8601 week ' + date);
	date = new Date(2003, 12 - 1, 29);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
	date = new Date(2004, 1 - 1, 4);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
	date = new Date(2004, 1 - 1, 5);
	equal($.ui.datepicker.iso8601Week(date), 2, 'ISO 8601 week ' + date);
	date = new Date(2009, 12 - 1, 28);
	equal($.ui.datepicker.iso8601Week(date), 53, 'ISO 8601 week ' + date);
	date = new Date(2010, 1 - 1, 3);
	equal($.ui.datepicker.iso8601Week(date), 53, 'ISO 8601 week ' + date);
	date = new Date(2010, 1 - 1, 4);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
	date = new Date(2010, 1 - 1, 10);
	equal($.ui.datepicker.iso8601Week(date), 1, 'ISO 8601 week ' + date);
});

test('parseDate', function() {
	expect(22);
	init('#inp');
	equal($.ui.datepicker.parseDate('d m yy', ''), null, 'Parse date empty');
	equalDate($.ui.datepicker.parseDate('d m yy', '3 2 01'),
		new Date(2001, 2 - 1, 3), 'Parse date d m yy');
	equalDate($.ui.datepicker.parseDate('dd mm yyyy', '03 02 2001'),
		new Date(2001, 2 - 1, 3), 'Parse date dd mm yyyy');
	equalDate($.ui.datepicker.parseDate('d m yy', '13 12 01'),
		new Date(2001, 12 - 1, 13), 'Parse date d m yy');
	equalDate($.ui.datepicker.parseDate('dd mm yyyy', '13 12 2001'),
		new Date(2001, 12 - 1, 13), 'Parse date dd mm yyyy');
	equalDate($.ui.datepicker.parseDate('yy-o', '2001-34'),
		new Date(2001, 2 - 1, 3), 'Parse date yy-o');
	equalDate($.ui.datepicker.parseDate('yyyy-oo', '2001-347'),
		new Date(2001, 12 - 1, 13), 'Parse date yyyy oo');
	equalDate($.ui.datepicker.parseDate('oo yyyy', '348 2004'),
		new Date(2004, 12 - 1, 13), 'Parse date oo-yyyy');
	equalDate($.ui.datepicker.parseDate('D d M yy', 'Sat 3 Feb 01'),
		new Date(2001, 2 - 1, 3), 'Parse date D d M yy');
	equalDate($.ui.datepicker.parseDate('d MM DD yyyy', '3 February Saturday 2001'),
		new Date(2001, 2 - 1, 3), 'Parse date dd MM DD yyyy');
	equalDate($.ui.datepicker.parseDate('DD, MM d, yyyy', 'Saturday, February 3, 2001'),
		new Date(2001, 2 - 1, 3), 'Parse date DD, MM d, yyyy');
	equalDate($.ui.datepicker.parseDate('\'day\' d \'of\' MM (\'\'DD\'\'), yyyy',
		'day 3 of February (\'Saturday\'), 2001'), new Date(2001, 2 - 1, 3),
		'Parse date \'day\' d \'of\' MM (\'\'DD\'\'), yyyy');
	equalDate($.ui.datepicker.parseDate('yy-m-d', '01-02-03'),
		new Date(2001, 2 - 1, 3), 'Parse date yy-m-d - default cutoff');
	equalDate($.ui.datepicker.parseDate('yy-m-d', '51-02-03'),
		new Date(1951, 2 - 1, 3), 'Parse date yy-m-d - default cutoff');
	equalDate($.ui.datepicker.parseDate('yy-m-d', '51-02-03', {shortYearCutoff: 80}),
		new Date(2051, 2 - 1, 3), 'Parse date yy-m-d - cutoff 80');
	equalDate($.ui.datepicker.parseDate('yy-m-d', '51-02-03', {shortYearCutoff: '+60'}),
		new Date(2051, 2 - 1, 3), 'Parse date yy-m-d - cutoff +60');
	var gmtDate = new Date(2001, 2 - 1, 3);
	gmtDate.setMinutes(gmtDate.getMinutes() - gmtDate.getTimezoneOffset());
	equalDate($.ui.datepicker.parseDate('@', '981158400'), gmtDate, 'Parse date @');
	equalDate($.ui.datepicker.parseDate('!', '631167552000000000'), gmtDate, 'Parse date !');
	var fr = $.ui.datepicker.regional['fr'];
	var settings = {dayNamesShort: fr.dayNamesShort, dayNames: fr.dayNames,
		monthNamesShort: fr.monthNamesShort, monthNames: fr.monthNames};
	equalDate($.ui.datepicker.parseDate('D d M yy', 'Lun 9 Avr 01', settings),
		new Date(2001, 4 - 1, 9), 'Parse date D M yy with settings');
	equalDate($.ui.datepicker.parseDate('d MM DD yyyy', '9 Avril Lundi 2001', settings),
		new Date(2001, 4 - 1, 9), 'Parse date d MM DD yyyy with settings');
	equalDate($.ui.datepicker.parseDate('DD, MM d, yyyy', 'Lundi, Avril 9, 2001', settings),
		new Date(2001, 4 - 1, 9), 'Parse date DD, MM d, yy with settings');
	equalDate($.ui.datepicker.parseDate('\'jour\' d \'de\' MM (\'\'DD\'\'), yyyy',
		'jour 9 de Avril (\'Lundi\'), 2001', settings), new Date(2001, 4 - 1, 9),
		'Parse date \'jour\' d \'de\' MM (\'\'DD\'\'), yyyy with settings');
});

test('parseDateErrors', function() {
	expect(17);
	init('#inp');
	var expectError = function(callback, value, error) {
		try {
			callback();
			ok(false, 'Parsed error ' + value);
		}
		catch (e) {
			equal(e, error, 'Parsed error ' + value);
		}
	};
	expectError(function() { $.ui.datepicker.parseDate(null, 'Sat 2 01'); },
		'Sat 2 01', 'Invalid arguments');
	expectError(function() { $.ui.datepicker.parseDate('d m yy', null); },
		'null', 'Invalid arguments');
	expectError(function() { $.ui.datepicker.parseDate('d m yy', 'Sat 2 01'); },
		'Sat 2 01 - d m yy', 'Missing number at position 0');
	expectError(function() { $.ui.datepicker.parseDate('dd mm yyyy', 'Sat 2 01'); },
		'Sat 2 01 - dd mm yyyy', 'Missing number at position 0');
	expectError(function() { $.ui.datepicker.parseDate('d m yy', '3 Feb 01'); },
		'3 Feb 01 - d m yy', 'Missing number at position 2');
	expectError(function() { $.ui.datepicker.parseDate('dd mm yyyy', '3 Feb 01'); },
		'3 Feb 01 - dd mm yyyy', 'Missing number at position 2');
	expectError(function() { $.ui.datepicker.parseDate('d m yy', '3 2 AD01'); },
		'3 2 AD01 - d m yy', 'Missing number at position 4');
	expectError(function() { $.ui.datepicker.parseDate('d m yyyy', '3 2 AD01'); },
		'3 2 AD01 - dd mm yyyy', 'Missing number at position 4');
	expectError(function() { $.ui.datepicker.parseDate('yy-o', '2001-D01'); },
		'2001-D01 - yy-o', 'Missing number at position 5');
	expectError(function() { $.ui.datepicker.parseDate('yyyy-oo', '2001-D01'); },
		'2001-D01 - yyyy-oo', 'Missing number at position 5');
	expectError(function() { $.ui.datepicker.parseDate('D d M yy', 'D7 3 Feb 01'); },
		'D7 3 Feb 01 - D d M yy', 'Unknown name at position 0');
	expectError(function() { $.ui.datepicker.parseDate('D d M yy', 'Sat 3 M2 01'); },
		'Sat 3 M2 01 - D d M yy', 'Unknown name at position 6');
	expectError(function() { $.ui.datepicker.parseDate('DD, MM d, yyyy', 'Saturday- Feb 3, 2001'); },
		'Saturday- Feb 3, 2001 - DD, MM d, yyyy', 'Unexpected literal at position 8');
	expectError(function() { $.ui.datepicker.parseDate('\'day\' d \'of\' MM (\'\'DD\'\'), yyyy',
		'day 3 of February ("Saturday"), 2001'); },
		'day 3 of Mon2 ("Day7"), 2001', 'Unexpected literal at position 19');
	expectError(function() { $.ui.datepicker.parseDate('d m yy', '29 2 01'); },
		'29 2 01 - d m yy', 'Invalid date');
	var fr = $.ui.datepicker.regional['fr'];
	var settings = {dayNamesShort: fr.dayNamesShort, dayNames: fr.dayNames,
		monthNamesShort: fr.monthNamesShort, monthNames: fr.monthNames};
	expectError(function() { $.ui.datepicker.parseDate('D d M yy', 'Mon 9 Avr 01', settings); },
		'Mon 9 Avr 01 - D d M yy', 'Unknown name at position 0');
	expectError(function() { $.ui.datepicker.parseDate('D d M yy', 'Lun 9 Apr 01', settings); },
		'Lun 9 Apr 01 - D d M yy', 'Unknown name at position 6');
});

test('formatDate', function() {
	expect(16);
	init('#inp');
	equal($.ui.datepicker.formatDate('d m yy', new Date(2001, 2 - 1, 3)),
		'3 2 01', 'Format date d m yy');
	equal($.ui.datepicker.formatDate('dd mm yyyy', new Date(2001, 2 - 1, 3)),
		'03 02 2001', 'Format date dd mm yyyy');
	equal($.ui.datepicker.formatDate('d m yy', new Date(2001, 12 - 1, 13)),
		'13 12 01', 'Format date d m yy');
	equal($.ui.datepicker.formatDate('dd mm yyyy', new Date(2001, 12 - 1, 13)),
		'13 12 2001', 'Format date dd mm yyyy');
	equal($.ui.datepicker.formatDate('yyyy-o', new Date(2001, 2 - 1, 3)),
		'2001-34', 'Format date yyyy-o');
	equal($.ui.datepicker.formatDate('yyyy-oo', new Date(2001, 2 - 1, 3)),
		'2001-034', 'Format date yyyy-oo');
	equal($.ui.datepicker.formatDate('D M yy', new Date(2001, 2 - 1, 3)),
		'Sat Feb 01', 'Format date D M yy');
	equal($.ui.datepicker.formatDate('DD MM yyyy', new Date(2001, 2 - 1, 3)),
		'Saturday February 2001', 'Format date DD MM yyyy');
	equal($.ui.datepicker.formatDate('DD, MM d, yyyy', new Date(2001, 2 - 1, 3)),
		'Saturday, February 3, 2001', 'Format date DD, MM d, yyyy');
	equal($.ui.datepicker.formatDate('\'day\' d \'of\' MM (\'\'DD\'\'), yyyy',
		new Date(2001, 2 - 1, 3)), 'day 3 of February (\'Saturday\'), 2001',
		'Format date \'day\' d \'of\' MM (\'\'DD\'\'), yyyy');
	var gmtDate = new Date(2001, 2 - 1, 3);
	gmtDate.setMinutes(gmtDate.getMinutes() - gmtDate.getTimezoneOffset());
	equal($.ui.datepicker.formatDate('@', gmtDate), '981158400', 'Format date @');
	equal($.ui.datepicker.formatDate('!', gmtDate), '631167552000000000', 'Format date !');
	var fr = $.ui.datepicker.regional['fr'];
	var settings = {dayNamesShort: fr.dayNamesShort, dayNames: fr.dayNames,
		monthNamesShort: fr.monthNamesShort, monthNames: fr.monthNames};
	equal($.ui.datepicker.formatDate('D M yy', new Date(2001, 4 - 1, 9), settings),
		'Lun Avr 01', 'Format date D M yy with settings');
	equal($.ui.datepicker.formatDate('DD MM yyyy', new Date(2001, 4 - 1, 9), settings),
		'Lundi Avril 2001', 'Format date DD MM yyyy with settings');
	equal($.ui.datepicker.formatDate('DD, MM d, yyyy', new Date(2001, 4 - 1, 9), settings),
		'Lundi, Avril 9, 2001', 'Format date DD, MM d, yyyy with settings');
	equal($.ui.datepicker.formatDate('\'jour\' d \'de\' MM (\'\'DD\'\'), yyyy',
		new Date(2001, 4 - 1, 9), settings), 'jour 9 de Avril (\'Lundi\'), 2001',
		'Format date \'jour\' d \'de\' MM (\'\'DD\'\'), yyyy with settings');
});

})(jQuery);
