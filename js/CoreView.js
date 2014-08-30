define(['jquery', 'underscore', 'backbone', 'PieChartModel'], function($, _, Backbone, PieChartModel) {
    return Backbone.View.extend({
        el: $("#mid-full"),

        initialize: function() {
            this.render();
        },

        render: function() {
            var overallPieChart = new PieChartModel({
                dataURL: "../sqlDAO.php",
                options: {
                    legend: {position: 'labeled'},
                    chartArea: {left: 5, top: 9, width: '100%', height: '100%'},
                    pieSliceText: 'none'
                },
                id: "top-left",
                settings: {
                    subjectsFirst: true
                }
            });
        }
    });
});