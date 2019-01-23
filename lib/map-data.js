function createMap(data) {
    var mymap = L.map('mapid').setView([30.267, -97.743], 14);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Scooter Data © <a href="https://data.austintexas.gov/Transportation-and-Mobility/Dockless-Vehicle-Trips/7d8e-dm7r/">City of Austin</a>, Data Updated ' + data[0]['end_time'],
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoicmpoZW5uZXNzeTE1IiwiYSI6ImNpeG0xN2FrYzAwYW4ycWxlbmZicGVxbHkifQ.XpxhhKIDvEdlZvcsCupIsQ'
    }).addTo(mymap);

    for (var i = 0; i < data.length; i++) {
        start_lat = data[i]['start_latitude'];
        start_lon = data[i]['start_longitude'];
        end_lat = data[i]['end_latitude'];
        end_lon = data[i]['end_longitude'];

        arrow = L.polyline([[start_lat, start_lon],
        [end_lat, end_lon]],
            {
                opacity: .6,
                dashArray: "8, 5",
                dashSpeed: -20,
                color: "#EA1D5D"
            }).addTo(mymap);
    };
};