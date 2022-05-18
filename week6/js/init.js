// declare variables
let mapOptions = {'center': [38.0709,-121.888],'zoom':8}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    //console.log(message)
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['What is the name of the food spot that you would like to share? ']}</h2> <h3>${data['Why are you choosing to share this spot?']}</h3>`)
    createButtons(data.lat,data.lng,data['What is the name of the food spot that you would like to share? '])
    return 
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
//for below, use your own survey!!
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWVB8_DuecymTGdxqweUlUj1x64PdYZK14dJbGHWuffaW6DaZ_8HgRFeWbkXJNzPdc_5WJXGm26Zhn/pub?output=csv"

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
}
loadData(dataUrl)
