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
var i = 0;

function showMenu(x) {
    
    var element = document.getElementById(x);
        
        if (element.style.height != "150px") {
            element.style.height = '150px';
        }
        else {
            element.style.height = '0px';
        }

        if (notHidden && notHidden != element) {
            notHidden.style.height = '0px';
        }

        notHidden = element;
}

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;