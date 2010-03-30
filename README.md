jQuery UI Datepicker Refactor
=============================

I've refactored jQuery UI Datepicker to use the Widget framework that the other components use. Along with this refactoring I've introduced several other changes:

* Use of a templating mechanism to generate the datepicker layout.
* Use of commands to provide keystroke and UI elements for interacting with the datepicker.
* Use of the position plugin.
* Common date routines for general use.
* An extension module for less common usage requirements.
* Adobe AIR support (no inline event handlers).

Have a look at the demos section for datepicker to see the range of functionality.

For documentation on the templating see http://keith-wood.name/calendarsPickerRef.html#renderers, as the same mechanism is used. The templating is home grown at the moment, but should be moved to the official jQuery model once that has been established. The templating allows for the insertion or otherwise of command links and/or buttons. There are standard templates for the default layout and for one with a button pane.

For documentation on the commands see http://keith-wood.name/calendarsPickerRef.html#commandsobj, as the same mechanism is used. The use of commands makes it easy to extend the datepicker (as often requested) with custom buttons. It also associates keystrokes with the commands for keyboard-driven entry.

The common date routines are basically there to support the datepicker functionality but could be extracted into a separate module for more general use. They are: newDate, normaliseDate, daysInMonth, iso8601Week, dayOfYear, add, formatDate, parseDate, determineDate.

The extension module includes less common functionality: weekOfYearRenderer, noWeekends (onDate), changeFirstDay (onShow), hoverCallback (onShow), highlightWeek (onShow), showStatus (onShow).

Please comment on any and all of the features at http://forum.jquery.com/topic/jquery-ui-datepicker-refactor as we want to pin down what is eventually included in the next release.