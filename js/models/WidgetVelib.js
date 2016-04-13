/**
 * Widget Velib
 */
function WidgetVelib () {
    Widget.call(this, "Vélib - Toulouse", "#B50F1B", "./partials/widgets/widget_velib.html", "velo_toulouse")


    this.searchValue = "";

    this.currentStation = null;

    this.params.searchValue = null;


    var elem = angular.element(document.querySelector('[ng-app]'));
    var injector = elem.injector();
    
    this.VelibApiService = injector.get('VelibApiService');
}

WidgetVelib.prototype = new Widget();

WidgetVelib.prototype.isStationSelected = function(){
    return ! (this.currentStation == null);
}


WidgetVelib.prototype.init = function(){
    var that = this;
    that.VelibApiService.searchPlace(that.params.searchValue).then(function(data){
        if (data.length == 1){
            that.currentStation = data[0];
        }
        console.log(that.currentStation);
    });
}


