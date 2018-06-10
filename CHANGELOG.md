# oMenu changelog
starting with version 1.2.0 will be guided changelog.
Dates formated with european format DD.MM.YYYY

### Version 1.2.0 _(09.06.2018)_
Rewrited internal communication, now components uses events system to
talk each other. It was caused by the need to adding events like:
mouseover, click etc. to menu slices, in effect external api was changed
for more user friendly.

**Changes**
*  _(breaking change)_ From now oMenu doesn't open automaticly with `contextmenu` event. It
needs to be provided by the user, then we call on instance returned by
 external api `open(ev, dynamicOptions)` to open menu.
*  **onOpen, onClose, onEndCloseAnimation** _(breaking change)_ callbacks has removed. If you want pass dynamic options
when menu opens, put them in second parameter of `open` method mentioned
before.
*  **on** new method has come to api, it works exactly like well
known equivalents from other libraries. Accepts two params - string with
event name and callback function. Callback functions gets in first param
oMenu special Event class instance. Below list of all available events:
      * `sliceClick`
      * `sliceEnter`
      * `sliceLeave`
      * `openMenu`
      * `closeMenu`
      * `hideAnimationEnd`
      * `showAnimationEnd`
*  while onOpen callback and automatic open on event has been removed,
automatic close on event stays, because it is very common behavior
which changes very rarely or even never
*  _(breaking change)_ Slices `value` property has renamed to `data`.
Data property should be use to identify which slice has emited event,
and to transfer additional data. It can be everything, oMenu don't care
about data passed in `data` property.
Property value is delivered with oMenu Event instance in `on` method,
Event is passed as first param to each callback function used with `on`.
*  build system updated to webpack 4, which resulted  in error in
library used by oMenu to manage svg elemnts (svg.js). Lib not support
new ES5 ability to set constructor function `this` to undefined
rather than reference it to global object (like `window` in browser)
when it is called without `new` keyword. I sent pull request and issue,
you can see it [here](https://github.com/svgdotjs/svg.js/issues/866)
* **positioningMode** _(breaking change)_ new option available in menu
settings. Tells menu how to positioning on page, takes two possible
values:
  *  `relativeToParent` - **default** menu behavior will be similar
to css absolute element (menu) positionig in relative parent (menu
parent element)
  *  `relativeToScreen` - menu behavior will be similar to css `position:
 fixed`
