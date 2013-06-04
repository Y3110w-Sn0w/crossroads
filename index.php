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

            // Change nav icon when clicked
            // var 
            // document.getElementByClassName('nav-wrapper').child

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
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
                    <a><img/>images to go here.</a>
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

            <nav class="navigation front-10">

                <div class="nav-wrapper">
                    <a><img/>&#35;</a>
                    <a><img/>&#43;</a>
                    <a><img/>&#48;</a>
                    <a><img/>&#64;</a>
                    <a><img/>&#42;</a>
                </div>
            </nav>

        </div>
    </body>
    </html>