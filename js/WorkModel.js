define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]', 'DateUtils'], function ($, _, Backbone, noconflict, DateUtils) {
    return Backbone.Model.extend({
        defaults: function () {
            return {
                categoryAndTimeArray: [],
                totalOverTimeArray: [],
                totalMinutes: 0,
                //TODO: change into object so that we can listenTo changes on the object instead of on both from and on
                //(we are firing 2 AJAX requests if a user changes both dates instead of the expected 1).
                from: DateUtils.getFormattedOneMonthAgo(),
                to: DateUtils.getFormattedToday(),
                subjectsFirst: false
            };
        },

        initialize: function () {
            this.on("change:from change:to change:subjectsFirst", this._fetchData);
        },

        _fetchData: function () {
            var self = this;
            //we need to do multiple AJAX calls on this model to fetch all associated data. Wrap individual $.ajax promises
            //in a $.when so that we only return once all calls complete
            return $.when(
                $.ajax({
                    type: "GET",
                    url: "sqlDAO.php",
                    data: { //will be converted to query string
                        from: self.get("from"),
                        to: self.get("to"),
                        dimension: "work",
                        type: "detail"
                    }
                }).done(function (msg) {
                    var arrayOfValues = JSON.parse(msg).table;
                    var totalMinutes = 0;
                    _.each(arrayOfValues, function (element) {
                        totalMinutes += element[1] / 60;
                        element[1] /= 60 * 60;
                        element[1] = Math.round(element[1] * 10) / 10;
                    });

                    //Sometimes, we'd like for tasks that are subjects in school to go first. We can detect this programmatically
                    //because all subjects will be of the form XXXX####, 4 capital letters followed by 4 digits.
                    if (!_.isUndefined(self.get("subjectsFirst")) && self.get("subjectsFirst")) {
                        var subjects = _.filter(arrayOfValues, function (element) {
                            return _.isArray(element[0].match(/^[A-Z]{4}[0-9]{4}$/));
                        });
                        arrayOfValues = _.difference(arrayOfValues, subjects);
                        arrayOfValues = _.union(subjects, arrayOfValues);
                    }

                    self.set({totalMinutes: totalMinutes});
                    self.set({categoryAndTimeArray: arrayOfValues});
                }),

                $.ajax({
                    type: "GET",
                    url: "sqlDAO.php",
                    data: { //will be converted to query string
                        from: self.get("from"),
                        to: self.get("to"),
                        dimension: "work",
                        type: "overtime"
                    }
                }).done(function (msg) {
                    var arrayOfValues = JSON.parse(msg).table;
                    var initialAverageDays = Math.min(21, Math.ceil(arrayOfValues.length / 10));
                    //use the first x days for the initial exponential average
                    var sum = 0;
                    for (var i = 0; i < initialAverageDays; i++) {
                        sum += arrayOfValues[i][1];
                    }
                    var initialAverage = sum / initialAverageDays;
                    arrayOfValues[0][1] /= 60 * 60;
                    arrayOfValues[0][2] = initialAverage / (60 * 60);
                    arrayOfValues[0][1] = Math.round(arrayOfValues[0][1] * 10) / 10;

                    for (var j = 1; j < arrayOfValues.length; j++) {
                        arrayOfValues[j][1] /= 60 * 60;
                        arrayOfValues[j][2] = arrayOfValues[j - 1][2] * 0.9 + arrayOfValues[j][1] * 0.1;
                        arrayOfValues[j][1] = Math.round(arrayOfValues[j][1] * 10) / 10;
                    }

                    //we want to defer rounding of exponentiated average to as late as possible to reduce loss of precision
                    _.each(arrayOfValues, function(e) {
                        e[2] = Math.round(e[2] * 10) / 10;
                    });

                    arrayOfValues.unshift(['Date', 'Hours', 'Exponential Average']);
                    self.set({totalOverTimeArray: arrayOfValues});
                })
            );
        }
    });
});