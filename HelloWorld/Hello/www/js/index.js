/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


	map: null,
    watchID: null,
    // Application Constructor
    initialize: function() {

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
       $("#kamera").bind("tap", app.starteKamera);
	   app.bestimmePosition();
	   app.ladeGoogleMap();
	
	   
    },

    onButtonClick: function() {




    },
	
	bestimmePosition: function() {
		navigator.geolocation.
		getCurrentPosition(app.onSuccessGPS, app.onErrorGPS);
	},
	
	onSuccessGPS: function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		app.map.setCenter(
			{lat: latitude, lng: longitude}
		);
		
	},
	
	onErrorGPS: function(error) {
		alert("Fehler bei GPS aufgetreten!");
	},
	
	ladeGoogleMap: function() {
		alert(app.latitude);
		app.map = new google.maps.Map(document.getElementById('mapContainer'), {
          center: {lat: 46, 
					lng: 7},
          zoom: 8
        });
	},
	
	starteKamera: function() {
		var options = {
			destinationType : 1
		};
		navigator.camera.getPicture(app.onSuccess, app.OnFail, options);
	},
	
	onSuccess: function(imageData) {
		alert(imageData);
		var image = $("#myImage");
		image.attr("src", imageData);
		image.css("display", "block");
	},
	
	onFail: function() {
		alert("Fehler");
	}
	
};


