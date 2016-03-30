
/**
 * Widget Tisséo - Prochains passages
 */
function WidgetAgendaCulturel () {
    Widget.call(this, "Agenda culturel", "#cc3366", "./partials/widgets/widget_agenda_culturel.html", "WidgetAgendaCulturelCtrl")

    this.searchValue = "";
    this.isDescriptionCourteVisible = true;
    this.evenements = [];
    this.etendus = [];

    this.controller = function($scope, AgendaCulturelApiService){
        $scope.test = "coucou";
    }
}
WidgetAgendaCulturel.prototype = new Widget();

WidgetAgendaCulturel.prototype.switchDescription = function(item){
    if(this.etendus[item] == 1){
        this.etendus[item] = 0;
    }else{
        this.etendus[item] = 1;
    }
}

WidgetAgendaCulturel.prototype.isEtendu = function(item){
    return this.etendus[item]==1;
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
