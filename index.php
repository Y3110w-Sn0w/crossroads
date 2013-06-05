<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Food Meets Learning</title>
    <link rel="stylesheet" type="text/css" href="stylesheets/style.css">
    <script type="application/javascript">
        // AJAX to manage JSON file
        function ajax_get_json(){
            var hr = new XMLHttpRequest();
            hr.open("GET", "booths.json", true);
            hr.setRequestHeader("Content-Type", "application/json",true);
            hr.onreadystatechange = function(){
                if(hr.readyState == 4 && hr.status == 200){
                    var return_data = JSON.parse(hr.responseText);
                    document.getElementById("test").innerHTML = 
                    return_data.title;
                }
            }
            hr.send(null);
        }
        var selectedButton = null;
         function showInfo(aButton){
            if(selectedButton){
                selectedButton.className = null;
            }
            aButton.className = 'body-bg';
            selectedButton = aButton;
         }

        // Add the above functions inside pageLoaded()
        function pageLoaded() {
            ajax_get_json();
        }
        
        // Load all functions after page is completely loaded
        window.onload = pageLoaded;
        </script>
    </head>
    <body class="body-bg">
        <div class="main-wrapper">

            <h1 class="top-bar front-10" id="test"><span>C</span><span>R</span><span>O</span><span>S</span><span>S</span><span>R</span><span>O</span><span>A</span><span>D</span><span>S</span></h1>

            <div class="scrolling">
                <div>
                    <!-- Change to 2 booths per row dang it!!! -->
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <!-- A blank <a> to fit the icons right on top of the navigation bar when scrolling all the way to the bottom -->
                    <br><a class="blank-anchor">&nbsp;</a>
                </div>
            </div>

        </div>
    </body>
    </html>