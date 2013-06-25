// AJAX to manage JSON file
function get_json_worker(){
            var worker_main = new Worker("workersMain.js?version=1");
            // this is where all of our DOM code will go?
            worker_main.onmessage = function(e){
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
                worker_main.terminate();
            } 
            worker_main.postMessage();
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
    // Create worker
    var worker_menu = new Worker("workerMenu.js?version=1");
    // Set Callback function        
    worker_menu.onmessage = function(e) {
      // get data that is passed form the worker
      var menuArray = e.data;
      // Create the HTML elements and give them the right attributes
      // ** Left div
      // divMenu = document.createElement('div');
      // divMenu.className = "left-menu";
      // ** Left div's content
      // imgMenu = document.createElement('img');
      // imgMenu.setAttribute('src', menuArray.Special.image);
      // imgMenu.setAttribute('alt', 'Special dish picture');
      // ** Price
      // h2Price = document.createElement('h2');
      // h2Price.HTML = menuArray.Special.Price;

      // ** Rigth div

      // imgRecommended = document.createElement('img');
      // console.log(menuArray);
      for(var type in menuArray){
        var value = menuArray[type];
        console.log(type);
        console.log(value);
      }

      //
    }

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
            worker_menu.postMessage(id);
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
            worker_menu.postMessage(id);
            //           ** set the menu to an expanded state **
            setTimeout(function(){element.style.height = '150px'},10);
            //           ** element is now an open div **
            openDiv = element;
        } 
    }
}


// The Dynamic HTML that we will create using JavaScript and workers
// <div id="the dynamic menu div">
//   <div id="dynamic">
//     <img src="grabbed from JSON object" />
//     <h2>Price</h2>
//     <div id="rating-bar"></div> <!-- the stars will be put on the background, and we will dynamically control the width of the div -->
//     <h1>Dish Name</h1>
//   </div>
//   <div id="fav-btn">
//     <button><img src="favorite-star"></button>
//     <p>Add to Favorite</p>
//   </div>
// </div>

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;