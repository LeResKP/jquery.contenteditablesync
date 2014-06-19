Contenteditablesync
===================

Use this plugin to synchronize the contenteditable's text content to a target like a textarea.

Getting Started
---------------

Download the `production version <https://raw.github.com/LeResKP/jquery.contenteditablesync/master/dist/contenteditablesync.min.js>`_ or the `development version <https://raw.github.com/LeResKP/jquery.contenteditablesync/master/dist/contenteditablesync.js>`_.


In the header of the web page::

    <script src="jquery.js"></script>
    <script src="dist/contenteditablesync.min.js"></script>
    <script>
    jQuery(function($) {
      $('div[contenteditable]').contenteditablesync();
    });
    </script>


Example of body of the web page::

    <textarea id="textarea1"></textarea>
    <div contenteditable="true" data-target="#textarea1"></div>


NOTE: If no data-target defined the plugin will synchronise with the previous element.


Options
-------

`interval`: (default: 2000ms) The interval time in milliseconds between the checks of the content's change.
