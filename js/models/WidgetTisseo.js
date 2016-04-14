
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



    var elem = angular.element(document.querySelector('[ng-app]'));
    var injector = elem.injector();
    
    this.TisseoApiService = injector.get('TisseoApiService');

    this.TelechargementService = injector.get('TelechargementService');
    
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

WidgetTisseo.prototype.selectStop = function(){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.loading = true;

        that.params.currentStopKey = that.currentStop.key;

        this.TisseoApiService.getLinesForStop(that.currentStop.id).then(function(data){
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
WidgetTisseo.prototype.changeStop = function(){
    var that = this;

    if (that.currentStop && that.currentStop.id){
        that.params.currentStopKey = that.currentStop.key;
    } else {
        that.params.currentStopKey = null;
    }
}

WidgetTisseo.prototype.selectLine = function(line){
    var that = this;
    if (that.currentLine == line){
        that.currentLine = null;
    } else {
        that.currentLine = line;
    }
    if (that.isLineSelected() && that.isStopSelected()){
        that.loading = true;
        this.TisseoApiService.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    }
}

WidgetTisseo.prototype.onReloadClick = function(){
    var that = this;
    if (that.isLineSelected() && that.isStopSelected()){
        that.loading = true;
        this.TisseoApiService.getStopsSchedules(that.currentStop.id, that.currentLine.id).then(function(data){
            that.passages = data;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    } 
}


WidgetTisseo.prototype.init = function(){
    console.log("initialisation");
    var that = this;
    this.TisseoApiService.searchPlace(this.params.currentStopKey).then(function(data){
        that.currentStop = data[0];
        that.selectStop()
    });
}


WidgetTisseo.prototype.saveToPc = function(){
    console.log("coucou");
    this.TelechargementService.saveToPc({
        stop : this.currentStop,
        line : this.currentLine,
        passages : this.passages
    }, "tisseo.json");
}


