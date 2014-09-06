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
            var upTo5Labels = Math.ceil(DateUtils.getDateDifferenceInDaysBothInclusive(self.model.get("from"), self.model.get("to")) / 5);
            self.options.googleChartOptions.hAxis.showTextEvery = upTo5Labels;
            self.chart.draw(self.data, self.options.googleChartOptions);
        },

        convertArrayToGoogleDataTable: function () {
            this.data = google.visualization.arrayToDataTable(this.model.get("totalOverTimeArray"));
        }
    });
});