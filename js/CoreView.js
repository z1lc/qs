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
                identifier: "averageHours",
                id: "temp-bot-left-1",
                totalGauges: 2,
                googleChartOptions: {
                    width: 300, height: 300, //we have to set w+h, otherwise redraw doesn't work properly
                    min: 0, max: 10,
                    yellowFrom: 6, yellowTo: 7, yellowColor: "#93d092", //repurposing 'yellow' to make another green
                    greenFrom: 7, greenTo: 10, greenColor: "#39a237",
                    majorTicks: ["0", "2", "4", "6", "8", "10"],
                    animation: {
                        duration: 500
                    }
                }
            });
            var overallWorkExcess = new GaugeView({
                model: overallWorkModel,
                identifier: "netExcess",
                id: "temp-bot-left-2",
                totalGauges: 2,
                googleChartOptions: {
                    width: 300, height: 300, //we have to set w+h, otherwise redraw doesn't work properly
                    min: -15, max: 15,
                    yellowFrom: -2.5, yellowTo: 15, yellowColor: "#39a237", //for some reason, 'yellow' is painted over green. Flipping colors then.
                    greenFrom: -5, greenTo: 5, greenColor: "#93d092",
                    majorTicks: ["-15", "-10", "-5", "0", "5", "10", "15"],
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
                    vAxis: {minValue: 0, ticks: [2,4,6,8,10,12], minorGridlines: {count: 1}},
                    seriesType: "bars",
                    series: {1: {type: "line", curveType: "function"}, 2: {type: "line"}},
                    animation: {
                        duration: 1000,
                        easing: "inAndOut"
                    },
                    bar: {groupWidth: '61.8%'} //changed in ComboChartView.js anyway
                }
            });
        },

        updateDates: function (from, to) {
            this.fromDate = from;
            if (to == "today") {
                this.toDate = DateUtils.getFormattedToday();
                to = DateUtils.getFormattedToday();
            } else {
                this.toDate = to;
            }
            this.allModelArray.forEach(function (model) {
                model.set({
                    from: from,
                    to: to
                });
            });
        }
    });
});