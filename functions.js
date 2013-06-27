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
                // worker_main.terminate();
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

      // Set up variables for the menus items retrieved in menuArray
      var menuFood, menuImage, menuPrice, menuRating;
      // Set up variables for the HTML elements that will be created
      var rightDiv, leftDiv, imgDish, priceElement, starsDiv, nameDish, btnImg; 
      // Use "reflection" to get the elements inside menu in booths.json
      for(var type in menuArray){
        // Get the menu element's content (NOT the index, but its content)
        var value = menuArray[type];

        // Store the elements in variables
        menuFood = value.food;
        menuImage = value.image;
        menuPrice = value.price;
        menuRating = value.rating; // ---> not being used
        
        // Create HTML elements and set their attributes
        leftDiv = document.createElement('div');
        leftDiv.className = 'menuLeftDiv';

        imgDish = document.createElement('img');
        imgDish.src = menuImage;
        imgDish.alt = 'Picture of the dish';

        priceElement = document.createElement('h2');
        priceElement.className = 'menuPrice';
        priceElement.innerHTML = '$' + menuPrice;

        starsDiv = document.createElement('div');
        starsDiv.className = 'menuRating';

        nameDish = document.createElement('h1');
        nameDish.className = 'menuDishName';
        nameDish.innerHTML = menuFood;

        rightDiv = document.createElement('div');
        rightDiv.className = 'menuRightDiv';
        
        btnImg = document.createElement('img');
        btnImg.src = '#'; // ----------> Put the right URL for the STAR image here
        btnImg.alt = 'Add to favorite icon';

        // ** This is the HTML that should be created
        // <div class="menuLeftDiv">
        //   <img src= menuImage />
        //   <h2 class="menuPrice"></h2>
        //   <div class="menuRating"></div>
        //   <h1>menuFood</h1>
        // </div>
        // <div class="menuRightMenu">
        //   <img src="#">
        // </div>

        // Append the elements to their parents
          document.getElementById("menu"+id+" "+dir).appendChild(leftDiv);
          leftDiv.appendChild(imgDish);
          leftDiv.appendChild(priceElement);
          leftDiv.appendChild(starsDiv);
          leftDiv.appendChild(nameDish);
        
          document.getElementById("menu"+id+" "+dir).appendChild(rightDiv);
          rightDiv.appendChild(btnImg); 
               
      }
    } // worker_menu END

    if(openDiv){
      openDiv.style.height = '0px';
    }
        // ///// put up a div for the menu. ///////
        //     1.2.1 ** the div already exists! **
        if(document.getElementById("menu"+id+" "+dir)){
            //           ** animate div to 150px **
            element = document.getElementById("menu"+id+" "+dir);
            element.style.height = '150px';
            //           ** Delete the data in the div before refilling it
            element.innerHTML = '';
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

// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;