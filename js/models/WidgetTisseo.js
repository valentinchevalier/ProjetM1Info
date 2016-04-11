
/**
 * Widget Tisséo - Prochains passages
 */
function WidgetTisseo () {
    Widget.call(this, "Tisseo - Prochain passages", "#0C226B", "./partials/widgets/widget_tisseo.html", "tisseo_prochains_passages")
    this.searchPlaces = [];

    this.searchValue = "";

    this.passages = [];
    this.lines = [];
    this.currentLine = null;
    this.currentStop = null;

    this.params.currentStopKey = null;
    this.params.currentLineNumber = null;

    this.controller = function($scope, TisseoApiService){
        $scope.test = "coucou";
    }
}
WidgetTisseo.prototype = new Widget();


WidgetTisseo.prototype.isStopSelected = function(){
    return ! (this.currentStop == null);
}

WidgetTisseo.prototype.isLineSelected = function(){
    return ! (this.currentLine == null);
}

WidgetTisseo.prototype.selectStop = function(tisseoApi){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.loading = true;

        that.params.currentStopKey = that.currentStop.key;

        tisseoApi.getLinesForStop(that.currentStop.id).then(function(data){
            that.lines = data;
            that.currentLine = null;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    } else {
        that.lines = [];
        that.params.currentStopKey = null;
    }
}
WidgetTisseo.prototype.changeStop = function(tisseoApi){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.params.currentStopKey = that.currentStop.key;
    } else {
        that.params.currentStopKey = null;
    }
}

WidgetTisseo.prototype.selectLine = function(line, tisseoApi){
    var that = this;
    if (that.currentLine == line){
        that.currentLine = null;
        this.params.currentLineNumber = null;
    } else {
        that.currentLine = line;
        console.log(line);
        this.params.currentLineNumber = line.id;
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

WidgetTisseo.prototype.onReloadClick = function(tisseoApi){
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




