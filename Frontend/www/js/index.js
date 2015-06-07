document.addEventListener("deviceready", onDeviceReady, false);
google.maps.event.addDomListener(window, 'load', initialize);

//filter
(function(document) {
	'use strict';

	var LightTableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			if(val.length > 1){
				if(text.indexOf(val) === -1){
					row.style.display = 'none';
				}else{
					row.style.display = 'block';
				}
			}else{
					row.style.display = 'none';
			}
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('input filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});

})(document);




function initialize() {
  mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(45.501593, -73.566363),
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var image = {
        url: 'img/marker.png',
        size: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(32, 64)

    };
    var myLatLng = new google.maps.LatLng(45.495452, -73.563266);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        opacity:0.7
    });

    var pos = {
        url: 'img/pos.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(64, 64),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(32, 32)
    };

    mypos = new google.maps.LatLng(45.501593, -73.566363);
          posMarker = new google.maps.Marker({
          position: mypos,
          map: map,
          icon: pos
     });
    google.maps.event.addListener(marker, 'click', function() {
        //map.setZoom(20);
        //map.setCenter(marker.getPosition());
        marker.setOpacity(1);
		//function 
        deliver();
      });

    //touch perso

}


    // Wait for device API libraries to load
    //
var geohtml =true;
var login = "zakaria";
var myVar=setInterval(function () {myTimer()}, 3000);

function myTimer() {
    if(geohtml){
		showPosition();
	}
}
function showPosition() {
	lat = 45.495474;
    lng = -73.563434;	
	mypos = new google.maps.LatLng(lat, lng);/////////
    posMarker.setPosition(mypos);/////////////////
    
    if(c==0){
    var cor = new google.maps.LatLng(lat, lng); 
    map.setCenter(cor);
    c++;
    }
	//
	var xmlhttpgps = new XMLHttpRequest();
    xmlhttpgps.open("GET", "http://wixigo.mybluemix.net/serve.php?actID=updategps&lat=" + lat +"&lon=" +lng + "&login="+login , true);
    xmlhttpgps.send();
}


var watchID = null;

function onDeviceReady() {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

}



    // onSuccess Geolocation
    //
var c = 0;
function onSuccess(position) {
	
    lat = 45.501593;
    lng = -73.566363;
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    mypos = new google.maps.LatLng(lat, lng);/////////
    posMarker.setPosition(mypos);/////////////////
    
    if(c==0){
    var cor = new google.maps.LatLng(lat, lng); 
    map.setCenter(cor);
    c++;
    }
	//
	var xmlhttpgps = new XMLHttpRequest();
    xmlhttpgps.open("GET", "http://wixigo.mybluemix.net/serve.php?actID=updategps&lat=" + lat +"&lon=" +lng + "&login="+login , true);
    xmlhttpgps.send();
}

    // onError Callback receives a PositionError object
    //
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function locate(){
    var cor = new google.maps.LatLng(lat, lng);
        map.setCenter(cor);
}


function show(name){
    document.getElementById('home_screen').className = 'screenoff';
    document.getElementById('deliver').className = 'screenoff';
    document.getElementById('order').className = 'screenoff';
    document.getElementById('liste').className = 'screenoff';
    document.getElementById('transaction').className = 'screenoff';
    document.getElementById('login').className = 'screenoff';
	
    ele = document.getElementById(name);
    ele.className = 'sceen';
	document.getElementById('mapclicked').innerHTML = "";
	document.getElementById("faceback").style.display = 'none';
}
var todolist = "";
function addtag(tag){
	todolist += "@" + tag + "$"; 
	document.getElementById('filter').value = "";
	var table = document.getElementById("tagtable"); 
	var ro = table.getElementsByTagName("tr"); 
	for (var d = 0; d < ro.length; d++) { 
		status = ro[d].style.display = 'none'; 
	}
	show('liste');
	showlist('items');
}
function mylist(){
	if(todolist != ""){
		showlist('itemsfinish');
		show('transaction');
	}
}

var n=0;
var m=1;
var total="";
var forthis =""
function additem(){
	var inputitem = document.getElementById('iteminput');
	todolist += inputitem.value + ";";
	document.getElementById('items').innerHTML += "<input type='checkbox' name='checkbox"+m+n+"' id='checkbox1"+m+n+"' class='css-checkbox' /><label for='checkbox1"+m+n+"' class='css-label'>" + inputitem.value + "</label>";
	inputitem.value = "";
	n++;
}

function showlist(here){
	var blocks = todolist.split('@');
	var initems = document.getElementById(here);
	initems.innerHTML="";
	for(var i=1;i<blocks.length; i++){
		var store = blocks[i].split('$');
		//put the logo
		var logo = store[0];
		initems.innerHTML += "<img src='img/"+ logo +".png'/>";
		var items = store[1].split(';');
		m=i;
		if(items.length >1){
			for(var j=0;j<(items.length -1); j++){
				var logthis = "<input type='checkbox' name='checkbox"+i+j+"' id='checkbox"+i+j+"' class='css-checkbox' /><label for='checkbox"+i+j+"' class='css-label'>" + items[j] + "</label>";
				initems.innerHTML += logthis;
				n=j
			}
		}
	}
}

function showlistd(here,it){
	var blocks = todorespd.split('@');
	var initems = document.getElementById(here);
	initems.innerHTML="";
	for(var i=1;i<blocks.length; i++){
		var store = blocks[i].split('$');
		//put the logo
		var logo = store[0];
		initems.innerHTML += "<img src='img/"+ logo +".png' style='display:inline;width:150px;'/>";
		var items = store[1].split(';');
		
		m=i;
		if(items.length >1 && it){
			for(var j=0;j<(items.length -1); j++){
				var logthis = "<input type='checkbox' name='checkbox"+i+j+"' id='checkbox"+i+j+"' class='css-checkbox' /><label for='checkbox"+i+j+"' class='css-label'>" + items[j] + "</label>";
				initems.innerHTML += logthis;
				n=j
			}
		}
	}
	
	document.getElementById("mapclicked").innerHTML += "<h1> Total : " + pricee + "</h1>";
	document.getElementById("mapclicked").innerHTML += "<h1> Reward : " +  rewardd + "</h1>";
	if(it == false){
		var btn = "<div class='band clicked' id='btn3' align='center' onclick=\"showlistd('mapclicked',true)\"><div class='icon arrowleft left'></div><h1>GO !</h1></div>"
		document.getElementById("mapclicked").innerHTML += btn;
	}else{
		//show pic and phone
		document.getElementById("faceback").style.display = 'block';
	}
	
}

function deliver(){
	document.getElementById('mapclicked').innerHTML = "";
	var xmlhttpd = new XMLHttpRequest();
        xmlhttpd.onreadystatechange = function() {
            if (xmlhttpd.readyState == 4 && xmlhttpd.status == 200) {
                var p = xmlhttpd.responseText;
				//keys = Object.keys(p);
				
				keysold = JSON.parse(p);
				keys = Object.keys(keysold);
				//console.log(keys);
				for(var i = 0; i < keys.length; i++){
					//console.log(keys[i] + "=" + p[keys[i]]);   
					last = keys[i];
				}
				console.log(last);
				pricee = keysold[last].price;
				todorespd = keysold[last].itemlist;
				rewardd = keysold[last].reward;
				console.log(todorespd);
				showlistd('mapclicked',false);
				
				
				
				//show('deliver');
				//alert(todo_id);
				
            }
        }
        xmlhttpd.open("GET", "http://wixigo.mybluemix.net/serve.php?actID=getfree", true);
        xmlhttpd.send();
	
}

function submit(){
	total=document.getElementById('total').value;
	reward = document.getElementById('for').value;
	
    if (todolist.length == 0) { 
        document.getElementById("resp").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				showlist('itemsfinish');
				show('transaction');
                todoresp = xmlhttp.responseText;
				todo_id = JSON.parse(todoresp).$id;
				//alert(todo_id);
            }
        }
        xmlhttp.open("GET", "http://wixigo.mybluemix.net/serve.php?actID=addrequest&login="+login+"&price=" + total + "&reward=" + reward + "&itemlist=" + todolist, true);
        xmlhttp.send();
    }
	
	document.getElementById('total').value="";
	document.getElementById('for').value="";
	
}

function loginwixi(){
	login = document.getElementById('username').value;
	document.getElementById('name').innerHTML = login;
	document.getElementById('face').style.backgroundImage = "url('img/"+login+".jpg')	";
	document.getElementById('headright').style.backgroundImage = "url('img/"+login+".jpg')	";
	show('home_screen');
}
