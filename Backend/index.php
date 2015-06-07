<?php
	include 'DBManager.php';
	
	echo 'Creating DBMan <br>';
	$dbm = new DBManager();
	echo 'Calling getConnection() <br>';
	$db = $dbm->getConnection();
	echo 'Calling addUser() <br>';
	$test1 = $dbm->addUser($db,"Best","First",23,23)."<br>";
	echo 'Calling remUser() <br>';
	//$dbm->remUser($db,"Best");
	echo 'Calling findUser() <br>';
	//$dbm->findUser($db,"Best");
	echo 'Calling addRequest() <br>';
	//var_dump($dbm->addRequest($db,"test","11","11"));
	echo 'End <br>';
	//$dbm->getFree($db);
	var_dump($dbm->getGPS($db,"Best"));
	$dbm->acceptDelivery($db,"557441c424c1d2a0008b4568","Best");
	echo 'End2';
	
?>