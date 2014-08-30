define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]'], function ($, _, Backbone, noconflict) {
    return Backbone.Model.extend({
        initialize: function () {
            var chart = new google.visualization.PieChart(document.getElementById('top-left'));
            var data = {
                from: "2014-07-30",
                to: "2014-08-30",
                dimension: 69
            };
            var me = this;
            $.ajax({
                type: "GET",
                url: "sqlDAO.php",
                data: data,
                async: false
            }).done(function (msg) {
                msg = JSON.parse(msg);
                msg = google.visualization.arrayToDataTable(msg.table, true);
                chart.draw(msg, me.get("options"));
            });

        }

    });
});