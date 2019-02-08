function createMap(data) {

	let mymap = new google.maps.Map(document.getElementById('mapid'), {
          center: { lat: 30.2672, lng: -97.7431 },
          zoom: 14
		}),
		trafficLayer = new google.maps.TrafficLayer(),
		strokeColors = generateColor('#7f0777', '#ff0ff0', data.length);
   
    trafficLayer.setMap(mymap);
	
	for (var i = 0; i < data.length; i++) {
		start_lat = parseFloat(data[i]['start_latitude']);
		start_lon = parseFloat(data[i]['start_longitude']);
		end_lat = parseFloat(data[i]['end_latitude']);
		end_lon = parseFloat(data[i]['end_longitude']);

		addRoadPath('#' + strokeColors[i], new google.maps.Polyline({
			path: [
				{ lat: start_lat, lng: start_lon },
				{ lat: end_lat, lng: end_lon}
			]
		}).getPath(), mymap, 'AIzaSyDz5V-Y2zvLoty8FN-hzFj99ohNIHnPNp8');
	};
};