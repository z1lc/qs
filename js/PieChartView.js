define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]'], function ($, _, Backbone, noconflict) {
    return Backbone.View.extend({
        tagName: "div",

        initialize: function(options) {
            this.options = options;
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            this.model._fetchData();
            var chart = new google.visualization.PieChart(document.getElementById(this.id));

            //we want to dynamically change the height so that we have enough clearance for the chart (from the top and bottom)
            var clearance = this.options.googleChartOptions.chartArea.top;
            var divHeight = $("#" + this.id).height();
            this.options.googleChartOptions.chartArea.height = Math.floor( ((divHeight - 2*clearance) / divHeight) * 100 ) + "%";
            chart.draw(google.visualization.arrayToDataTable(this.model.get("categoryAndTimeArray"), true), this.options.googleChartOptions);
        }
    });
});