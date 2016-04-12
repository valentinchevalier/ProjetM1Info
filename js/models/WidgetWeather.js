/**
 * Widget Weather
 */
function WidgetWeather () {
    Widget.call(this, "Météo - Toulouse", "#40FFB8", "./partials/widgets/widget_weather.html", "weather_toulouse")

    this.temperature = null;
    this.weather = null;
}

WidgetWeather.prototype = new Widget();
