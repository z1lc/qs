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
                id: "temp-top-left",
                googleChartOptions: {
                    legend: {position: 'labeled'},
                    chartArea: {left: 5, top: 9, width: '100%', height: '100%'},
                    pieSliceText: 'none'
                }
            });
            var overallWorkGauge = new GaugeView({
                model: overallWorkModel,
                id: "temp-bot-left",
                googleChartOptions: {
                    width: 200, height: 200, //we have to set w+h, otherwise redraw doesn't work properly
                    min: 0, max: 9,
                    yellowFrom: 6, yellowTo: 7, yellowColor: "#93d092", //repurposing 'yellow' to make another green
                    greenFrom: 7, greenTo: 9, greenColor: "#39a237",
                    majorTicks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    animation: {
                        duration: 500
                    }
                }
            });
            var overallWorkComboChart = new ComboChartView({
                model: overallWorkModel,
                id: "temp-right",
                googleChartOptions: {
                    title: 'Daily Work Output, Hours',
                    width: $(this.id).width, height: $(this.id).height,
                    chartArea: {top: 25, left: 40, width: '100%', height: '95%'},
                    legend: {position: 'none'}, //who needs legends anyway?
                    hAxis: {showTextEvery: 1},
                    vAxis: {minValue: 0, gridlines: {count: 10}},
                    seriesType: "bars",
                    series: {1: {type: "line"}, 2: {type: "line"}},
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