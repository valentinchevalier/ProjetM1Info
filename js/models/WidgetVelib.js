/**
 * Widget Velib
 */
function WidgetVelib () {
    Widget.call(this, "Vélib - Toulouse", "#B50F1B", "./partials/widgets/widget_velib.html", "velo_toulouse")


    this.searchValue = "";
    this.currentStation = null;
}

WidgetVelib.prototype = new Widget();

WidgetVelib.prototype.isStationSelected = function(){
    return ! (this.currentStation == null);
}


