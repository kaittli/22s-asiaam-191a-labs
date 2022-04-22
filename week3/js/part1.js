// declare the map
const map = L.map('the_map').setView([37.5709, -121.888], 9.5);
// let mapoptions= {'center': [34.609,-118.444], 'zoom': 5}
// console.log(mapoptions)
//const map = L.map('the_map').setView([37.5709, -121.888], 9); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(37.40441852494992, -122.11735385658818,'Boba Bliss', 'Family-owned business that uses only nonartifical ingredients for boba drinks')
addMarker(37.74321168022817, -122.47332396837658, 'Mr Szechuan', 'For the spicy/Szechuan food lovers craving traditional dishes in a modern setting')
addMarker(37.661719260092376, -121.87261797393313, 'Meadowlark Dairy','Drive-thru softserve spot with rotating seasonal flavors')
addMarker(37.455978559249026, -121.9097665622934, 'RawASF', 'Plant based cafe offering vegan burgers, pizza, and (my fav) customizable acai bowls')
addMarker(37.330615660037694, -121.87927994920632,'Cali Spartan tacos', 'Small shop that serves amazing crispy tacos')
addMarker(37.32058116404451, -122.03109125858902, 'XLB Kitchen', 'Cute spot serving soup dumplings + other Chinese dishes—ran by a super hardworking owner')


// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title)
    return message
}
function createButtons(latitude, longitude,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",latitude); 
    newButton.setAttribute("lng",longitude); 
    newButton.addEventListener('click', function(){
        map.flyTo([latitude,longitude]); 
    })
    document.getElementById("contents").appendChild(newButton);
}

