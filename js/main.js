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
        bootstrap: 'lib/bootstrap-3.2.0'
    }
});

require(
    ['jquery', 'underscore', 'goog!visualization,1,packages:[corechart,gauge]'],
    function ($, _, noconflict) {
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

            var data2 = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
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
            ]);
            var options2 = {
                width: 1440, height: 175,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };
            var chart2 = new google.visualization.Gauge(document.getElementById('mid-full'));
            chart2.draw(data2, options2);

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
    });