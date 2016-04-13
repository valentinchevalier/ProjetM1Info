
/**
 * Widget Agenda culturel
 */
function WidgetAgendaCulturel () {
    Widget.call(this, "Agenda culturel", "#cc3366", "./partials/widgets/widget_agenda_culturel.html","agenda_culturel")

    this.params.searchValue = "";
    this.isDescriptionCourteVisible = true;
    this.evenements = [];
    this.etendus = [];

    this.nb_elements = 10;


    var elem = angular.element(document.querySelector('[ng-app]'));
    var injector = elem.injector();

    this.AgendaCulturelApiService = injector.get('AgendaCulturelApiService');

}
WidgetAgendaCulturel.prototype = new Widget();


WidgetAgendaCulturel.prototype.showMore = function(nb_elements){
    nb_elements+=5;
    console.log(nb_elements);
}
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
    return ! (this.params.searchValue == "");
}

WidgetAgendaCulturel.prototype.onChange = function(){
    var that = this;
    if (that.params.searchValue != ""){
        that.loading = true;
        this.AgendaCulturelApiService.getEvenements(that.params.searchValue).then(function(data){
            console.log(data);
            that.evenements = data.records;
            that.loading = false;
        }, function(msg){
            alert(msg);
        });
    } else {
        that.evenements = [];
    }
}


WidgetAgendaCulturel.prototype.init = function(){
    this.onChange();

}

WidgetAgendaCulturel.prototype.saveToPc = function(){
    this.TelechargementService.saveToPc(this.evenements, "evenements.json");
}
