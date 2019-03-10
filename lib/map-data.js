function createMap(data) {
    var mymap = L.map('mapid').setView([30.265, -97.743], 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Scooter Data © <a href="https://data.austintexas.gov/Transportation-and-Mobility/Dockless-Vehicle-Trips/7d8e-dm7r/">City of Austin</a>, Data Updated ' + data[0]['end_time'],
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoicmpoZW5uZXNzeTE1IiwiYSI6ImNpeG0xN2FrYzAwYW4ycWxlbmZicGVxbHkifQ.XpxhhKIDvEdlZvcsCupIsQ'
    }).addTo(mymap);

    // fitler to contain only most recent hour of data    
    var updated_datetime = new Date(data[0]['end_time'])
    updated_datetime.setHours(updated_datetime.getHours() - 1);

    data = data.filter(function(trip) {
        return new Date(trip['end_time']) >= updated_datetime
    });

    // look for hot spots by counting duplicate coordinates
    end_coords = data.map(x => [x['end_latitude'], x['end_longitude']])

    var counts = {};
    for (var i = 0; i < end_coords.length; i++) {
        var num = end_coords[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    };

    var hot_spots = Object.keys(counts).filter(coords => counts[coords] >= 15)
    hot_spots = hot_spots.map(coords => coords.split(","))

    // Visualize scooter rides
    for (var i = 0; i < data.length; i++) {
        start_lat = data[i]['start_latitude'];
        start_lon = data[i]['start_longitude'];
        end_lat = data[i]['end_latitude'];
        end_lon = data[i]['end_longitude'];

        arrow = L.polyline([[start_lat, start_lon], [end_lat, end_lon]],
            {
                opacity: .25,
                dashArray: "8, 5",
                dashSpeed: -20,
                color: "#EA1D5D",
                interactive: false
            }).addTo(mymap);
    };

    // Place markers on hot spots
    for (var i = 0; i < hot_spots.length; i++) {
        L.circleMarker(hot_spots[i],
            {
                radius: 5,
                color: "white",
                stroke: false,
                fillOpacity: .7,

            }).addTo(mymap)
    }
};