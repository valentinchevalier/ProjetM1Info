
/**
 * Widget Tisséo - Prochains passages
 */
function WidgetAgendaCulturel () {
    Widget.call(this, "Agenda culturel", "#0C226B", "./partials/widgets/widget_agenda_culturel.html", "WidgetAgendaCulturelCtrl")
    this.searchPlaces = [];

    this.searchValue = "";

    this.evenements = [];
    this.lines = [];
    this.currentLine = null;
    this.currentStop = null;

    this.controller = function($scope, AgendaCulturelApiService){
        $scope.test = "coucou";
    }
}
WidgetTisseo.prototype = new Widget();


WidgetTisseo.prototype.isRechercheEnCours = function(){
    return ! (this.searchValue == "");
}

WidgetTisseo.prototype.selectStop = function(tisseoApi){
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

WidgetTisseo.prototype.selectLine = function(line, tisseoApi){
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




