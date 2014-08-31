define(['jquery', 'underscore', 'backbone', 'CoreView', 'DateUtils'], function($, _, Backbone, CoreView, DateUtils) {
    return Backbone.Router.extend({
        routes: {
            "dates/:from/:to": "navigateDate",
            "*actions": "defaultRoute"
        },

        initialize: function() {
            this.view = new CoreView;
        },

        navigateDate: function (from, to) {
            // Dim the screen, showing the loading indicator
            this._dimScreen(true);
            // Set the correct li to active
            $("li").removeClass('active');
            $("#" + from).addClass('active');
            $("#3m").addClass("active");
            this.view.updateDates(from, to);
            this._dimScreen(false);
        },

        defaultRoute: function () {
            this.navigate('#/dates/' + DateUtils.getFormattedOneMonthAgo() + "/" + DateUtils.getFormattedToday());
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