<?php

class DBManager {
	
	function getConnection() {
		
		$services = getenv("VCAP_SERVICES"); //Get VCAP data.
	    $services_json = json_decode($services,true); //Parse VCAP data.
	    $mongodb_config = $services_json["mongolab"][0]; //Get JSON content.
	    $uri = $mongodb_config["credentials"]["uri"]; //Get URI from JSON.
	    
	    $dbname = $mongodb_config["name"]; //Save dbname for later usage.
	    $conn = new MongoClient($uri); //Create MongoClient object.
	    
	    return $conn;
	    
    }
    
    function findUser($conn,$login) {
    	
  		$query = array('pseudo' => $login);
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	$cursor = $collection->find($query);
    	$cursor->next();
    	$element = $cursor->current();
    	
    	$json_payload = json_encode($element);
    	
    	return $json_payload;
    	
    }
    
  
    function closeConnection() {
    	
       	$conn_->close(); //Close connection.
    	
    }

    function addUser($conn,$login,$password,$lat,$lon) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	$cursor = $collection->find(array("pseudo"=>$login));
    	
    	if ($cursor->count() > 0) return false;
    	
	    	$document = array( //Creating entry
				'pseudo' => $login,
				'pass' => $password,
				'lat' => $lat,
				'lon' => $lon,
				'session'=>$session
				);
			
		 	$collection->insert($document); //Insert entry.
		 	
		 	return true;
		 	
    }
    
    function remUser($conn,$login) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	$collection->remove(array("pseudo"=>$login));
    	
    }
    
    function addRequest($conn,$pseudo1,$price,$reward,$itemlist) {
    	
    	$document = array (
    		'status'=>"Free",
    		'pseudo1'=>$pseudo1,
    		'price'=>$price,
    		'reward'=> $reward,
    		'pseudo2'=>"NULL",
    		'itemlist'=>$itemlist,
    	);
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2"); //Select collection
		$collection->insert($document); //Insert entry.
		//
		$cursor = $collection->find(array("pseudo1"=>$pseudo1));
		$cursor->next();
		$element = $cursor->current();
		
		$json_payload = json_encode($element["_id"]);
		
		return $json_payload;
		
    }
    
    function getRequest($conn,$id) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2");
    	
    	$cursor = $collection->find(array("_id"=>$id));
    	$cursor->next();
    	$element = $cursor->current();
    	
		$json_payload = json_encode($element);
		
		return $json_payload;
    	
    }
    
    function getFree($conn) {
    	
    	$query = array('status' =>'Free' );
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2");
    	$cursor = $collection->find($query);
    	$cursor->next();
    	
    	$arrayResult = iterator_to_array($cursor);
    	$json_payload = json_encode($arrayResult);
    	
    	return $json_payload;
    	
    }
    
    function remRequest($conn,$login1,$login2) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2");
    	
    	$element = $collection->find(array("pseudo1"=>$login1,"pseudo2"=>$login2));
    	if ($element->count() > 0) {
    		$collection->remove(array("pseudo1"=>$login1,
    							"pseudo2"=>$login2));
    		return true;
    	}
    	
    	return false;
    	
    }
    
    function updateGPS($conn,$login,$lat,$lon) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	
    	$element = $collection->find(array("pseudo"=>$login));
    	
    	if (true) {
    		$collection->update(array("pseudo"=>$login), array('$set'=>array("lat"=>$lat,"lon"=>$lon)));
    		
    		return true;
    		
    	}
    	
    	return false;
    	
    }
    
    function getGPS($conn,$login) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	
    	$element = $collection->find(array("pseudo"=>$login),array("lat"=>true,"lon"=>true));
    	
    	$element->next();
    	
    	$json_payload = json_encode($element->current());
    	
    	return $json_payload;
    	
    }
    
    function login($conn,$login,$pwd) {
    	
    	$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test");
    	$element = $collection->find(array("pseudo"=>$login,"password"=>$pwd));
    	
    	if ($element->count() > 0) return true;
    	return false;
    	
    }
  
  function finishDelivery($conn,$id){
	    $collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2");
	    $element = $collection->find(array("_id"=>$id));
	    
	    if($element->count() >0){
	        $collection->update(array("_id"=>$id),array('$set'=>array("status"=>"Finished")));
	        return true;
	    }
	    return false;
	}
	
	function acceptDelivery($conn,$id,$pseudo2) {
		$collection = $conn->selectCollection("IbmCloud_94ssgk10_ohqk70nq","test2");
	
		$cursor = $collection->find(array("_id"=>$id));
		$cursor->next();
		var_dump($cursor->current());

        $collection->update(array("_id"=>$id),array('$set'=>array("status"=>"Linked","pseudo2"=>$pseudo2)));

	}
}
    
    
    
?>