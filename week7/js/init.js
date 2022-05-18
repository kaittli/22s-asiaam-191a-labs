// declare variables
let mapOptions = {'center': [34.0709,-118.888],'zoom':5};

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

let Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});


Stadia_AlidadeSmooth.addTo(map)

// add layer control box
L.control.layers(null,layers).addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['Were you recommended this food spot by someone else? '] == "Yes"){
        circleOptions.fillColor = 'rgb(180, 70, 170)'
        recommended.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Recommended by someone else</h2>`))
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
