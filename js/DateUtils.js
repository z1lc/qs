define(['jquery', 'underscore'], function ($, _) {
    var today = new Date();
    return {
        getFormattedToday: function () {
            return today.toISOString().substring(0, 10);
        },

        getFormattedOneMonthAgo: function () {
            var oneMonthAgo = new Date(today);
            oneMonthAgo.setDate(today.getDate() - 30);
            return oneMonthAgo.toISOString().substring(0, 10);
        },

        getDateDifferenceInDaysBothInclusive: function(date1, date2) {
            date1 = new Date(date1);
            date2 = new Date(date2);
            var timeDiff = Math.abs(date1.getTime() - date2.getTime());
            return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        }
    };
});