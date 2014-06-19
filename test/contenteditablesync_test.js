(function($) {

  // We want the test faster!
  $.fn.contenteditablesync.Constructor.DEFAULTS.interval = 200;

  module('jQuery.contenteditablesync');

  test('is chainable', function() {
    expect(1);
    var $div = $('<div></div>');
    strictEqual($div.contenteditablesync(), $div, 'should be chainable');
  });

  test('Should sync the target', function() {
    expect(3);
    var $div = $('<div />').appendTo('#qunit-fixture');
    var $textarea = $('<textarea />').on('change.contenteditablesync', function(){
        ok(true, 'Content as changed');
    });
    $div.before($textarea);
    $div.contenteditablesync();

    $div.text('Hello world').contenteditablesync('sync');
    equal($textarea.text(), 'Hello world', 'target should be updated');

    $div.text('Hello world').contenteditablesync('sync');
    equal($textarea.text(), 'Hello world', 'nothing was changed, also it doesn\'t trigger change event');
  });

  test('The good target should be updated', function() {
    expect(2);
    var $div = $('<div />').appendTo('#qunit-fixture').data('target', '#textarea2');
    var $textarea1 = $('<textarea />');
    var $textarea2 = $('<textarea />').attr('id', 'textarea2');
    $div.after($textarea1);
    $div.after($textarea2);
    $div.contenteditablesync();

    $div.text('Hello world').contenteditablesync('sync');
    equal($textarea1.text(), '', 'textarea1 should not be updated');
    equal($textarea2.text(), 'Hello world', 'textarea2 should be updated');
  });

  test('Should active the watch on focus', function() {
    var $div = $('<div />').appendTo('#qunit-fixture');
    var $textarea = $('<textarea />');
    $div.before($textarea);
    $div.contenteditablesync();

    stop();
    $div.html('Hello world').triggerHandler('focus');
    setTimeout(function() {
        equal($textarea.text(), '', 'target should not be updated');
    }, 150);
    setTimeout(function() {
        equal($textarea.text(), 'Hello world', 'target should be updated');
        start();
    }, 250);
  });

  test('Should desactive the watch on focus', function() {
    var $div = $('<div />').appendTo('#qunit-fixture');
    var $textarea = $('<textarea />');
    $div.before($textarea);
    $div.contenteditablesync();

    stop();
    $div.html('Hello world').triggerHandler('focus');
    setTimeout(function() {
        equal($textarea.text(), 'Hello world', 'target should be updated');
        $div.text('Empty').triggerHandler('blur');
    }, 250);


    setTimeout(function() {
        equal($textarea.text(), 'Empty', 'target should not be updated');
        $div.text('New text');
    }, 500);

    setTimeout(function() {
        equal($textarea.text(), 'Empty', 'target should not be updated');
        start();
    }, 800);
  });

}(jQuery));
