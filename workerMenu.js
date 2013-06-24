//this would be a worker. This runs on its own. Cannot access 'document'.
self.onmessage = function(myIndex){
    myIndex = myIndex.data
	var hr = new XMLHttpRequest();
    hr.open("GET", "booths.json", true);
    hr.setRequestHeader("Content-Type", "application/json",true);
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            var return_data = JSON.parse(hr.responseText);
            var resultObj; 
            //it is possible that 'menu' is not an attribute of the object. check here:
            if(return_data.Booths[myIndex]['menu']){
	            //variable to hold the array of booths that have been returned from JSON
    	        resultObj = return_data.Booths[myIndex]['menu'];

            }else{
            	resultObj = {"result" : "No such attribute"};
            }
            postMessage(resultObj);
            self.close();
        }else if(hr.readyState == 4){
            postMessage("Error: "+ hr.status);
            self.close();
        }
    }
    hr.send();
}