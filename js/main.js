require({
    paths: {
        //require plugins
        async: 'lib/require/plugins/async',
        font: 'lib/require/plugins/font',
        goog: 'lib/require/plugins/goog',
        image: 'lib/require/plugins/image',
        json: 'lib/require/plugins/json',
        noext: 'lib/require/plugins/noext',
        mdown: 'lib/require/plugins/mdown',
        propertyParser: 'lib/require/plugins/propertyParser',

        jquery: 'lib/jquery-2.1.1',
        underscore: 'lib/underscore-1.6.0',
        bootstrap: 'lib/bootstrap-3.2.0',
        backbone: 'lib/backbone-1.1.2'
    }
});

require(['jquery', 'underscore', 'backbone', 'goog!visualization,1,packages:[corechart,gauge]'], function ($, _, Backbone, noconflict) {

    $(function() {
        var AppRouter = Backbone.Router.extend({
            routes: {
                "dates/:from/:to": "getPost",
                "*actions": "defaultRoute"
            },

            getPost: function (from, to) {
                this._dimScreen(true);
                $("li").removeClass('active');
                $("#" + from).addClass('active');
                console.log('Requested dates from ' + from + ' to ' + to);
                $("#3m").addClass("active");
                var self = this;
                $.ajax({
                    type: "GET"
                    //url: "http://www.robertsanek.com"
                }).done(function () {
                }).fail(function () {
                }).always(function () {
                    self._dimScreen(false);
                });

            },

            defaultRoute: function (actions) {
                mainRouter.navigate('#/home/');
            },

            _dimScreen: function (show) {
                var $overlay = $("#loading-overaly");
                if (show) {
                    $overlay.fadeIn(150);
                } else {
                    $overlay.fadeOut(150);
                }
            }
        });
        // Instantiate the router
        var mainRouter = new AppRouter;
        Backbone.history.start();
    });




    var data = google.visualization.arrayToDataTable([
     ['Task', 'Hours per Day'],
     ['Work', 11],
     ['Eat', 2],
     ['Commute', 2],
     ['Watch TV', 2],
     ['Sleep', 7]
     ]);
     var options = {
     legend: {position: 'labeled'},
     chartArea: {left: 5, top: 0, width: '100%', height: '100%'},
     pieSliceText: 'none'
     };
     var chart = new google.visualization.PieChart(document.getElementById('top-left'));
     chart.draw(data, options);

     var gaugeObject = [
     ['1', 80],
     ['2', 55],
     ['3', 68],
     ['4', 80],
     ['5', 55],
     ['6', 68],
     ['7', 68],
     ['8', 68],
     ['9', 68],
     ['10', 68]

     ];

     _.each(gaugeObject, function(element, index) {
     var data2 = google.visualization.arrayToDataTable([
     ['Label', 'Value'],
     element
     ]);
     var options2 = {
     width: 1440, height: 175,
     redFrom: 90, redTo: 100,
     yellowFrom: 75, yellowTo: 90,
     minorTicks: 5
     };
     $("#mid-full").append("<div style=\"float: left;\" id='gauge-" + index + "'></div>");
     var chart2 = new google.visualization.Gauge(document.getElementById('gauge-'+index));
     chart2.draw(data2, options2);
     });


     var data3 = google.visualization.arrayToDataTable([
     ['Year', 'Sales', 'Expenses'],
     ['2004', 1000, 400],
     ['2005', 1170, 460],
     ['2006', 660, 1120],
     ['2007', 1030, 540],
     ['2008', 660, 1120],
     ['2009', 660, 1120],
     ['2010', 660, 1120],
     ['2011', 660, 1120],
     ['2012', 660, 1120],
     ['2013', 660, 1120],
     ['2014', 660, 1120]
     ]);
     var options3 = {
     chartArea: {left: 40, top: 10, width: '100%', height: '85%'},
     hAxis: {
     textStyle: {
     fontSize: 12
     }
     },
     vAxis: {
     textStyle: {
     fontSize: 12
     }
     }
     };
     var chart3 = new google.visualization.LineChart(document.getElementById('bot-full'));
     chart3.draw(data3, options3);

     $(window).resize(function () {
     chart.draw(data, options);
     chart2.draw(data2, options2);
     chart3.draw(data3, options3);
     });
});