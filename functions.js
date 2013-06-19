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
                   var dir = 'right';

                   //This if is to create a container for two booths at a time.
                   if(i == 0 || i % 2 == 0){
                       dir = 'left';
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
                   imgElement.setAttribute('onclick','showCreateMenu(' + (counter - 1) + ', "' + dir + '");');
                   divElement.appendChild(imgElement);
                }
            } 
            worker.postMessage();
}



            
// Add the above functions inside pageLoaded() if you want then to run after the page is loaded on the browser
function pageLoaded() {
    get_json_worker();
}



// to store the old parent to see if it is the same.
var opensParent = null;
var openDiv = null;


        
// function for ONCLICK of images 
//********** <id> is to find parent while <dir> is to style menu
function showCreateMenu(id, dir) {
  var element = null;
  //  1. is it the same div that is already open?
  //   1.1. ** Yes **
  if(document.getElementById("menu"+id+" "+dir) == openDiv && document.getElementById("menu"+id+" "+dir)){
        openDiv.style.height = '0px';
        //      ** there are no open divs anymore **
        openDiv = null;
        opensParent = null;
        // ** nothing more needs done **
        return;
  }
  //   1.2. ** No **
  else{
        if(openDiv){
          openDiv.style.height = '0px';
        }
        // ///// put up a div for the menu. ///////
        //     1.2.1 ** the div already exists! **
        if(document.getElementById("menu"+id+" "+dir)){
            //           ** animate div to 150px **
            element = document.getElementById("menu"+id+" "+dir);
            element.style.height = '150px';
            //           ** fill the div with the menu data **
// worker stuff should go here to get the menu data
            //           ** element is now an open div **
            openDiv = element;
            //           ** all done here **
            return;
        }
        //   1.2.2 ** div does not exist **
        else{
            //           ** create the new element to be added **
            element = document.createElement('div');
            //           ** add the id that we need for future manipulation **
            element.id = "menu"+id+" "+dir;
            element.className = 'tile-menu';
            //           ** get the parent div so we can append the new child **
            opensParent = document.getElementById("div "+id);
            //           ** append the child **
            opensParent.appendChild(element);
            //           ** fill the div with the menu data **
// worker stuff again to get menu data. 
            //           ** set the menu to an expanded state **
            setTimeout(function(){element.style.height = '150px'},10);
            //           ** element is now an open div **
            openDiv = element;
        } 
    }
}

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;