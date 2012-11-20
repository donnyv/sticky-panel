/*
*   jQuery.stickyPanel
*   ----------------------
*   version: 1.5.0
*   date: 11/19/12
*
*   Copyright (c) 2011 Donny Velazquez
*   http://donnyvblog.blogspot.com/
*   http://code.google.com/p/sticky-panel/
*   
*   Licensed under the Apache License 2.0
*
*   revisions
*   -----------------------
*   11/19/12 - re-architect plugin to use jquery.com best practices http://docs.jquery.com/Plugins/Authoring
*
*/
(function ($) {

    var methods = {

        options: {
            // Use this to set the top margin of the detached panel.
            topPadding: 0,

            // This class is applied when the panel detaches.
            afterDetachCSSClass: "",

            // When set to true the space where the panel was is kept open.
            savePanelSpace: false

        },
        init: function (options) {
            var options = $.extend({}, methods.options, options);

            return this.each(function () {
                var id = Math.ceil(Math.random() * 9999); /* Pick random number between 1 and 9999 */
                $(this).data("stickyPanel.state", {
                    stickyPanelId: id,
                    isDetached: false,
                    options: options
                });

                $(window).bind("scroll.stickyPanel_" + id, {
                    selected: $(this)
                }, methods.scroll);
            });
        },
        scroll: function (event) {
            var node = event.data.selected;
            var o = node.data("stickyPanel.state").options//event.data.options;

            var windowHeight = $(window).height();
            var nodeHeight = node.outerHeight(true);
            var scrollTop = $(document).scrollTop();
            var docHeight = $(document).height();
            var HeightDiff = docHeight - windowHeight;

            var topdiff = node.position().top - o.topPadding;
            var TopDiff = topdiff < 0 ? 0 : topdiff;

            var isDetached = node.data("stickyPanel.state").isDetached;

            // when top of window reaches the top of the panel detach
            if (scrollTop <= HeightDiff && // Fix for rubberband scrolling in Safari on Lion
        	    scrollTop > TopDiff &&
                !isDetached) {

                node.data("stickyPanel.state").isDetached = true;

                // topPadding
                var newNodeTop = 0;
                if (o.topPadding != "undefined") {
                    newNodeTop = newNodeTop + o.topPadding;
                }

                // get left before adding spacer
                var nodeLeft = node.offset().left;

                // save panels top
                node.data("PanelsTop", node.offset().top - newNodeTop);

                // MOVED: savePanelSpace before afterDetachCSSClass to handle afterDetachCSSClass changing size of node
                // savePanelSpace
                if (o.savePanelSpace == true) {
                    var nodeWidth = node.outerWidth(true);
                    var nodeCssfloat = node.css("float");
                    var nodeCssdisplay = node.css("display");
                    var randomNum = Math.ceil(Math.random() * 9999); /* Pick random number between 1 and 9999 */
                    node.data("stickyPanel.PanelSpaceID", "stickyPanelSpace" + randomNum);
                    node.before("<div id='" + node.data("stickyPanel.PanelSpaceID") + "' style='width:" + nodeWidth + "px;height:" + nodeHeight + "px;float:" + nodeCssfloat + ";display:" + nodeCssdisplay + ";'>&nbsp;</div>");
                }

                // afterDetachCSSClass
                if (o.afterDetachCSSClass != "") {
                    node.addClass(o.afterDetachCSSClass);
                }

                // save inline css
                node.data("Original_Inline_CSS", (!node.attr("style") ? "" : node.attr("style")));

                // detach panel
                node.css({
                    "margin": 0,
                    "left": nodeLeft,
                    "top": newNodeTop,
                    "position": "fixed"
                });

            }

            // ADDED: css top check to avoid continuous reattachment
            if (scrollTop <= node.data("PanelsTop") &&
                node.css("top") != "auto" &&
                isDetached) {

                methods.unstick(node);
            }
        },
        unstick: function (nodeRef) {
            var node = nodeRef ? nodeRef : this; ;
            node.data("stickyPanel.state").isDetached = false;

            var o = node.data("stickyPanel.state").options;

            if (o.savePanelSpace == true) {
                $("#" + node.data("stickyPanel.PanelSpaceID")).remove();
            }

            // attach panel
            node.attr("style", node.data("Original_Inline_CSS"));

            if (o.afterDetachCSSClass != "") {
                node.removeClass(o.afterDetachCSSClass);
            }

            if (!nodeRef)
                methods._unstick(node);
        },
        _unstick: function (nodeRef) {
            $(window).unbind("scroll.stickyPanel_" + nodeRef.data("stickyPanel.state").stickyPanelId);
        }
    };

    $.fn.stickyPanel = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.stickyPanel');
        }
    };

})(jQuery);