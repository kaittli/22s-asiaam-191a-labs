// JavaScript const variable declaration
const map = L.map('the_map').setView([37.5709, -121.888], 9); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker


// function my_first_function(){
//     console.log("hi")
// }
// my_first_function()

function add_marker(lat,lng,popup){
    L.marker([lat, lng]).addTo(map) 
    .bindPopup(popup)
    
}
add_marker(37.40441852494992, -122.11735385658818,'Boba Bliss—fav boba')
add_marker(37.330615660037694, -121.87927994920632,'Spartan tacos—fav tacos')
add_marker(37.32058116404451, -122.03109125858902, 'XLB Kitchen—fav Chinese food')
add_marker(37.396761218988345, -121.87187502181764, 'Pho Dao—fav pho')
add_marker(37.74321168022817, -122.47332396837658, 'Mr Szechuan— fav spicy Chinese food')
add_marker(37.42160225140011, -122.10008346837652, 'Dohatsuten—fav ramen spot')
add_marker(37.661719260092376, -121.87261797393313, 'Meadowlark Dairy—fav softserve')
add_marker(37.35731690734278, -121.90282945118024, 'Danbi—fav Korean food')
add_marker(37.455978559249026, -121.9097665622934, 'Rawasf—fav acai bowls')
add_marker(37.42162430703591, -121.91410000700013, 'Shihlin Street Snacks—fav snack place')
add_marker(37.319757751713645, -121.94664890091697, 'Mendocino Farms—fav salad spot')
add_marker(37.55181697009097, -121.97811777526127, 'Sala Thai—fav Thai food')



// let marker = L.marker([34.0709, -118.444]).addTo(map) 
//         .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
//         .openPopup();
// let marker2 = L.marker([37.40441852494992, -122.11735385658818]).addTo(map) 
//         .bindPopup('Boba Bliss—best boba')
//         .openPopup();
// let marker3 = L.marker([37.330615660037694, -121.87927994920632]).addTo(map) 
//         .bindPopup('Spartan tacos')
//         .openPopup();