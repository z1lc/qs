<?php
include '../credentials.php';

/******************************************************* TOGGL ******************************************************/
// To get detailed task data, you have to use the 'reports' API. Docs at http://goo.gl/3S29w1. Grabbing the detailed
// summary from https://toggl.com/reports/api/v2/details gives us what we need: description and start and end times.

$ch = curl_init();
$params = array(
    "user_agent" => "rsanek@gmail.com",
    "workspace_id" => 455984,
    "since" => "2014-08-01"
);
$url = "https://toggl.com/reports/api/v2/details?" . http_build_query($params);

curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => 1, //place result in variable instead of on screen
    CURLOPT_SSL_VERIFYPEER => false, //ignore SSL verification and blindly trust
    CURLOPT_USERPWD => $CRED_TOGGLE_API_KEY . ":api_token"
));
$toggl_response = json_decode(curl_exec($ch), true);
curl_close($ch);

foreach($toggl_response["data"] as $key) {
    $toggl_id = $key['id'];
    $work_category = $key['description'];
    $start = substr($key['start'], 0, 19); //not worrying about time zone (for now...)
    $end = substr($key['end'], 0, 19);
    $duration= round($key['dur'] / 1000); //we receive data in milliseconds, but want it in seconds.
    //insert the prepared information into the db, using ON DUPLICATE KEY UPDATE to get around re-inserting things we
    //already have and also to defensively update information just in case.
    if (!mysqli_query($CRED_qs,
    "INSERT INTO work (toggl_id, work_category, start, end, duration)
    VALUES ('$toggl_id', '$work_category', '$start', '$end', '$duration')
    ON DUPLICATE KEY UPDATE work_category='$work_category', start='$start', end='$end', duration='$duration'")) {
        mysqli_error($CRED_qs);
    }
}

$body = '<html><head><link rel="shortcut icon" type="image/x-icon" href="../img/faviconchevron.png" /></head><body>';
$body .= 'Toggl Data Updated Successfully.</body></html>';
echo $body;