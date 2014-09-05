define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[gauge]', 'DateUtils'], function ($, _, Backbone, noconflict, DateUtils) {
    return Backbone.View.extend({
        tagName: "div",

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, 'change:totalMinutes', this.render);
            this.chart = new google.visualization.Gauge(document.getElementById(this.id));
            this.data = [];
        },

        render: function () {
            var self = this;
            self.convertArrayToGoogleDataTable();
            self.chart.draw(self.data, self.options.googleChartOptions);
        },

        convertArrayToGoogleDataTable: function () {
            this.data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Work', Math.round(this.model.get("totalMinutes") / (60 * DateUtils.getDateDifferenceInDaysBothInclusive(this.model.get("from"), this.model.get("to"))) * 10) / 10]
            ]);
        }
    });
});