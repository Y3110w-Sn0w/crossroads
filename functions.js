// /////////////// ESTABLISH GLOBAL VARIABLES ///////////////////// //
// create an array to either hold an instance of every object or to hold the name of every object.
var functionMap = new Object();
// we need to have a command for every option 
// (booth clicked, add to favorites, favorites clicked, history clicked)
functionMap.getMenu = showCreateMenu;
functionMap.addFav = addFav;
functionMap["getFav"] = getFav;
// to store the old parent to see if it is the same.
var opensParent = null;
var openDiv = null;

// ///////////////// FUNCTION THAT WILL BE RUN ON LOAD TO CREATE THE PAGE INITIALLY ////////////// //
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
                   divElement.id = counter;
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
               if(i > mainArray.length - 3){
                  imgElement.setAttribute("onclick","clicked('getMenu',this)");
                  imgElement.id = "favorites";
               }else{
                  imgElement.setAttribute("onclick","clicked('getMenu', this)");
                  imgElement.id = i;
               }
               imgElement.className = dir;
               divElement.appendChild(imgElement);
           }
          // worker_main.terminate();
        }
        worker_main.postMessage();
}





//an onclick function that will be our application controller
function clicked(cmd, element){

  functionMap[cmd](element);

}



function addFav(dishLStitle){
  //variable for new data that needs to be stored
    var storeMe = new Object();
    // see if there was data sent in to be stored.
    if(dishLStitle){
      dishLS = lsinfo[dishLStitle];
      //now we need to see if there is something already in LS. 
      if(localStorage.getItem('menus')){
        storeMe = JSON.parse(localStorage.getItem('menus'));
        storeMe[dishLStitle] = dishLS;
      }
      //no LS existed before. Store new stuff.
      else{
        // store the two variables from the array into the storeMe as an Object.
        storeMe[dishLStitle] = dishLS;
      }
    }
    //there was no data passed in so set it to null.
    else{
      storeMe = null;
    }

    localStorage.setItem('menus',JSON.stringify(storeMe));
    return;
}

function getFav(element){
    var favorites = JSON.parse(localStorage.getItem('menus'));
    if(favorites == null){
      favorites = {"menus":"Empty"};
    }
    return favorites;
}

function scrollToMe(pageElement){
    var positionX = 0,         
        positionY = 0;    

    while(pageElement != null){        
        positionX += pageElement.offsetLeft;        
        positionY += pageElement.offsetTop;        
        pageElement = pageElement.offsetParent;        
        window.scrollTo(positionX, positionY);  
    }
}



// var i = 0;  
// this array is for each individual menu item?
var lsinfo = new Object();
// var instanceArray = new Array();
// function for ONCLICK of images 
//********** <id> is to find parent while <dir> is to style menu
function showCreateMenu(clkElement) {
  //dir is the class name for each booth (left or right)
  var dir = clkElement.className;
  //We get the parent and use it to append the new child or change the existing.
  var clkParent = clkElement.parentNode;
  var param = null;
  var element = null;
  //  1. is it the same div that is already open?
  //   1.1. ** Yes **
  if(document.getElementById("menu"+clkParent.id+" "+dir) == openDiv && document.getElementById("menu"+clkParent.id+" "+dir)){
    openDiv.style.height = '0px';
        //      ** there are no open divs anymore **
        openDiv = null;
        opensParent = null;
        // ** nothing more needs done **
        return;
  }
  //   1.2. ** No **
  else{
        // Create worker based on if its a booth or a fav/his
        if(clkElement.id != 'favorites'){
            var worker_menu = new Worker("workerMenu.js?version=1");
            param = clkElement.id;
        }else{
            var param = getFav(clkElement);
            var worker_menu = new Worker("workerFav.js?version=1");
        }
        // Set Callback function        
        worker_menu.onmessage = function(e) {
            // get data that is passed form the worker
            var eDataArray = e.data;
            createHTML(eDataArray);
        } // worker_menu END

        if(openDiv){
          openDiv.style.height = '0px';
        }
        // ///// put up a div for the menu. ///////
        //     1.2.1 ** the div already exists! **
        if(document.getElementById("menu"+clkParent.id+" "+dir)){
            //           ** animate div to 150px **
            element = document.getElementById("menu"+clkParent.id+" "+dir);
            element.style.height = '150px';
            //           ** Delete the data in the div before refilling it
            element.innerHTML = '';
            //           ** fill the div with the menu data **
            if(param.menus == 'Empty'){
              emptyFav();
            }else{
              worker_menu.postMessage(param);
            }
            // scroll to the open element;
            setInterval(scrollToMe(element),1000);
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
            element.id = "menu"+clkParent.id+" "+dir;
            element.className = 'tile-menu';
            //           ** get the parent div so we can append the new child **
            opensParent = clkParent;
            //           ** append the child **
            opensParent.appendChild(element);
            //           ** fill the div with the menu data **
            if(param.menus == 'Empty'){
              emptyFav();
            }else{
              worker_menu.postMessage(param);
            }
            // scroll to the open element;
            setInterval(scrollToMe(element),1000);
            //           ** set the menu to an expanded state **
            setTimeout(function(){element.style.height = '150px'},10);
            //           ** element is now an open div **
            openDiv = element;
        }
    }

    function emptyFav(ele){
      newElement = document.createElement('h2');
      newElement.innerHTML = 'You have no Favorites.';
      document.getElementById("menu"+clkParent.id+" "+dir).appendChild(newElement);
    }

    function createHTML(menuArray){
      // Set up variables for the HTML elements that will be created
      var rightDiv, leftDiv, imgDish, priceElement, starsDiv, nameDish, btnImg; 
      // Use "reflection" to get the elements inside menu in booths.json
      for(var type in menuArray){

          // Set up variables for the menus items retrieved in menuArray
          var menuFood, menuImage, menuPrice, menuRating;

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
          btnImg.src = '/images/favreg.gif';
          btnImg.alt = 'Add to favorite icon';

          // This is for putting data in the array for adding to favorites
          lsinfo[menuFood] = clkElement.id;
          btnImg.setAttribute("onclick","clicked('addFav','"+menuFood+"');");

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
          document.getElementById("menu"+clkParent.id+" "+dir).appendChild(leftDiv);
          leftDiv.appendChild(imgDish);
          leftDiv.appendChild(priceElement);
          leftDiv.appendChild(starsDiv);
          leftDiv.appendChild(nameDish);
                
          document.getElementById("menu"+clkParent.id+" "+dir).appendChild(rightDiv);
          rightDiv.appendChild(btnImg); 
                 
      }
    }
}


// Add the above functions inside pageLoaded() if you want then to run after the page is loaded on the browser
function pageLoaded() {
  get_json_worker();
}





// LEAVE THIS CODE ALWAYS AT THE BOTTOM
// Load all functions after page is completely loaded
window.onload = pageLoaded;