define(['jquery', 'underscore', 'backbone', 'DateUtils', 'WorkModel', 'PieChartView', 'GaugeView', 'ComboChartView'], function ($, _, Backbone, DateUtils, WorkModel, PieChartView, GaugeView, ComboChartView) {
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
                    yellowFrom: 5, yellowTo: 6, yellowColor: "#93d092", //repurposing 'yellow' to make another green
                    greenFrom: 6, greenTo: 7, greenColor: "#39a237",
                    majorTicks: ["0", "1", "2", "3", "4", "5", "6", "7"],
                    animation: {
                        duration: 500
                    }
                }
            });
            var overallWorkComboChart = new ComboChartView({
                model: overallWorkModel,
                id: "top-right-TL",
                googleChartOptions: {
                    title: 'Daily Work Output, Hours',
                    width: $(this.id).width, height: $(this.id).height,
                    chartArea: {top: 20, left: 20, width: '100%', height: '80%'},
                    legend: {position: 'none'}, //who needs legends anyway?
                    hAxis: {showTextEvery: 1},
                    seriesType: "bars",
                    series: {1: {type: "line"}},
                    animation: {
                        duration: 500
                    }
                }
            });
        },

        updateDates: function (from, to) {
            this.fromDate = from;
            this.toDate = to;
            this.allModelArray.forEach(function (model) {
                model.set({
                    from: from,
                    to: to
                });
            });
        }
    });
});