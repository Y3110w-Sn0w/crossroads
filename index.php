<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Food Meets Learning</title>
        <link rel="stylesheet" type="text/css" href="stylesheets/style.css">
        <script type="text/javascript">
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
        </script>
    </head>
    <body onload="ajax_get_json()">
        <div class="main-wrapper">

            <h1 class="top-bar" id="test"><span>C</span><span>R</span><span>O</span><span>S</span><span>S</span><span>R</span><span>O</span><span>A</span><span>D</span><span>S</span></h1>

            <div class="scrolling">
                <div>
                    <a><img id="booth-logo"/><img id="rating-stars"/>images to go here.</a>
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
                    <br><a class="blank-anchor">&nbsp;</a>
                </div>

            </div>

            <nav class="navigation">

                <a><img/>&#35;</a>
                <a><img/>&#43;</a>
                <a><img/>&#48;</a>
                <a><img/>&#64;</a>
                <a><img/>&#42;</a>
                <a><img/>&#45;</a>
            
            </nav>

        </div>
    </body>
</html>