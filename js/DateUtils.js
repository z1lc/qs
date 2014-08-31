define(['jquery', 'underscore', 'backbone', 'CoreView'], function ($, _, Backbone) {
    var today = new Date();
    return {
        getFormattedToday: function () {
            return today.toISOString().substring(0, 10);
        },

        getFormattedOneMonthAgo: function () {
            var oneMonthAgo = new Date(today);
            oneMonthAgo.setDate(today.getDate() - 30);
            return oneMonthAgo.toISOString().substring(0, 10);
        }
    };
});