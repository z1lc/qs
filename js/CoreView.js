define(['jquery', 'underscore', 'backbone', 'WorkModel', 'PieChartView'], function ($, _, Backbone, WorkModel, PieChartView) {
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