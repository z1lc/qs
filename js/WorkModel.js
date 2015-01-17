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

        //via http://goo.gl/8Pj3bf
        _colorLuminance: function(hex, lum) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i*2,2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00"+c).substr(c.length);
            }

            return rgb;
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
                        element[1] = Math.round(element[1] * 100) / 100;
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
                    //use the first 21 or 10% of days (whichever smaller) for the initial exponential average
                    var initialAverageDays = Math.min(21, Math.ceil(arrayOfValues.length / 10));
                    var initialSum = 0;
                    var totalSum = 0;
                    for (var i = 0; i < arrayOfValues.length; i++) {
                        if (i < initialAverageDays) {
                            initialSum += arrayOfValues[i][1];
                        }
                        totalSum += arrayOfValues[i][1]
                    }
                    var initialAverage = initialSum / initialAverageDays;
                    var totalAverageHours = Math.round((totalSum / DateUtils.getDateDifferenceInDaysBothInclusive(self.get("from"), self.get("to")))/(60*60)*10)/10;

                    for (var j = 0; j < arrayOfValues.length; j++) {
                        arrayOfValues[j][1] /= 60 * 60;
                        if (j == 0) { //first element needs special treatment because it has the custom exponentiated average
                            arrayOfValues[j][3] = initialAverage / (60 * 60);
                        } else {
                            arrayOfValues[j][3] = arrayOfValues[j - 1][3] * 0.9 + arrayOfValues[j][1] * 0.1;
                        }
                        arrayOfValues[j][4] = totalAverageHours;
                        arrayOfValues[j][2] = "fill-color: " + self._colorLuminance("#3366cc", Math.min(0.9,((arrayOfValues[j][1] - totalAverageHours) / totalAverageHours)/2)) + ";";
                        arrayOfValues[j][1] = Math.round(arrayOfValues[j][1] * 100) / 100;
                    }

                    //we want to defer rounding of exponentiated average to as late as possible to reduce loss of precision
                    _.each(arrayOfValues, function(e) {
                        e[3] = Math.round(e[3] * 100) / 100;
                    });

                    arrayOfValues.unshift([
                        {label: 'Date', type: 'string'},
                        {label: 'Hours', type: 'number'},
                        {type: 'string', role: 'style'},
                        {label: 'Exponential Average', type: 'number'},
                        {label: 'Total Average', type: 'number'}
                    ]);
                    self.set({totalOverTimeArray: arrayOfValues});
                })
            );
        }
    });
});