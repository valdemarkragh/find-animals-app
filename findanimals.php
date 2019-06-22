<?php
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');



require_once('db_con.php');	
	
	$lat = $_GET['lat'];
	$long = $_GET['long'];
	$distance = $_GET['distance'];
    
	
    

	$sql = 'SELECT id, description, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude )) * cos( radians(longitude) - radians(?)) + sin(radians(?)) * sin( radians(latitude)))) AS distance FROM rehome HAVING distance < ? ORDER BY distance'; 
	$stmt = $con->prepare($sql);
	$stmt->bind_param('dddi', $lat, $long, $lat, $distance);
	$stmt->execute();
	$stmt->bind_result($id, $description, $distance);
	$animals = array();
	$data = array();
	while ($stmt->fetch()){
		
	$data[] = array('id' => $id, 'description' => $description, 'distance'=>$distance);
	
	}
	$animals[] = array('animals' => $data);
	$json = json_encode($data);
	echo $json;
	
	


/* $lat   = filter_input(INPUT_POST, 'latitude') or die("missing parameter lat");
	$long  = filter_input(INPUT_POST, 'longitude') or die("missing parameter long");
	$description = filter_input(INPUT_POST, 'description') or die("missing parameter description");
	$distance = filter_input(INPUT_POST, 'distance') or die("missing parameter distance"); */

	

	// $data = array('id' => 25, 'name' => 'Peter', 'age' => 25, 'pos'=>$pos);
	
	
	/*$sql = 'SELECT description, latitude, longitude FROM rehome';
	
	$stmt = $con->prepare($sql);
	$stmt->execute();
	$stmt->bind_result($description, $latitude, $longitude);	
	$json = array();
	while ($stmt->fetch()){
	echo 'Total : ';
	echo $description;
	echo 'lat : ';
	echo $latitude;
	echo 'long : ';
	echo $longitude;
} */

?>