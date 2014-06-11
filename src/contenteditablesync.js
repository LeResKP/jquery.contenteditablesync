/*
 * contenteditablesync
 * https://github.com/LeResKP/jquery.contenteditablesync
 *
 * Copyright (c) 2014 Aurélien Matouillot
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.contenteditablesync = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.contenteditablesync = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.contenteditablesync.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.contenteditablesync.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].contenteditablesync = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
