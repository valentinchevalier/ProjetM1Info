
/**
 * Widget Tisséo - Prochains passages
 */
function WidgetAgendaCulturel () {
    Widget.call(this, "Agenda culturel", "#cc3366", "./partials/widgets/widget_agenda_culturel.html", "WidgetAgendaCulturelCtrl")

    this.searchValue = "";
    this.isDescriptionCourteVisible = true;
    this.evenements = [];

    this.controller = function($scope, AgendaCulturelApiService){
        $scope.test = "coucou";
    }
}
WidgetAgendaCulturel.prototype = new Widget();

WidgetAgendaCulturel.prototype.switchDescription = function(){
    this.isDescriptionCourteVisible = !this.isDescriptionCourteVisible;
}

WidgetAgendaCulturel.prototype.isRechercheEnCours = function(){
    return ! (this.searchValue == "");
}

WidgetAgendaCulturel.prototype.onChange = function(agendaCulturelApi){
    var that = this;
    that.loading = true;
    agendaCulturelApi.getEvenements(that.searchValue).then(function(data){
        that.evenements = data.records;
        that.loading = false;
    }, function(msg){
        alert(msg);
    });
}




