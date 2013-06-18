// AJAX to manage JSON file
function get_json_worker(){
            var worker=new Worker("workersMain.js?version=1");
            // this is where all of our DOM code will go?
            worker.onmessage = function(e){
                //put all the dom functions here because when the worker is done, 
                // this is where the data will be returned and the dom can therefore be used.
                var mainArray = e.data;
                //variable to keep track of the outer divs that will contain booths and eventually, the menu
                var counter = 0;
                // loop that goes through and creates the booth images and the div for each set of images.
                for(var i = 0; i < mainArray.length; i++){
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
                   var url = mainArray[i];
                   imgElement.setAttribute("src",url);
                   // for each image, we will pass the number as an id and add create and populate a menu on the fly.
                   imgElement.setAttribute('onclick','showCreateMenu('+(counter - 1)+');');
                   divElement.appendChild(imgElement);
                }
            } 
            worker.postMessage();
}
            
// Add the above functions inside pageLoaded() if you want then to run after the page is loaded on the browser
function pageLoaded() {
    get_json_worker();
}

var parentOld = null;
var nextDestroy = null;
        
//function to create and destroy menus on the fly based on the id of the parent div
function showCreateMenu(id) {
    var parent = document.getElementById('div '+id);
    //if the old parent is the same as the current called parent
    if(parent == parentOld){
        nextDestroy.style.height = '0px';
        killElement(nextDestroy);
        parentOld = null;
        nextDestroy = null;
        return;
    }
    //if the element 'nextDestroy' exists
    if(nextDestroy){
        //set the hieght to 0px and then destroy.
        nextDestroy.style.height = '0px';
        killElement(nextDestroy);
    }
    var element = document.createElement('div');
    parent.appendChild(element);
    element.style.height = '0px';
    element.id = 'menu '+dir;    
    element.className = 'tile-menu';
    parentOld = parent;
    nextDestroy = element;
    element.style.height = '150px';
}

//create a function that will destroy any given element.
function killElement(y){
    y.parentNode.removeChild(y);
}

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;