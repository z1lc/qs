define(['jquery', 'underscore', 'backbone', 'CoreView', 'DateUtils'], function ($, _, Backbone, CoreView, DateUtils) {
    return Backbone.Router.extend({
        routes: {
            "dates/:from/:to": "navigateDate",
            "*actions": "defaultRoute"
        },

        initialize: function () {
            this.view = new CoreView;
        },

        navigateDate: function (from, to) {
            // Set the correct li to active
            $("li").removeClass('active');
            $("#" + from).addClass('active');
            $("#3m").addClass("active");
            var self = this;
                self.view.updateDates(from, to)
        },

        defaultRoute: function () {
            this.navigate('#/dates/' + DateUtils.getFormattedOneMonthAgo() + "/" + DateUtils.getFormattedToday());
        },

        _dimScreen: function (show) {
            var $overlay = $("#loading-overaly");
            if (show) {
                return $overlay.fadeIn(150);
            } else {
                return $overlay.fadeOut(150);
            }
        }
    });
});