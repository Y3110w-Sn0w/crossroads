// AJAX to manage JSON file
function ajax_get_json(){
    var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.setRequestHeader("Content-Type", "application/json",true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            var return_data = JSON.parse(hr.responseText);
            console.log(return_data.Booths);
            console.log(return_data.Booths.length);
            // document.getElementById("test").innerHTML = return_data[0];
        }
    }

    hr.send(null);
}

// Add the above functions inside pageLoaded() if you want then to run after the page is loaded on the browser
function pageLoaded() {
    ajax_get_json();
}
        
// Show menu form the clicked tile
var notHidden = null;

function showElement(tile){
    if (notHidden){
        if (notHidden.className == "tile-menu" && notHidden.id == tile.id) {   
            notHidden.className = "hidden tile-menu";
            notHidden.style.height = '0px';
        }
        else {
            notHidden.className = "hidden tile-menu";
            tile.style.height = '150px';
            tile.className = "tile-menu";
            notHidden = tile;
        }
    }
    else {
            tile.className = "tile-menu";
            tile.style.height = '150px';
            notHidden = tile;
    }
}

function changeDisplay(element) {
    if (document.getElementById(element).style.height != "150px") {
        document.getElementById(element).style.height = '150px';
        notHidden = element;
    }
    else {
        document.getElementById(element).style.height = '0px';
    }

    if (notHidden.style.height == element.style.height) {
        notHidden.style.height = '0px';
    }
}

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;