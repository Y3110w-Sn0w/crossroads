//this would be a worker. This runs on its own. Cannot access 'document'.
self.onmessage = function(param){
    jsonFav = param.data
	var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.setRequestHeader("Content-Type", "application/json",true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            var return_data = JSON.parse(hr.responseText);
            var resultObj = new Object(); 
            // variable for for loop and indexes
            var indices;
            // a for loop to go through the local storage object.
            for(var dish in jsonFav){
                indices = jsonFav[dish];
                var i = 1;
                // store title of booth
                var boothTitle = return_data.Booths[indices].title;
                // grab booth at index
                var menu = return_data.Booths[indices].menu;
                for(var type in menu){
                    if(dish == menu[type]['food']){
                        // Here, we had to account for if someone 'fav' two
                        // dishes from the same booth. it will display:
                        // "Tuscan Valley 1" then the dish. This prevents 
                        // duplicate keys.
                        resultObj[boothTitle + ' ' + i] = new Object();
                        resultObj[boothTitle + ' ' + i].food = menu[type]['food'];
                        resultObj[boothTitle + ' ' + i].image = menu[type]['image'];
                        resultObj[boothTitle + ' ' + i].price = menu[type]['price'];
                        resultObj[boothTitle + ' ' + i].rating = menu[type]['rating'];
                        i++;
                    }
                }

                    
            }
                
                // example of how it should look: 
                // resutlObj: { titleOfBooth : { dish }, nextBooth : { dish } }

            postMessage(resultObj);
            self.close();
        }else if(hr.readyState == 4){
            postMessage("Error: "+ hr.status);
            self.close();
        }
    }
    hr.send();
}