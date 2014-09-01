define(['jquery', 'underscore', 'backbone', 'WorkModel', 'PieChartView', 'GaugeView'], function ($, _, Backbone, WorkModel, PieChartView, GaugeView) {
    return Backbone.View.extend({
        el: $("#mid-full"),

        initialize: function () {
            this.allModelArray = [];
            this.fromDate = "2014-07-30";
            this.toDate = "2014-08-30";
            this.render();
        },

        render: function () {
            var overallWorkModel = new WorkModel({
                from: this.fromDate,
                to: this.toDate,
                subjectsFirst: true
            });
            this.allModelArray.push(overallWorkModel);
            var overallWorkPieChart = new PieChartView({
                model: overallWorkModel,
                id: "top-left",
                googleChartOptions: {
                    legend: {position: 'labeled'},
                    chartArea: {left: 5, top: 9, width: '100%', height: '100%'},
                    pieSliceText: 'none'
                }
            });
            var overallWorkGauge = new GaugeView({
                model: overallWorkModel,
                id: "mid-full",
                googleChartOptions: {
                    width: 200, height: 200, //we have to set w+h, otherwise redraw doesn't work properly
                    min: 0, max: 7,
                    greenFrom: 6, greenTo: 7,
                    majorTicks: ["0", "1", "2", "3", "4", "5", "6", "7"]
                }
            });
        },

        updateDates: function (from, to) {
            this.fromDate = from;
            this.toDate = to;
            this.allModelArray.forEach(function(model) {
                model.set({
                    from: from,
                    to: to
                });
            });
        }
    });
});