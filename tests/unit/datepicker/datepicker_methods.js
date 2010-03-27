/*
 * datepicker_methods.js
 */
(function($) {

module("datepicker: methods", {
	teardown: function() {
		stop();
		setTimeout(start, 13);
	}
});

test('date functions', function() {
	expect(111);
	// daysInMonth
	var dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	for (var m = 1; m <= 12; m++) {
		equal($.ui.datepicker.daysInMonth(2007, m), dim[m - 1], 'Days in month ' + m + '/2007');
		var date = $.ui.datepicker.newDate(2007, m, m + 10); 
		equal($.ui.datepicker.daysInMonth(date), dim[m - 1], 'Days in month ' + date);
	}
	dim[1] = 29;
	for (var m = 1; m <= 12; m++) {
		equal($.ui.datepicker.daysInMonth(2008, m), dim[m - 1], 'Days in month ' + m + '/2008');
		var date = $.ui.datepicker.newDate(2008, m, m + 10); 
		equal($.ui.datepicker.daysInMonth(date), dim[m - 1], 'Days in month ' + date);
	}
	// dayOfYear
	var doy = [[$.ui.datepicker.newDate(2007, 1, 1), 1], [$.ui.datepicker.newDate(2007, 3, 1), 60],
		[$.ui.datepicker.newDate(2007, 12, 31), 365], [$.ui.datepicker.newDate(2008, 1, 1), 1],
		[$.ui.datepicker.newDate(2008, 3, 1), 61], [$.ui.datepicker.newDate(2008, 12, 31), 366]];
	for (var i = 0; i < doy.length; i++) {
		var date = doy[i][0];
		equal($.ui.datepicker.dayOfYear(date), doy[i][1], 'Day of year ' + date);
		equal($.ui.datepicker.dayOfYear(date.getFullYear(), date.getMonth() + 1, date.getDate()), doy[i][1],
			'Day of year ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
	}
	// iso8601Week
	var woy = [[$.ui.datepicker.newDate(2000, 12, 31), 52], [$.ui.datepicker.newDate(2001, 1, 1), 1],
		[$.ui.datepicker.newDate(2001, 1, 7), 1], [$.ui.datepicker.newDate(2001, 1, 8), 2],
		[$.ui.datepicker.newDate(2003, 12, 28), 52], [$.ui.datepicker.newDate(2003, 12, 29), 1],
		[$.ui.datepicker.newDate(2004, 1, 4), 1], [$.ui.datepicker.newDate(2004, 1, 5), 2],
		[$.ui.datepicker.newDate(2009, 12, 28), 53], [$.ui.datepicker.newDate(2010, 1, 3), 53],
		[$.ui.datepicker.newDate(2010, 1, 4), 1], [$.ui.datepicker.newDate(2010, 1, 10), 1]];
	for (var i = 0; i < woy.length; i++) {
		var date = woy[i][0];
		equal($.ui.datepicker.iso8601Week(date), woy[i][1], 'Week of year ' + date);
		equal($.ui.datepicker.iso8601Week(date.getFullYear(), date.getMonth() + 1, date.getDate()),
			woy[i][1], 'Week of year ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
	}
	// today
	var date = $.ui.datepicker.newDate();
	equalDate(date, normaliseDate(new Date()), 'Today');
	equal(date.getHours(), 0, 'Today - hours');
	equal(date.getMinutes(), 0, 'Today - minutes');
	equal(date.getSeconds(), 0, 'Today - seconds');
	equal(date.getMilliseconds(), 0, 'Today - milliseconds');
	// newDate
	var date1 = new Date(2010, 1-1, 26, 12, 34, 56);
	date = $.ui.datepicker.newDate(date1);
	equalDate(date, normaliseDate(date1), 'New date 2010-01-26 12:34:56');
	equal(date.getHours(), 0, 'New date - hours');
	equal(date.getMinutes(), 0, 'New date - minutes');
	equal(date.getSeconds(), 0, 'New date - seconds');
	equal(date.getMilliseconds(), 0, 'New date - milliseconds');
	date1 = new Date(2010, 12-1, 1);
	date = $.ui.datepicker.newDate(2010, 12, 1);
	equalDate(date, date1, 'New date 2010-12-01');
	equal(date.getHours(), 0, 'New date - hours');
	equal(date.getMinutes(), 0, 'New date - minutes');
	equal(date.getSeconds(), 0, 'New date - seconds');
	equal(date.getMilliseconds(), 0, 'New date - milliseconds');
	// add
	date = $.ui.datepicker.newDate(2009, 1, 2);
	equalDate($.ui.datepicker.add(date, 1, 'y'), $.ui.datepicker.newDate(2010, 1, 2), 'Add 1 y');
	equalDate($.ui.datepicker.add(date, -2, 'y'), $.ui.datepicker.newDate(2008, 1, 2), 'Add -2 y');
	equalDate($.ui.datepicker.add(date, 1, 'm'), $.ui.datepicker.newDate(2008, 2, 2), 'Add 1 m');
	equalDate($.ui.datepicker.add(date, -2, 'm'), $.ui.datepicker.newDate(2007, 12, 2), 'Add -2 m');
	equalDate($.ui.datepicker.add(date, 1, 'w'), $.ui.datepicker.newDate(2007, 12, 9), 'Add 1 w');
	equalDate($.ui.datepicker.add(date, -2, 'w'), $.ui.datepicker.newDate(2007, 11, 25), 'Add -2 w');
	equalDate($.ui.datepicker.add(date, 1, 'd'), $.ui.datepicker.newDate(2007, 11, 26), 'Add 1 d');
	equalDate($.ui.datepicker.add(date, -2, 'd'), $.ui.datepicker.newDate(2007, 11, 24), 'Add -2 d');
	equalDate($.ui.datepicker.add($.ui.datepicker.add($.ui.datepicker.add($.ui.datepicker.add(date, 1, 'd'), 1, 'w'), 1, 'm'), 1, 'y'),
		$.ui.datepicker.newDate(2009, 1, 2), 'Add 1 d, 1 w, 1 m, 1 y');
	equalDate($.ui.datepicker.add($.ui.datepicker.newDate(2008, 2, 20), 2, 'w'),
		$.ui.datepicker.newDate(2008, 3, 5), 'Add 2 w over leap day');
	equalDate($.ui.datepicker.add($.ui.datepicker.newDate(2008, 1, 31), 1, 'm'),
		$.ui.datepicker.newDate(2008, 2, 29), 'Add 1 m for leap day');
	equalDate($.ui.datepicker.add($.ui.datepicker.newDate(2008, 2, 29), 1, 'y'),
		$.ui.datepicker.newDate(2009, 2, 28), 'Add 1 y to leap day');
});

test('destroy', function() {
	expect(20);
	var inp = init('#inp');
	ok(inp.hasClass('ui-datepicker'), 'Default - marker class set');
	ok($.data(inp[0], PROP_NAME), 'Default - instance present');
	ok(inp.next().is('#alt'), 'Default - trigger absent');
	inp.datepicker('destroy');
	inp = $('#inp');
	ok(!inp.hasClass('ui-datepicker'), 'Default - marker class cleared');
	ok(!$.data(inp[0], PROP_NAME), 'Default - instance absent');
	ok(inp.next().is('#alt'), 'Default - trigger absent');
	// With trigger
	inp = init('#inp', {showTrigger: '<img src="xxx">'});
	ok(inp.hasClass('ui-datepicker'), 'Trigger - marker class set');
	ok($.data(inp[0], PROP_NAME), 'Trigger - instance present');
	ok(inp.next().is('img'), 'Trigger - trigger added');
	inp.datepicker('destroy');
	inp = $('#inp');
	ok(!inp.hasClass('ui-datepicker'), 'Trigger - marker class cleared');
	ok(!$.data(inp[0], PROP_NAME), 'Trigger - instance absent');
	ok(inp.next().is('#alt'), 'Trigger - trigger removed');
	// Inline
	var inl = init('#inl');
	ok(inl.hasClass('ui-datepicker'), 'Inline - marker class set');
	ok(inl.html() != '', 'Inline - datepicker present');
	ok($.data(inl[0], PROP_NAME), 'Inline - instance present');
	ok(inl.next().length == 0 || inl.next().is('p'), 'Inline - trigger absent');
	inl.datepicker('destroy');
	inl = $('#inl');
	ok(!inl.hasClass('ui-datepicker'), 'Inline - marker class cleared');
	ok(inl.html() == '', 'Inline - datepicker absent');
	ok(!$.data(inl[0], PROP_NAME), 'Inline - instance absent');
	ok(inl.next().length == 0 || inl.next().is('p'), 'Inline - trigger absent');
});

test('enableDisable', function() {
	expect(30);
	var inp = init('#inp');
	ok(!inp.datepicker('isDisabled'), 'Enable/disable - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable - field initially enabled');
	inp.datepicker('disable');
	ok(inp.datepicker('isDisabled'), 'Enable/disable - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable - field now disabled');
	inp.datepicker('enable');
	ok(!inp.datepicker('isDisabled'), 'Enable/disable - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable - field now enabled');
	inp.datepicker('destroy');
	// With a button trigger
	inp = init('#inp', {showTrigger: '<button>XXX</button>'});
	ok(!inp.datepicker('isDisabled'), 'Enable/disable button - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable button - field initially enabled');
	ok(!inp.next('button')[0].disabled, 'Enable/disable button - button initially enabled');
	inp.datepicker('disable');
	ok(inp.datepicker('isDisabled'), 'Enable/disable button - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable button - field now disabled');
	ok(inp.next('button')[0].disabled, 'Enable/disable button - button now disabled');
	inp.datepicker('enable');
	ok(!inp.datepicker('isDisabled'), 'Enable/disable button - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable button - field now enabled');
	ok(!inp.next('button')[0].disabled, 'Enable/disable button - button now enabled');
	inp.datepicker('destroy');
	// With an image trigger
	inp = init('#inp', {showTrigger: '<img src="xxx">'});
	ok(!inp.datepicker('isDisabled'), 'Enable/disable image - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable image - field initially enabled');
	ok(inp.next('img').css('opacity') == 1, 'Enable/disable image - image initially enabled');
	inp.datepicker('disable');
	ok(inp.datepicker('isDisabled'), 'Enable/disable image - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable image - field now disabled');
	ok(inp.next('img').css('opacity') != 1, 'Enable/disable image - image now disabled');
	inp.datepicker('enable');
	ok(!inp.datepicker('isDisabled'), 'Enable/disable image - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable image - field now enabled');
	ok(inp.next('img').css('opacity') == 1, 'Enable/disable image - image now enabled');
	inp.datepicker('destroy');
	// Inline
	var inl = init('#inl');
	ok(!inl.datepicker('isDisabled'), 'Enable/disable inline - initially marked as enabled');
	ok(!inl.children().hasClass('ui-datepicker-disabled'), 'Enable/disable inline - not visually disabled initially');
	inl.datepicker('disable');
	ok(inl.datepicker('isDisabled'), 'Enable/disable inline - now marked as disabled');
	ok(inl.children().hasClass('ui-datepicker-disabled'), 'Enable/disable inline - visually disabled');
	inl.datepicker('enable');
	ok(!inl.datepicker('isDisabled'), 'Enable/disable inline - now marked as enabled');
	ok(!inl.children().hasClass('ui-datepicker-disabled'), 'Enable/disable inline - not visiually disabled');
	inl.datepicker('destroy');
});

})(jQuery);
