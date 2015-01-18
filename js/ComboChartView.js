define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart]', 'DateUtils'], function ($, _, Backbone, noconflict, DateUtils) {
    return Backbone.View.extend({
        tagName: "div",

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, 'change:totalOverTimeArray', this.render);
            this.chart = new google.visualization.ComboChart(document.getElementById(this.id));
            this.data = [];
        },

        render: function () {
            var self = this;
            self.convertArrayToGoogleDataTable();

            //to prevent crowding of the horizontal axis, we want to only display labels every few dates.
            var currentDays = DateUtils.getDateDifferenceInDaysBothInclusive(self.model.get("from"), self.model.get("to"));
            var upTo5Labels = Math.ceil(currentDays / 5);
            self.options.googleChartOptions.hAxis.showTextEvery = upTo5Labels;

            //50 days is roughly where things start to look fairly poor in terms of spacing between bars for my resolution. By 100,
            //we should just be using the max width.
            var calculatedBarWidth = (currentDays - 50) / 50;
            calculatedBarWidth = Math.max(calculatedBarWidth, 0.618); //golden ratio is Google Charts default
            //a width of 100% would be ideal but doesn't result in an area-chart approximation as one would expect. 80% seems to look better.
            calculatedBarWidth = Math.min(calculatedBarWidth, 0.8);
            self.options.googleChartOptions.bar.groupWidth = (calculatedBarWidth * 100) + "%";

            self.chart.draw(self.data, self.options.googleChartOptions);
        },

        convertArrayToGoogleDataTable: function () {
            this.data = google.visualization.arrayToDataTable(this.model.get("totalOverTimeArray"));
        }
    });
});