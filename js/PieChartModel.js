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

            var self = this;
            $.ajax({
                type: "GET",
                url: "sqlDAO.php",
                data: data
            }).done(function (msg) {
                var arrayOfValues = JSON.parse(msg).table;

                //Sometimes, we'd like for tasks that are subjects in school to go first. We can detect this programmatically
                //because all subjects will be of the form XXXX####, 4 capital letters followed by 4 digits.
                if (!_.isUndefined(self.get("settings")) && self.get("settings").subjectsFirst) {
                    var subjects = _.filter(arrayOfValues, function(element) {
                        return _.isArray(element[0].match(/^[A-Z]{4}[0-9]{4}$/));
                    });
                    arrayOfValues = _.difference(arrayOfValues, subjects);
                    arrayOfValues = _.union(subjects, arrayOfValues);
                }

                arrayOfValues = google.visualization.arrayToDataTable(arrayOfValues, true);
                chart.draw(arrayOfValues, self.get("options"));
            });

        }

    });
});