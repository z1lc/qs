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
            var maxWidth = $id.innerWidth() / this.options.totalGauges;
            var maxHeight = $id.innerHeight();
            //not sure as to why this 2 correction needs to be here, it was working fine before and then started acting up in late Feb.
            var minimum = Math.min(maxWidth, maxHeight) - 2;
            this.options.googleChartOptions.width = minimum;
            this.options.googleChartOptions.height = minimum;
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
                //This will calculate the average # of hours necessary to work per day to achieve "goal" number of hours.
                var goal = 7;
                var remainingDays = DateUtils.getDateDifferenceInDaysBothInclusive(this.model.get("to"), "2015-05-08");
                var totalDays = DateUtils.getDateDifferenceInDaysBothInclusive("2015-01-04", "2015-05-08");
                var eightHours = (goal * totalDays - (this.model.get("totalMinutes")/60)) / remainingDays;
                this.data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['7 Hours', Math.round((eightHours) * 100) / 100]
                ]);
            }
        }
    });
});