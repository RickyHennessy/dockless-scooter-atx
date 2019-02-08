function createMap(data) {

	let mymap = new google.maps.Map(document.getElementById('mapid'), {
          center: { lat: 30.2672, lng: -97.7431 },
          zoom: 14
		});

	var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mymap);

	strokeColors = generateColor('#7f0777', '#ff0ff0', data.length);
	
	for (var i = 0; i < data.length; i++) {
		start_lat = parseFloat(data[i]['start_latitude']);
		start_lon = parseFloat(data[i]['start_longitude']);
		end_lat = parseFloat(data[i]['end_latitude']);
		end_lon = parseFloat(data[i]['end_longitude']);

		// arrow = new google.maps.Polyline({
		// 	path: [
		// 		{ lat: start_lat, lng: start_lon },
		// 		{ lat: end_lat, lng: end_lon },
		// 	],
		// 	strokeColor: '#FF0000',
		// 	strokeOpacity: 1.0,
		// 	strokeWeight: 2
		// }).setMap(mymap);

		addRoadPath('#' + strokeColors[i], new google.maps.Polyline({
			path: [
				{ lat: start_lat, lng: start_lon },
				{ lat: end_lat, lng: end_lon}
			]
		}).getPath(), mymap, 'AIzaSyDz5V-Y2zvLoty8FN-hzFj99ohNIHnPNp8');
	};
};