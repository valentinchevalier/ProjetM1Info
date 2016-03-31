/**
 * Widget Velib
 */
function WidgetVelib () {
    Widget.call(this, "Vélib - Toulouse", "#B50F1B", "./partials/widgets/widget_velib.html", "WidgetVelibCtrl", "velo_toulouse")
    this.searchPlaces = [];

    this.searchValue = "";

    this.passages = [];
    this.lines = [];
    this.currentLine = null;
    this.currentStop = null;

    this.controller = function($scope, VelibApiService){
        $scope.test = "coucou";
    }
}

WidgetVelib.prototype = new Widget();

WidgetVelib.prototype.isStopSelected = function(){
    return ! (this.currentStop == null);
}

WidgetVelib.prototype.isLineSelected = function(){
    return ! (this.currentLine == null);
}

WidgetVelib.prototype.selectStop = function(tisseoApi){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.loading = true;

        tisseoApi.getLinesForStop(that.currentStop.id).then(function(data){
            that.lines = data;
            that.currentLine = null;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    } else {
        that.lines = [];
    }
}

WidgetVelib.prototype.selectLine = function(line, tisseoApi){
    var that = this;
    if (that.currentLine == line){
        that.currentLine = null;
    } else {
        that.currentLine = line;
    }
    if (that.isLineSelected() && that.isStopSelected()){
        that.loading = true;
        tisseoApi.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    }
}

WidgetVelib.prototype.onReloadClick = function(tisseoApi){
    var that = this;
    if (that.isLineSelected() && that.isStopSelected()){
        that.loading = true;
        tisseoApi.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    }
}


