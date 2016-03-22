
/**
 * Widget Tisséo - Prochains passages
 */
function WidgetTisseo () {
    Widget.call(this, "Tisseo - Prochain passages", "#0C226B", "./partials/widgets/widget_tisseo.html", "WidgetTisseoCtrl")
    this.searchPlaces = [];

    this.searchValue = "";

    this.passages = [];
    this.lines = [];
    this.currentLine = null;
    this.currentStop = null;
    this.isStopSelected = false;
    this.isLineSelected = false;

    this.controller = function($scope, TisseoApiService){
        $scope.test = "coucou";
    }
}
WidgetTisseo.prototype = new Widget();


WidgetTisseo.prototype.selectStop = function(tisseoApi){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.isStopSelected = true;
        that.isLineSelected = false;
        that.loading = true;

        tisseoApi.getLinesForStop(that.currentStop.id).then(function(data){
            that.lines = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    } else {
        that.lines = [];
    }
}

WidgetTisseo.prototype.selectLine = function(line, tisseoApi){
    var that = this;
    if (that.currentLine == line){
        that.currentLine = "";
        that.isLineSelected = false;
    } else {
        that.currentLine = line;
        that.isLineSelected = true;
    }
    if (that.isLineSelected && that.isStopSelected){
        that.loading = true;
        tisseoApi.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    }
}

WidgetTisseo.prototype.onReloadClick = function(tisseoApi){
    var that = this;
    if (that.isLineSelected && that.isStopSelected){
        that.loading = true;
        tisseoApi.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    }
}




