define(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]', 'DateUtils'], function ($, _, Backbone, noconflict, DateUtils) {
    return Backbone.Model.extend({
        defaults: function() {
            var today = new Date();
            return {
                categoryAndTimeArray: [],
                from: DateUtils.getFormattedOneMonthAgo(),
                to: DateUtils.getFormattedToday(),
                subjectsFirst: false
            };
        },

        initialize: function () {
        },

        _fetchData: function() {
            var self = this;
            $.ajax({
                type: "GET",
                url: "sqlDAO.php",
                data: { //will be converted to query string
                    from: self.get("from"),
                    to: self.get("to"),
                    dimension: 69
                }
            }).done(function (msg) {
                var arrayOfValues = JSON.parse(msg).table;
                //Sometimes, we'd like for tasks that are subjects in school to go first. We can detect this programmatically
                //because all subjects will be of the form XXXX####, 4 capital letters followed by 4 digits.
                if (!_.isUndefined(self.get("subjectsFirst")) && self.get("subjectsFirst")) {
                    var subjects = _.filter(arrayOfValues, function(element) {
                        return _.isArray(element[0].match(/^[A-Z]{4}[0-9]{4}$/));
                    });
                    arrayOfValues = _.difference(arrayOfValues, subjects);
                    arrayOfValues = _.union(subjects, arrayOfValues);
                }

                self.set({categoryAndTimeArray: arrayOfValues});
            });
        }
    });
});