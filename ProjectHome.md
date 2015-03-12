jQuery plugin to stick any panel to the top of the screen while you scroll. It also lets you add a padding to the top and a css class to the panel when it detaches.

# **Update** #
Other features have been added such as saving the panel space when detaching and events "**onDetached**" & "**onReAttached**" have been added. Both events will return a reference to the detached panel and "**onDetached**" will also return a reference to the spacer panel. Support for overflowing DIVs has been added also.

**Works with jQuery 1.3.2 & 1.6.4**

# **Browser Support** #
IE 6,7,8,9 Google Chrome, Firefox, Safari, Opera

[Follow Me on Twitter](https://twitter.com/Donny_V)

![http://img59.imageshack.us/img59/8544/stickypanel2.jpg](http://img59.imageshack.us/img59/8544/stickypanel2.jpg)

# **Options** #
```
    var stickyPanelSettings = {
        // Use this to set the top margin of the detached panel.
        topPadding: 0,

        // This class is applied when the panel detaches.
        afterDetachCSSClass: "",

        // When set to true the space where the panel was is kept open.
        savePanelSpace: false,

        // Event fires when panel is detached
        // function(detachedPanel, panelSpacer){....}
        onDetached: null,

        // Event fires when panel is reattached
        // function(detachedPanel){....}
        onReAttached: null,

        // Set this using any valid jquery selector to 
        // set the parent of the sticky panel.
        // If set to null then the window object will be used.
        parentSelector: null
    };
```