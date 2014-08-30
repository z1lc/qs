define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]'], function ($, _, Backbone, noconflict) {
    return Backbone.Model.extend({
        initialize: function () {
            var chart = new google.visualization.PieChart(document.getElementById('top-left'));
            var data = {
                from: "2014-07-30",
                to: "2014-08-30",
                dimension: 69
            };

            //we want to dynamically change the height so that we have enough clearance for the chart (from the top and bottom)
            var clearance = this.get("options").chartArea.top;
            var divHeight = $("#" + this.get("id")).height();
            this.get("options").chartArea.height = Math.floor( ((divHeight - 2*clearance) / divHeight) * 100 ) + "%";

            var me = this;
            $.ajax({
                type: "GET",
                url: "sqlDAO.php",
                data: data
            }).done(function (msg) {
                msg = JSON.parse(msg);
                msg = google.visualization.arrayToDataTable(msg.table, true);
                chart.draw(msg, me.get("options"));
            });

        }

    });
});