define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]'], function ($, _, Backbone, noconflict) {
    return Backbone.View.extend({
        tagName: "div",

        initialize: function(options) {
            this.options = options;
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(calledViaListenTo) {
            if (_.isUndefined(calledViaListenTo) || this.model.hasChanged("from") || this.model.hasChanged("to")) {
                var self = this;
                $.when(this.model._fetchData()).then(function() {
                    var chart = new google.visualization.PieChart(document.getElementById(self.id));

                    //we want to dynamically change the height so that we have enough clearance for the chart (from the top and bottom)
                    var clearance = self.options.googleChartOptions.chartArea.top;
                    var divHeight = $("#" + self.id).height();
                    self.options.googleChartOptions.chartArea.height = Math.floor(((divHeight - 2 * clearance) / divHeight) * 100) + "%";
                    chart.draw(google.visualization.arrayToDataTable(self.model.get("categoryAndTimeArray"), true), self.options.googleChartOptions);
                });
            }
        }
    });
});