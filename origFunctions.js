// AJAX to manage JSON file
function ajax_get_json(){
    var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.setRequestHeader("Content-Type", "application/json",true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            var return_data = JSON.parse(hr.responseText);

            //variable to hold the array of booths that have been returned from JSON
            var booths = return_data.Booths;
            // variable to keep track of the outer divs that will contain booths and eventually, the menu
            var counter = 0;
            // loop that goes through and creates the booth images and the div for each set of images.
            for(var i = 0; i < booths.length; i++){
                var divElement;
                //This if is to create a container for two booths at a time.
                if(i == 0 || i % 2 == 0){
                    //here is the creation of the div(here, there is only one per two booths)
                    divElement = document.createElement('div');
                    //here we assign the div a unique id.. we may eventually get rid of this div if we can
                    //figure out a more responsive approach so that how many we have wide will be dynamic.
                    divElement.id = 'div ' + counter;
                    //here we take the main div in the body of html and fill it with the above created.
                    document.getElementById('centerDiv').appendChild(divElement);
                    counter++;
                }
                //create an img element that we will use for each booth.
                var imgElement = document.createElement('img'); 
                //grab the url for each booth and place it in the src attribute.
                var url = booths[i].image;
                imgElement.setAttribute("src",url);
                // for each image, we will pass the number as an id and add create and populate a menu on the fly.
                imgElement.onclick = showCreateMenu(i);
                divElement.appendChild(imgElement);
            }
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

function showCreateMenu(id) {
    var parent = document.getElementById(id);
    var element = document.createElement('div');
    if(document.getElementById('menu')){
        document.body.removeChild(document.getElementById('menu'));
    }
    element.id = 'menu';    
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