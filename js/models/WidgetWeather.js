/**
 * Widget Weather
 */
function WidgetWeather () {
    Widget.call(this, "Météo Toulouse", "#27B882", "./partials/widgets/widget_weather.html", "weather_toulouse")

}

WidgetWeather.prototype = new Widget();
