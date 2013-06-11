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
                    divElement = document.createElement('div');
                    divElement.id = 'div ' + counter;
                    document.getElementById('centerDiv').appendChild(divElement);
                    counter++;
                }
                var imgElement = document.createElement('img'); 
                var imgElement.id = i;
                var url = booths[i].image;
                imgElement.setAttribute("src",url);
                // here we could pass in the id of the picture and therefore know which div it belongs to.
                // this means that we could then create a div (menu) on the fly and append it to the appropriate 
                // div.??? what are others thoughts?
                // imgElement.onclick = showMenu(i);
                divElement.appendChild(imgElement);
                // if(i % 2 != 0){
                //     var divElement1 = document.createElement('div');
                //     var divElement2 = document.createElement('div');
                //     divElement1.id = 'menu-'+ (i - 1);
                //     divElement2.id = 'menu-'+ i;
                //     document.getElementById('centerDiv').appendChild(divElement1);
                //     document.getElementById('centerDiv').appendChild(divElement2);
                // }
            }
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