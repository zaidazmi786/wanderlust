// map.js
document.addEventListener("DOMContentLoaded", function () {
    const mapDiv = document.getElementById("map");

     
    if (!mapDiv) return;

    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lng);
    const location = mapDiv.dataset.location;
    const country = mapDiv.dataset.country;

    if (isNaN(lat) || isNaN(lng)) return;

    const coordinates = [lat, lng];
    console.log("COORDINATES:", coordinates);

    const leafletMap = L.map('map').setView(coordinates, 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 9
    }).addTo(leafletMap);

  


        //add marker color

        L.marker(coordinates, {
    icon: L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color:red; width:25px; height:25px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); border:2px solid white; box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [20, 30],
    })
}).addTo(leafletMap)
    .bindPopup(`<b>${location}</b><br>${country}`)
    .openPopup();
});

