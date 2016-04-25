/**
 * Widget Weather
 */
function WidgetWeather () {
    Widget.call(this, "Météo", "#27B882", "./partials/widgets/widget_weather.html", "weather_toulouse");

    var that = this;

    var elem = angular.element(document.querySelector('[ng-app]'));
    var injector = elem.injector();

    that.WeatherApiService = injector.get('WeatherApiService');

    that.TelechargementService = injector.get('TelechargementService');


    that.cities = [
        {
            name: 'Toulouse',
            id : 6453974
        },
        {
            name : 'Paris',
            id : 6455259
        },
        {
            name : 'Bordeaux',
            id : 6455058
        },
        {
            name : 'Marseille',
            id : 6447142
        },
    ];

    that.params.currentCityId = null;
}

WidgetWeather.prototype = new Widget();

WidgetWeather.prototype.getWeather = function(){
    var that = this;
    if (that.params.currentCityId != null){
        that.loading = true;
        that.WeatherApiService.getWeather(that.params.currentCityId).then(function(weather){
            that.info = weather;
            console.log(that.info);
            that.loading = false;
        });
    }
}

WidgetWeather.prototype.findImage = function(){
    var lienImage = "./img/"+this.info.weather[0].icon+".png";

    return lienImage;
}


WidgetWeather.prototype.saveToPc = function(){
    this.TelechargementService.saveToPc({
        weather : this.info,
    }, "meteo.json");
}

WidgetWeather.prototype.getIconCode = function(){
    var prefix = 'wi wi-';
    var code = this.info.weather[0].id;
    var icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;

    return icon;
}

WidgetWeather.prototype.epochToDate = function(utc){
    var date = new Date(utc*1000);
    return date;
};
