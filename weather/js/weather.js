/**
 * @author Created by mel on 3/28/17.
 */
(function () {
    "use strict";
//formats data and html elements
    function populate(object, i, date, high, low, icon, conditions, humidity, wind, pressure) {
        return '<div class="weather-box"><h3>' + moment.unix(date).format('dddd') + '</h3>'
            + '<img class="icon" src="http://openweathermap.org/img/w/' + icon + '.png"><p><strong>'
            + 'Conditions: ' + conditions + '</strong></p><p>'
            + 'Humidity: ' + humidity + '</p><p>'
            + 'Wind Speed: ' + wind + '</p><p>'
            + 'Pressure: ' + pressure + '</p><p><span class="low">'
            + Math.round(low) + '</span>' + ' ' + '<span class="high">'
            + Math.round(high) + '</span></p></div>';
    }


//Get 3 days worth of weather data and prepares it for use
    var location = function (lat, long) {
        var weather = $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "1d9c5b0467ae9d988d1ffdea309d8242",
            lat: lat,
            lon: long,
            units: "imperial",
            cnt: 3
        });

        weather.done(function (data) {
            console.log(data.list);
            var forecast = [];
            data.list.forEach(function (object, i) {
                forecast.push(populate(
                    object, i,
                    data.list[i].dt,
                    data.list[i].temp.max,
                    data.list[i].temp.min,
                    data.list[i].weather[0].icon,
                    data.list[i].weather[0].description,
                    data.list[i].humidity,
                    data.list[i].speed,
                    data.list[i].pressure
                ));
            });
            $('#weather').html(forecast);


//Change page background based on today's weather
            var conditions = data.list[0].weather[0].id;

            if (conditions >= 801 && conditions <= 804) {
                $('#background').css('background-image', 'url("img/cloudy.jpeg")')
            } else if (conditions >= 701 && conditions <= 781) {
                $('#background').css('background-image', 'url("img/fog.jpeg")')
            } else if (conditions >= 300 && conditions <= 531) {
                $('#background').css('background-image', 'url("img/rain.jpeg")')
            } else if (conditions >= 200 && conditions <= 232) {
                $('#background').css('background-image', 'url("img/thunder.jpeg")')
            } else if (conditions >= 600 && conditions <= 622) {
                $('#background').css('background-image', 'url("img/snow.jpeg")')
            } else {
                $('#background').css('background-image', 'url("img/sunny.jpeg")')
            }
        });
        return {lat: lat, lng: long};
    };
//Generate map with draggable location
    var latlng = location(29.424122, -98.493629);
    var mapOptions = {
        zoom: 10,
        center: latlng
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var geocoder = new google.maps.Geocoder();
    var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: map
    });

//Autocomplete
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('location')),
        {types: ['geocode']});

//Takes user input from form, re-centers map and marker, updates weather
    $('.btn').click(function (event) {
        event.preventDefault();
        var address = $('.user-location').val();
        geocoder.geocode({address: address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                var lat = results[0].geometry.location.lat();
                var long = results[0].geometry.location.lng();
                var newLocation = function (map, marker) {
                    marker.setPosition({lat: lat, lng: long});
                    map.panTo({lat: lat, lng: long});
                    map.setZoom(10);
                    location(lat, long);
                };
                newLocation(map, marker);
            }
        });
    });

//User can drag the mouse and the weather will adjust accordingly
    marker.addListener('dragend', function () {
        var lat = this.getPosition().lat();
        var long = this.getPosition().lng();
        map.panTo({lat: lat,lng: long});
        map.setZoom(10);
        location(lat, long);
        console.log(lat, long);
    });
}());