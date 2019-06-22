<html>
<head>
<meta https-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; connect-src http://valdemarkragh.dk/rehome/savelocation.php">
	
</head>
</html>

	
<?php 


require_once('db_con.php');	

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	@$description = $request->description;
    @$lat = $request->lat;
    @$long = $request->long;
    

// $lat = 5.0;
// $long = 6.0;

	
			$sql = 'INSERT INTO rehome (description, latitude, longitude) VALUES (?, ?, ?)';
			$stmt = $con->prepare($sql);
			$stmt->bind_param('sdd', $description, $lat, $long);
			$stmt->execute();
	
?>
