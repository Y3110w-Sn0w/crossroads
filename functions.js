// AJAX to manage JSON file
function ajax_get_json(){
    var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.setRequestHeader("Content-Type", "application/json",true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            var return_data = JSON.parse(hr.responseText);
            document.getElementById("test").innerHTML = 
            return_data.title;
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
        notHidden = null;
    }

    tile.className.replace("hidden","");
    notHidden = tile;
}


// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;