(function($) {
		$.widget("ui.yahoo_weather",{
			_create : function() { // constructor
					// provided url
					var yahooWeatherAPIUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json";
				    
					$.ajax({ 
						type: "get",
						url : yahooWeatherAPIUrl,
						crossDomain: true
					}).done(function(jData, status, jqXHR){ //callback success function
						if (status == 'success') {
							if (jData != null && jData.query!=null && jData.query.results !== null) { // check for null
								extractRelavantDtata(jData); // everything all all ok
							}
							else { // json coming back with null values.
								alert("Oh Snap! You seem to be having issues connecting to the internets. Please check your connection and try again!");
							}
						}
					}).fail(function(jqXHR, status, error){ // fail function
						alert("Oh Snap! You seem to be having issues connecting to the internets. Please check your connection and try again!");
					});
			}
		});

/**
 * @Params: jData - json format data received by call back function 
 */		
function extractRelavantDtata(jData) {
	var baseObject;
	
	if (jData.query.results.channel !=null && jData.query.results.channel.item !=null) {
		baseObject = jData.query.results.channel.item; // set a variable that will be used later
	} else {
		alert("Oh Snap! You seem to be having issues connecting to the internets. Please check your connection and try again!");
	}
	
	
	// Extract data from the JSON object
	var titleStringArray = baseObject.title.split(" "); 
	var location = titleStringArray[2] +" "+titleStringArray[3];
	var currTemperature = baseObject.condition.temp;
	var currGifUrl = baseObject.description.split('"')[1];
	var currConditionText = baseObject.condition.text;
	var dailyForecastHtml="";
	var allForecasts="";
	
	for (var i=0; i < baseObject.forecast.length ; i++) {
		if (i+1 != baseObject.forecast.length) { // if not the last element, add a dotted border on the side
			forecastHtml = "<div class ='yw_inline yw_individualforecast yw_dottedBorderOnRight'>";
		} else { // if last element do not add a dotted border on the right side
			forecastHtml = "<div class ='yw_inline yw_individualforecast'>";
		}
		
		// its faster for the browser to render a plain HTML than using Append esp while using a for loop
		dailyForecastHtml = "<div class='yw_day'>";
		dailyForecastHtml += baseObject.forecast[i].day;
		dailyForecastHtml += "</div>";
		dailyForecastHtml += "<div>";
		dailyForecastHtml += "<span>"+baseObject.forecast[i].high+"&deg / </span>";
		dailyForecastHtml += "<span>"+baseObject.forecast[i].low+"&deg</span>";
		dailyForecastHtml += "</div>";
		forecastHtml += dailyForecastHtml;
		forecastHtml += "</div>";
		allForecasts += forecastHtml;
	}
	
	
	$("#widgetContainer").html(""); // clear out the widget before rendering new data.
	var widgetContainerHtml =  
		$("<div/>")
		.attr("class","yw_widgetContainer")
		.append($("<div/>")
				.attr("id","yw_location")
				.html(location))
		.append($("<div/>")
			.append($("<div/>")
					.attr("class","yw_inline yw_temperatureClass")
					.attr("id","yw_temperature")
					.html(currTemperature+"&deg"))
			.append($("<div/>")
					.attr("class","yw_inline yw_condition")
					.append($("<div/>")
							.attr("id","yw_conditionGif")
							.html("<img src='"+currGifUrl+"'></img>"))
					.append($("<div/>")
							.attr("id","yw_conditionText")
							.html(currConditionText))
					))
		.append($("<div/>")
				.attr("id","yw_forecast")
				.attr("class","yw_allDayForecastClass")
				.html(allForecasts)
		);
	$("#widgetContainer").html(widgetContainerHtml);
}
})(jQuery);
