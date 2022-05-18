// declare variables
let mapOptions = {'center': [34.0709,-118.888],'zoom':3};

let recommended = L.featureGroup();
let nonrec = L.featureGroup();

let layers = {
    "Recommended by someone else": recommended,
    "Not recommended by someone else": nonrec
}

let circleOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 10,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYOYDGNORWo0i8Vy54NR9PTlPFTOQwsN_UHO77sellmiL8rqo38ZUgzD67eN-83F620EaunRed0zJ6/pub?output=csv";

const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


CartoDB_Positron.addTo(map)

// add layer control box
L.control.layers(null,layers).addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['Were you recommended this food spot by someone else? '] == "Yes"){
        circleOptions.fillColor = 'rgb(180, 70, 170)'
        recommended.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Recommended by someone else</h2> <h2>${data['What is the name of the food spot that you would like to share? ']}</h2> <h2>${data['Why are you choosing to share this spot?']}</h2>`))
        createButtons(data.lat,data.lng,data['What is the name of the food spot that you would like to share? '])
        }
    else{
        circleOptions.fillColor = "rgb(80, 30, 130)"
        nonrec.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Not recommended by someone else</h2>`))
        createButtons(data.lat,data.lng,data['What is the name of the food spot that you would like to share? '])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    recommended.addTo(map) // add our layers after markers have been made
    nonrec.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([recommended,nonrec]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)
