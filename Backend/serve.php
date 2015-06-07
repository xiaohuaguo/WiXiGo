<?php

header('Access-Control-Allow-Origin: *');  

include 'DBManager.php';

$actionID = $_GET["actID"];

$dbman = new DBManager();
$conn = $dbman->getConnection();

switch ($actionID) {
	case "adduser":
		$login = $_GET["login"];
		$pwd = $_GET["pwd"];
		$lat = $_GET["lat"];
		$lon = $_GET["lon"];
		
		echo $dbman->addUser($conn,$login,$pwd,$lat,$lon);
		break;
		
	case "remuser":
		$login = $_GET["login"];
		
		echo $dbman->remUser($conn,$login);
		break;
		
	case "addrequest":
		$login = $_GET["login"];
		$price = $_GET["price"];
		$reward = $_GET["reward"];
		$itemlist = $_GET["itemlist"];
		
		echo $dbman->addRequest($conn,$login,$price,$reward,$itemlist);
		break;
		
	case "remrequest":
		$id = $_GET["id"];
		
		echo $dbman->remRequest($conn,$id);
		break;
		
	case "getrequest":
		$id = $_GET["id"];
		
		echo $dbman->getRequest($conn,$id);
		break;
		
	case "updategps":
		$login = $_GET["login"];
		$lat = $_GET["lat"];
		$lon = $_GET["lon"];
		
		echo $dbman->updateGPS($conn,$login,$lat,$lon);
		break;
		
	case "getgps":
		$login = $_GET["login"];
		
		echo $dbman->getGPS($conn,$login);
		break;
		
	case "getfree":
		echo $dbman->getFree($conn);
		break;
		
	default:
		echo "Invalid action ID.";
};

?>