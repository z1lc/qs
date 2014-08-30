define(['jquery', 'underscore', 'backbone', 'CoreView'], function($, _, Backbone, CoreView) {
    return Backbone.Router.extend({
        routes: {
            "dates/:from/:to": "navigateDate",
            "*actions": "defaultRoute"
        },

        navigateDate: function (from, to) {
            // Dim the screen, showing the loading indicator
            this._dimScreen(true);
            // Set the correct li to active
            $("li").removeClass('active');
            $("#" + from).addClass('active');
            $("#3m").addClass("active");

            var self = this;
            console.log('Requested dates from ' + from + ' to ' + to);
            
        },

        defaultRoute: function () {
            this.navigate('#/home/');
        },

        _dimScreen: function (show) {
            var $overlay = $("#loading-overaly");
            if (show) {
                $overlay.fadeIn(150);
            } else {
                $overlay.fadeOut(150);
            }
        }
    });
});