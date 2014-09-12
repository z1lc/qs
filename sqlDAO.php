<?php

include 'credentials.php';

if ($CRED_mysqlConnectionFailed) {
    echo "MySQL connection failed; cannot proceed.";
    exit(0);
}

if ($_GET["dimension"] && $_GET["from"] && $_GET["to"] && $_GET["type"]) {
    $dimension = mysqli_real_escape_string($CRED_qs, $_GET["dimension"]);
    $from = mysqli_real_escape_string($CRED_qs, $_GET["from"]);
    $to = mysqli_real_escape_string($CRED_qs, $_GET["to"]);
    $type = mysqli_real_escape_string($CRED_qs, $_GET["type"]);

    switch ($dimension) {
        case "cardio":
            break;
        case "clean":
            break;
        case "email":
            break;
        case "fat":
            break;
        case "lifting":
            break;
        case "reading":
            break;
        case "shave":
            break;
        case "shower":
            break;
        case "sleep":
            break;
        case "teeth":
            break;
        case "floss":
            break;
        case "todo":
            break;
        case "video":
            break;
        case "weight":
            break;
        case "work":
            if($type == "overtime") {
                $result = mysqli_query($CRED_qs,
                    "SELECT date(start) dateOnly, sum(duration) durationTotal
                    FROM work
                    WHERE date(start) >= date '$from'
                    AND date(end) <= date '$to'
                    AND work_category  <> 'Video & Games'
                    GROUP BY DateOnly");

                //we may not have data on all dates within the requested date range. We need to create an array that
                //already has all dates.
                $currentDate = $from;
                $outputArray = array();
                while (strtotime($currentDate) <= strtotime($to)) {
                    $outputArray[$currentDate] = 0;
                    $currentDate = date ("Y-m-d", strtotime("+1 day", strtotime($currentDate)));
                }

                foreach ($result as $key) {
                    $outputArray[$key['dateOnly']] += $key['durationTotal'];
                }
                $toPrint = "{\"table\": [";
                foreach ($outputArray as $key => $value) {
                    $toPrint .= "[\"" . $key . "\", " . $value . "],";
                }
                echo rtrim($toPrint, ",") . "]}";
            }

            $result = mysqli_query($CRED_qs,
                "SELECT *
                    FROM work
                    WHERE date(start) >= date '$from'
                    AND date(end) <= date '$to'
                    AND work_category  <> 'Video & Games'");

            $collated = array();
            foreach ($result as $key) {
                $collated[$key['work_category']] = 0;
            }
            foreach ($result as $key) {
                $collated[$key['work_category']] += $key['duration'];
            }

            $total = 0;
            foreach($collated as $key => $value) {
                $total += $value;
            }
            if ($type == "detail") {
                arsort($collated);
                $toPrint = "{\"table\": [";
                foreach ($collated as $key => $value) {
                    $toPrint .= "[\"$key\"" . ", " . "$value],";
                }
                echo rtrim($toPrint, ",") . "]}";
            } else if ($type == "sum") {
                echo "{sum: " . $total . "}";
            } else if ($type == "average") {
                $date1 = new DateTime($from);
                $date2 = new DateTime($to);
                echo "{average: " . ($total / date_diff($date1, $date2)->format('%a') + 1) . "}";
                //+1 because we need to include both start and end dates (see SQL query <= >=
            }
            break;
        default:
            echo "You asked for information on dimension \"" . $dimension . "\", but there is no such dimension.";
    }
} else {
    echo "Invalid request.";
}
/*
    $result = mysqli_query($CRED_qs,
        "SELECT AVG(value)
        FROM simple_value
        WHERE datetime BETWEEN '$from'
                        AND '$to'
        AND dimension_id = $dimension");
    echo mysqli_fetch_array($result)[0]; */