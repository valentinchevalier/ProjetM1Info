/**
 * Widget Velib
 */
function WidgetVelib () {
    Widget.call(this, "Vélib - Toulouse", "#B50F1B", "./partials/widgets/widget_velib.html", "velo_toulouse")


    this.searchValue = "";

    this.currentStation = null;

    this.params.stationName = null;
}

WidgetVelib.prototype = new Widget();

WidgetVelib.prototype.isStationSelected = function(){
    return ! (this.currentStation == null);
}

WidgetVelib.prototype.changeStation = function(){
    console.log()
    if (this.currentStation && this.currentStation.name){
        this.params.stationName = this.currentStation.name;
    } else {
        this.params.stationName = null;
    }
}


