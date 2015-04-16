# sticky-panel
jQuery plugin to stick any panel to the top of the screen while you scroll. It also lets you add a padding to the top and a css class to the panel when it detaches.

Demo: http://htmlpreview.github.io/?https://github.com/donnyv/sticky-panel/blob/master/jquery.stickyPanel/Main.htm

##Update
Other features have been added such as saving the panel space when detaching and events "onDetached" & "onReAttached" have been added. Both events will return a reference to the detached panel and "onDetached" will also return a reference to the spacer panel. Support for overflowing DIVs has been added also.

##Options
````javascript
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
