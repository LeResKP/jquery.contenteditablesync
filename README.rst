Contenteditablesync
===================

Use this plugin to synchronize the contenteditable's text content to a target like a textarea.

Getting Started
---------------
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/LeResKP/jquery.contenteditablesync/master/dist/contenteditablesync.min.js
[max]: https://raw.github.com/LeResKP/jquery.contenteditablesync/master/dist/contenteditablesync.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/contenteditablesync.min.js"></script>
<script>
jQuery(function($) {
  $('div[contenteditable]').contenteditablesync();
});
</script>
```

Options
-------

`interval`: The interval time in seconds between the checks of the content's change.
