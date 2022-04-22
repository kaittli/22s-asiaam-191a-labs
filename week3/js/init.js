// declare the map
const map = L.map('the_map').setView([45.0709,-65.888], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// addMarker(37,-122,'home','home land!')
// addMarker(32,-118,'work','where i work land!')
// addMarker(39,-119,'location 1','random location')
// addMarker(36,-120,'location 2','another random location')


// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title)
    return message
}
// function createButtons(latitude, longitude,title){
//     const newButton = document.createElement("button"); 
//     newButton.id = "button"+title; 
//     newButton.innerHTML = "this is button is:" + title; 
//     newButton.setAttribute("lat",latitude); 
//     newButton.setAttribute("lng",longitude); 
//     newButton.addEventListener('click', function(){
//         map.flyTo([latitude,longitude]); 
//     })
//     document.getElementById("contents").appendChild(newButton);
// }
fetch("map.geojson")
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data,{
            pointToLayer: (feature, latlng) => { 
                return L.circleMarker(latlng, {color: feature.properties.color})
            }
        }).bindPopup(layer => {
            return layer.feature.properties.place;
        }).addTo(map)
    });

    // console.log(hello)
    // .then(function (data){
    //     return data.json()
    // })
    // .then(function (data){
    //     // Basic Leaflet method to add GeoJSON data
    //     L.geoJSON(data).addTo(map)
    // });

    // console.log(hello)