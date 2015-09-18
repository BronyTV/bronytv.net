<?php
header("Content-type: application/json");

$ustream_raw = file_get_contents('https://api.ustream.tv/channels/16407308.json?callback=?');
$ustream = @json_decode($ustream_raw, true);

if (isset($ustream['channel']))
	$viewers = $ustream['channel']['stats']['viewer'];
else
	$viewers = 0;

$status = file_get_contents('http://bronytv.net/static/stream.html');

if (empty($status))
	$status = 'Stream is offline';

// Double-array necessary to match [{ }] previous structure.
$json = array(array(
	'Total_Viewers' => (int)$viewers,
	'Stream_Status' => $status,
));

echo json_encode($json);
