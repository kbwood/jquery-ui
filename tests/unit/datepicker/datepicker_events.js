/*
 * datepicker_events.js
 */
(function($) {

module("datepicker: events", {
	teardown: function() {
		stop();
		setTimeout(start, 13);
	}
});

var selectedThis = null;
var selectedDate = null;

function callback(event, date) {
	selectedThis = this;
	selectedDate = date;
}

test('events', function() {
	expect(21);
	var inp = init('#inp', {select: callback});
	var date = new Date();
	// select
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(selectedThis, inp[0], 'Callback selected this');
	equalDate(selectedDate, date, 'Callback selected date');
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 7);
	equalDate(selectedDate, date, 'Callback selected date - ctrl+down');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(selectedDate, date, 'Callback selected date - esc');
	// changeMonthYear
	selectedThis = selectedDate = null;
	inp.datepicker('option', {changeMonthYear: callback, select: null}).
		val('').datepicker('show');
	date = new Date();
	date.setDate(1);
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 1);
	equal(selectedThis, inp[0], 'Callback change month/year this');
	equalDate(selectedDate, date, 'Callback change month/year date - pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	date.setFullYear(date.getFullYear() - 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME});
	date.setFullYear(date.getFullYear() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+home');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	date.setFullYear(date.getFullYear() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+pgdn');
	inp.datepicker('setDate', new Date(2007, 1 - 1, 26));
	equalDate(selectedDate, new Date(2007, 1 - 1, 1), 'Callback change month/year date - setDate');
	selectedDate = null;
	inp.datepicker('setDate', new Date(2007, 1 - 1, 12));
	equal(selectedDate, null, 'Callback change month/year date - setDate no change');
	// changeMonthYear step by 2
	selectedThis = selectedDate = null;
	inp.datepicker('option', {monthsToStep: 2}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 14);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 12);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - ctrl+pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 2);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 12);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - ctrl+pgdn');
	// close
	selectedThis = selectedDate = null;
	inp.datepicker('option', {close: callback, changeMonthYear: null, monthsToStep: 1}).
		val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(selectedThis, inp[0], 'Callback close this');
	deepEqual(selectedDate, {}, 'Callback close date - esc');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(selectedDate, new Date(), 'Callback close date - enter');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(selectedDate, new Date(2008, 2 - 1, 4), 'Callback close date - preset');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	deepEqual(selectedDate, {}, 'Callback close date - ctrl+end');
});

test('bindings', function() {
	expect(21);
	var inp = init('#inp');
	inp.bind('datepickerselect', callback);
	var date = new Date();
	// select
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(selectedThis, inp[0], 'Callback selected this');
	equalDate(selectedDate, date, 'Callback selected date');
	inp.val('').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.setDate(date.getDate() + 7);
	equalDate(selectedDate, date, 'Callback selected date - ctrl+down');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(selectedDate, date, 'Callback selected date - esc');
	// changeMonthYear
	selectedThis = selectedDate = null;
	inp.unbind('datepickerselect');
	inp.bind('datepickerchangemonthyear', callback);
	inp.val('').datepicker('show');
	date = new Date();
	date.setDate(1);
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 1);
	equal(selectedThis, inp[0], 'Callback change month/year this');
	equalDate(selectedDate, date, 'Callback change month/year date - pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	date.setFullYear(date.getFullYear() - 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME});
	date.setFullYear(date.getFullYear() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+home');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	date.setFullYear(date.getFullYear() + 1);
	equalDate(selectedDate, date, 'Callback change month/year date - ctrl+pgdn');
	inp.datepicker('setDate', new Date(2007, 1 - 1, 26));
	equalDate(selectedDate, new Date(2007, 1 - 1, 1), 'Callback change month/year date - setDate');
	selectedDate = null;
	inp.datepicker('setDate', new Date(2007, 1 - 1, 12));
	equal(selectedDate, null, 'Callback change month/year date - setDate no change');
	// changeMonthYear step by 2
	selectedThis = selectedDate = null;
	inp.datepicker('option', {monthsToStep: 2}).
		datepicker('hide').val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 14);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	date.setMonth(date.getMonth() - 12);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - ctrl+pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 2);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	date.setMonth(date.getMonth() + 12);
	equalDate(selectedDate, date, 'Callback change month/year by 2 date - ctrl+pgdn');
	// close
	selectedThis = selectedDate = null;
	inp.unbind('datepickerchangemonthyear');
	inp.bind('datepickerclose', callback);
	inp.datepicker('option', {monthsToStep: 1}).
		val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(selectedThis, inp[0], 'Callback close this');
	deepEqual(selectedDate, {}, 'Callback close date - esc');
	inp.val('').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalDate(selectedDate, new Date(), 'Callback close date - enter');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalDate(selectedDate, new Date(2008, 2 - 1, 4), 'Callback close date - preset');
	inp.val('02/04/2008').datepicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	deepEqual(selectedDate, {}, 'Callback close date - ctrl+end');
});

})(jQuery);
