define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[gauge]', 'DateUtils'], function ($, _, Backbone, noconflict, DateUtils) {
    return Backbone.View.extend({
        tagName: "div",

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, 'change:totalMinutes', this.render);
            this.autoResize();
            this.chart = new google.visualization.Gauge(document.getElementById(this.id));
            this.data = [];
        },

        autoResize: function() {
            var $id = $("#temp-bot-left");
            var maxWidth = $id.width() / this.options.totalGauges;
            var maxHeight = $id.height();
            this.options.googleChartOptions.width = Math.min(maxWidth, maxHeight);
            this.options.googleChartOptions.height = Math.min(maxWidth, maxHeight);
        },

        render: function () {
            var self = this;
            self.convertArrayToGoogleDataTable();
            self.chart.draw(self.data, self.options.googleChartOptions);
        },

        convertArrayToGoogleDataTable: function () {
            if (this.options.identifier == "averageHours") {
                this.data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Work', Math.round(this.model.get("totalMinutes") / (60 * DateUtils.getDateDifferenceInDaysBothInclusive(this.model.get("from"), this.model.get("to"))) * 100) / 100]
                ]);
            } else if (this.options.identifier == "netExcess") {
                var eightHours = (8 - (this.model.get("totalMinutes")/60)) / DateUtils.getDateDifferenceInDaysBothInclusive(this.model.get("to"), "2015-05-08");
                this.data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['8 Hours', Math.round((eightHours) * 100) / 100]
                ]);
            }
        }
    });
});