# yahooWeatherWidget

This repository contains source files that will show you the weather conditions of Mclean, VA for the current and next 4 days.

How to use you ask?
Pretty simple!

##### Step 1: You need to reference the jQuery and the jQuery UI libraries in your HTML
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
```
##### Step 2: Download the zip of the repository, extract and save this guy -> "jquery.ui.yahoo_weather.js" and reference that in you HTML.

(assuming you have it in your js folder)
```html
<script src="js/jquery.ui.yahoo_weather.js"></script>
```
##### Step 3: Also extract the style sheet of the widget -> "yahooWeatherWidgetStyle.css" and reference that in you HTML.
(assuming you have it in your css folder)
```html
<link rel="stylesheet" href="css/yahooWeatherWidgetStyle.css">
```
##### Step 4: Include a div tag in your HTML so the Widget knows where to place itself.
```html
<div id="my_widget_container_id"></div>
```
##### Step 5: Call the widget function yahoo_weather() on your ID from any script
```html
$("#my_widget_container_id").yahoo_weather();
```
