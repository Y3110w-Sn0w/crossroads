self.onmessage = function(){
    var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            // this is the data that is returned from the ajax request.
            var return_data = JSON.parse(hr.responseText);
            //this array will be for holding the titles and other things we want for the main page.
            var array_for_main = new Array();
            //next step is to take the image tag from each of the objects in the array.
            for(var i = 0; i < return_data.Booths.length; i++){
                array_for_main[i] = return_data.Booths[i].image;
            }
            postMessage(array_for_main);
            self.close();
        }else if(hr.readyState == 4){
            postMessage("Error: " + hr.status);
            self.close();
        }
    }
    //This actually sends off the request to the page. 
    //There is no request or message sent with out it!
    hr.send();
};