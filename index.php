<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>z1lc QS</title>
    <meta name="description" content="A quantified self dashboard with a focus on automation. Written by Robert Sanek">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">

    <script data-main="js/main.js" src="js/lib/require/require-2.1.14.min.js"></script>
</head>
<body>
<div id="loading-overaly">
    <div id="message">
        <img src="img/ajax-loader-white.gif"><br><br>
        &nbsp; &nbsp;Loading...
    </div>
</div>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand active" href="#/home/">z1lc<sup>qs</sup></a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li><a href="#">Add Data</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <?php
            // this is the first date I started data tracking. Ideally, this would be taken from the database,
            // but the interaction seems like overkill here. Using magic number instead.
            $TRACKING_START = "2013-12-01";
            $DATE_FORMAT = "Y-m-d";
            //assuming a month is 30.44 days
            $dates = array(
                "1w" => 7,
                "1m" => 30,
                "3m" => 91,
                "6m" => 183,
                "1y" => 365);
            $endDate = date($DATE_FORMAT);
            foreach ($dates as $string => $days) {
                $startDate = date($DATE_FORMAT, time() - ($days * 24 * 60 * 60));
                echo "<li id={$startDate}><a href=\"#/dates/{$startDate}/{$endDate}\">{$string}</a></li>";
            }
            echo "<li id=\"$TRACKING_START\"><a href=\"#/dates/{$TRACKING_START}/{$endDate}\">max</a></li>";
            ?>
        </ul>
    </div>

</div>
<div class="container">
    <div id="top-left"></div>
    <div id="top-right-container">
        <div id="top-right-TL"></div>
        <div id="top-right-TR"></div>
        <div class="clear"></div>
        <div id="top-right-BL"></div>
        <div id="top-right-BR"></div>
    </div>

    <div class="clear"></div>

    <div id="mid-full-container">
        <div id="mid-full"></div>
    </div>

    <div class="clear"></div>
    <div id="bot-full"></div>
</div>
</body>
</html>
