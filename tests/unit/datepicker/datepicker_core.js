/*
 * datepicker_core.js
 */

function equalDate(d1, d2, message) {
	if (!d1 || !d2) {
		ok(false, message + ' - missing date');
		return;
	}
	d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
	d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
	equal(d1.toString(), d2.toString(), message);
}

function equalDateArray(a1, a2, message) {
	if (!a1 || !a2) {
		ok(false, message + ' - missing dates');
		return;
	}
	a1[0] = (a1[0] ? new Date(a1[0].getFullYear(), a1[0].getMonth(), a1[0].getDate()) : '');
	a1[1] = (a1[1] ? new Date(a1[1].getFullYear(), a1[1].getMonth(), a1[1].getDate()) : '');
	a2[0] = (a2[0] ? new Date(a2[0].getFullYear(), a2[0].getMonth(), a2[0].getDate()) : '');
	a2[1] = (a2[1] ? new Date(a2[1].getFullYear(), a2[1].getMonth(), a2[1].getDate()) : '');
	same(a1, a2, message);
}

function normaliseDate(date) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}

function addMonths(date, offset) {
	var maxDay = 32 - new Date(date.getFullYear(), date.getMonth() + offset, 32).getDate();
	date.setDate(Math.min(date.getDate(), maxDay));
	date.setMonth(date.getMonth() + offset);
	return date;
}

function init(id, options) {
	$.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['']);
	return $(id).datepicker('destroy').datepicker($.extend({showAnim: ''}, options || {}));
}

var PROP_NAME = 'datepicker';

(function($) {

module("datepicker: core", {
	teardown: function() {
		stop();
		setTimeout(start, 13);
	}
});

test('destroy', function() {
	expect(6);
	var inp = init('#inp');
	inp.focus();
	var dp = $('#ui-datepicker-div');
	ok(dp.length > 0, 'Create - popup exists');
	ok(inp.hasClass('ui-datepicker'), 'Create - has marker');
	ok($.data(inp[0], 'datepicker') != null, 'Create - has data');
	inp.datepicker('destroy');
	dp = $('#ui-datepicker-div');
	ok(dp.length == 0, 'Destroy - popup gone');
	ok(!inp.hasClass('ui-datepicker'), 'Destroy - has no marker');
	ok($.data(inp[0], 'datepicker') == null, 'Destroy - has no data');
});

test('base structure', function() {
	expect(57);
	var iframe = ($.browser.msie && parseInt($.browser.version) < 7);
	var inp = init('#inp');
	inp.focus();
	var dp = $('#ui-datepicker-div');
	ok(dp.is(':visible'), 'Structure - datepicker visible');
	ok(!dp.is('.ui-datepicker-rtl'), 'Structure - not right-to-left');
	ok(!dp.is('.ui-datepicker-multi'), 'Structure - not multi-month');
	equal(dp.children().length, 4 + (iframe ? 1 : 0), 'Structure - child count');
	
	var cmd = dp.children(':first');
	ok(cmd.is('a.ui-datepicker-cmd-prev'), 'Structure - prev link');
	cmd = cmd.next();
	ok(cmd.is('a.ui-datepicker-cmd-next'), 'Structure - next link');

	var row = cmd.next();
	ok(row.is('div.ui-datepicker-row-break'), 'Structure - row division');
	equal(row.children().length, 1, 'Structure - row child count');
	var group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure - group division');
	equal(group.children().length, 2, 'Structure - group child count');
	var header = group.children(':first');
	ok(header.is('div.ui-datepicker-header'), 'Structure - header division');
	equal(header.children().length, 0, 'Structure - header child count');
	
	var table = group.children(':last');
	ok(table.is('table.ui-datepicker-calendar'), 'Structure - month table');
	ok(table.children(':first').is('thead'), 'Structure - month table thead');
	var thead = table.children(':first').children(':first');
	ok(thead.is('tr'), 'Structure - month table title row');
	equal(thead.find('th').length, 7, 'Structure - month table title cells');
	ok(table.children(':eq(1)').is('tbody'), 'Structure - month table body');
	ok(table.children(':eq(1)').children('tr').length >= 4, 'Structure - month table week count');
	var week = table.children(':eq(1)').children(':first');
	ok(week.is('tr'), 'Structure - month table week row');
	equal(week.children().length, 7, 'Structure - week child count');
	ok(week.children(':first').children(':first').is('span.ui-datepicker-week-end'),
		'Structure - month table first day cell');
	ok(week.children(':last').children(':first').is('a.ui-datepicker-week-end'),
		'Structure - month table last day cell');
	ok(dp.children('iframe').length == (iframe ? 1 : 0), 'Structure - iframe');
	inp.datepicker('hide').datepicker('destroy');
	
	// Multi-month 2
	inp = init('#inp', {monthsToShow: 2});
	inp.focus();
	dp = $('#ui-datepicker-div');
	ok(dp.is('.ui-datepicker-multi'), 'Structure multi [2] - multi-month');
	equal(dp.children().length, 4 + (iframe ? 1 : 0), 'Structure multi [2] - child count');
	row = dp.children(':eq(2)');
	ok(row.is('div.ui-datepicker-row-break'), 'Structure multi [2] - row division');
	equal(row.children().length, 2, 'Structure multi [2] - row child count');
	var group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2] - first month division');
	group = group.next();
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2] - second month division');
	inp.datepicker('hide').datepicker('destroy');
	
	// Multi-month [2, 2]
	inp = init('#inp', {monthsToShow: [2, 2]});
	inp.focus();
	dp = $('#ui-datepicker-div');
	ok(dp.is('.ui-datepicker-multi'), 'Structure multi [2,2] - multi-month');
	equal(dp.children().length, 5 + (iframe ? 1 : 0), 'Structure multi [2,2] - child count');
	row = dp.children(':eq(2)');
	ok(row.is('div.ui-datepicker-row-break'), 'Structure multi [2,2] - first row division');
	equal(row.children().length, 2, 'Structure multi [2,2] - row child count');
	group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2,2] - first month division');
	group = group.next();
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2,2] - second month division');
	row = row.next();
	ok(row.is('div.ui-datepicker-row-break'), 'Structure multi [2,2] - second row division');
	equal(row.children().length, 2, 'Structure multi [2,2] - row child count');
	group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2,2] - third month division');
	group = group.next();
	ok(group.is('div.ui-datepicker-group'), 'Structure multi [2,2] - fourth month division');
	inp.datepicker('hide').datepicker('destroy');
	
	// Inline
	var inl = init('#inl');
	dp = inl.children();
	ok(dp.is('.ui-datepicker-inline'), 'Structure inline - main div');
	ok(!dp.is('.ui-datepicker-rtl'), 'Structure inline - not right-to-left');
	ok(!dp.is('.ui-datepicker-multi'), 'Structure inline - not multi-month');
	equal(dp.children().length, 4, 'Structure inline - child count');
	cmd = dp.children(':first');
	ok(cmd.is('a.ui-datepicker-cmd-prev'), 'Structure inline - prev link');
	cmd = cmd.next();
	ok(cmd.is('a.ui-datepicker-cmd-next'), 'Structure inline - next link');
	row = cmd.next();
	ok(row.is('div.ui-datepicker-row-break'), 'Structure inline - row division');
	equal(row.children().length, 1, 'Structure inline - row child count');
	group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure inline - group division');
	equal(group.children().length, 2, 'Structure inline - group child count');
	header = group.children(':first');
	ok(header.is('div.ui-datepicker-header'), 'Structure inline - header division');
	equal(header.children().length, 0, 'Structure inline - header child count');
	table = group.children(':last');
	ok(table.is('table.ui-datepicker-calendar'), 'Structure inline - month table');
	inl.datepicker('destroy');
	
	// Inline multi-month
	inl = init('#inl', {monthsToShow: 2});
	dp = inl.children();
	ok(dp.is('.ui-datepicker-inline') && dp.is('.ui-datepicker-multi'), 'Structure inline multi - main div');	
	equal(dp.children().length, 4 + (iframe ? 1 : 0), 'Structure inline multi - child count');
	row = dp.children(':eq(2)');
	ok(row.is('div.ui-datepicker-row-break'), 'Structure inline multi - row division');
	var group = row.children(':first');
	ok(group.is('div.ui-datepicker-group'), 'Structure inline multi - first month division');
	group = group.next();
	ok(group.is('div.ui-datepicker-group'), 'Structure inline multi - second month division');
	inl.datepicker('destroy');
});

test('custom structure', function() {
	expect(10);
	var iframe = ($.browser.msie && parseInt($.browser.version) < 7);
	// Check right-to-left localisation
	var inp = init('#inp', $.ui.datepicker.regional['he']);
	inp.focus();
	var dp = $('#ui-datepicker-div');
	ok(dp.is('.ui-datepicker-rtl'), 'Structure RTL - right-to-left');
	var cmd = dp.children(':first');
	ok(cmd.is('a.ui-datepicker-cmd-prev'), 'Structure RTL - prev link');
	cmd = cmd.next();
	ok(cmd.is('a.ui-datepicker-cmd-next'), 'Structure RTL - next link');
	inp.datepicker('hide').datepicker('destroy');
	
	// Selectable month/year
	inp = init('#inp', {changeMonth: true});
	inp.focus();
	dp = $('#ui-datepicker-div');
	var header = dp.find('div.ui-datepicker-header');
	equal(header.children().length, 2, 'Structure - header child count');
	ok(header.children(':first').is('select.ui-datepicker-month-year'), 'Structure - month selector');
	ok(header.children(':last').is('select.ui-datepicker-month-year'), 'Structure - year selector');
	inp.datepicker('hide').datepicker('destroy');
	
	// Editable year
	inp = init('#inp', {changeMonth: true, yearRange: 'any'});
	inp.focus();
	dp = $('#ui-datepicker-div');
	header = dp.find('div.ui-datepicker-header');
	equal(header.children().length, 3, 'Structure - header child count');
	ok(header.children(':first').is('select.ui-datepicker-month-year'), 'Structure - month selector');
	ok(header.children(':eq(1)').is('select.ui-datepicker-month-year.ui-datepicker-any-year'), 'Structure - year selector');
	ok(header.children(':last').is('input.ui-datepicker-month-year'), 'Structure - year entry');
	inp.datepicker('hide').datepicker('destroy');
	
	// Trigger!!!
});

test('keystrokes', function() {
	expect(25);
	var inp = init('#inp');
	var date = new Date();
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date, 'Keystroke enter');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 4),
		'Keystroke enter - preset');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), date, 'Keystroke ctrl+home');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	ok(inp.datepicker('getDate') == null, 'Keystroke ctrl+end');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	ok(inp.datepicker('getDate') == null, 'Keystroke esc');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 4),
		'Keystroke esc - preset');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 4),
		'Keystroke esc - abandoned');
	// Moving by day or week
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_LEFT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 1);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke ctrl+left');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_LEFT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 1);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke left');
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_RIGHT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 1);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke ctrl+right');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_RIGHT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 1);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke right');
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 7);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke ctrl+up');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 7);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke up');
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 7);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke ctrl+down');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() - 7);
	equalDate(inp.datepicker('getDate'), date, 'Keystroke down');
	// Moving by month or year
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 1 - 1, 4),
		'Keystroke pgup');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 3 - 1, 4),
		'Keystroke pgdn');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2007, 2 - 1, 4),
		'Keystroke ctrl+pgup');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2009, 2 - 1, 4),
		'Keystroke ctrl+pgdn');
	// Check for moving to short months
	inp.val('03/31/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 29),
		'Keystroke pgup - Feb');
	inp.val('01/30/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 29), 
		'Keystroke pgdn - Feb');
	inp.val('02/29/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2007, 2 - 1, 28),
		'Keystroke ctrl+pgup - Feb');
	inp.val('02/29/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2009, 2 - 1, 28),
		'Keystroke ctrl+pgdn - Feb');
	// Change steps
	inp.datepicker('option', {monthsToStep: 2}).
		datepicker('hide').val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2007, 12 - 1, 4),
		'Keystroke pgup step 2');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(inp.datepicker('getDate'), new Date(2008, 4 - 1, 4),
		'Keystroke pgdn step 2');
});

test('mouse', function() {
	expect(15);
	var inp = init('#inp', {renderer: $.ui.datepicker.buttonsRenderer});
	var date = new Date();
	inp.val('').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(10)').click();
	date.setDate(10);
	equalDate(inp.datepicker('getDate'), date, 'Mouse click');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(12)').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 12), 'Mouse click - preset');
	inp.val('').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-close').click();
	ok(inp.datepicker('getDate') == null, 'Mouse click - close');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-close').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 4), 'Mouse click - close + preset');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div a.ui-datepicker-prev').click();
	$('#ui-datepicker-div .ui-datepicker-cmd-close').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 4), 'Mouse click - abandoned');
	// Current/previous/next
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-today').click();
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(14)').click();
	date.setDate(14);
	equalDate(inp.datepicker('getDate'), date, 'Mouse click - today');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-prev').click();
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(16)').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 1 - 1, 16), 'Mouse click - previous');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-next').click();
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(18)').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 3 - 1, 18), 'Mouse click - next');
	// Previous/next with minimum/maximum
	inp.datepicker('option', {minDate: new Date(2008, 2 - 1, 2),
		maxDate: new Date(2008, 2 - 1, 26)}).val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-prev').click();
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(16)').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 16),
		'Mouse click - previous + min/max');
	inp.val('02/04/2008').datepicker('show');
	$('#ui-datepicker-div .ui-datepicker-cmd-next').click();
	$('#ui-datepicker-div .ui-datepicker-calendar tbody a:contains(18)').click();
	equalDate(inp.datepicker('getDate'), new Date(2008, 2 - 1, 18),
		'Mouse click - next + min/max');
	// Inline
	var inl = init('#inl', {renderer: $.ui.datepicker.buttonsRenderer});
	date = new Date();
	inl.datepicker('setDate', date);
	$('.ui-datepicker-inline .ui-datepicker-calendar tbody a:contains(10)').click();
	date.setDate(10);
	equalDate(inl.datepicker('getDate'), date, 'Mouse click inline');
	inl.datepicker('setDate', new Date(2008, 2 - 1, 4));
	$('.ui-datepicker-inline .ui-datepicker-calendar tbody a:contains(12)').click();
	equalDate(inl.datepicker('getDate'), new Date(2008, 2 - 1, 12), 'Mouse click inline - preset');
	$('.ui-datepicker-inline .ui-datepicker-cmd-today').click();
	$('.ui-datepicker-inline .ui-datepicker-calendar tbody a:contains(14)').click();
	date.setDate(14);
	equalDate(inl.datepicker('getDate'), date, 'Mouse click inline - today');
	inl.datepicker('setDate', new Date(2008, 2 - 1, 4));
	$('.ui-datepicker-inline .ui-datepicker-cmd-prev').click();
	$('.ui-datepicker-inline .ui-datepicker-calendar tbody a:contains(16)').click();
	equalDate(inl.datepicker('getDate'), new Date(2008, 1 - 1, 16),
		'Mouse click inline - previous');
	inl.datepicker('setDate', new Date(2008, 2 - 1, 4));
	$('.ui-datepicker-inline .ui-datepicker-cmd-next').click();
	$('.ui-datepicker-inline .ui-datepicker-calendar tbody a:contains(18)').click();
	equalDate(inl.datepicker('getDate'), new Date(2008, 3 - 1, 18),
		'Mouse click inline - next');
});

})(jQuery);
