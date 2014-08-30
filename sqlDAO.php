<?php

include 'credentials.php';

if ($CRED_mysqlConnectionFailed) {
    exit(0);
}

if ($_GET["dimension"] && $_GET["from"] && $_GET["to"]) {
    $dimension = mysqli_real_escape_string($CRED_qs, $_GET["dimension"]);
    $from = mysqli_real_escape_string($CRED_qs, $_GET["from"]);
    $to = mysqli_real_escape_string($CRED_qs, $_GET["to"]);
    $dimension = intval($dimension);

    if ($dimension = 69) {
        $result = mysqli_query($CRED_qs,
            "SELECT *
            FROM work");

        $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $collated = array();
        foreach ($result as $key) {
            $collated[$key['work_category']] = 0;
        }

        foreach ($result as $key) {
            $collated[$key['work_category']] += $key['duration'];
        }
        foreach ($collated as $key => &$value) {
            $value /= 60*60;
            $value = round($value, 1);
        }
        arsort($collated);
        $toPrint = "{\"table\": [";
        foreach ($collated as $key => $value) {
            $toPrint .= "[\"$key\"" . ", " . "$value],";
        }
        echo rtrim($toPrint, ",") . "]}";
    }

    $result = mysqli_query($CRED_qs,
        "SELECT AVG(value)
        FROM simple_value
        WHERE datetime BETWEEN '$from'
                        AND '$to'
        AND dimension_id = $dimension");
    echo mysqli_fetch_array($result)[0];
}