/**
 * Widget de base
 * @param {string} name        Nom du widget
 * @param {string} color       Couleur de fond du widget
 * @param {url}    templateUrl Url du template du widget
 */
function Widget (name, color, templateUrl, type_widget = "") {
    this.name = name;
    this.color = color;
    this.imgUrl = "";
    this.templateUrl = templateUrl;
    this.type_widget = type_widget;
    this.isReduced = false;

    this.params = {

    };
}

Widget.prototype.reduce = function(){
    this.isReduced = true;
}

Widget.prototype.restore = function(){
    this.isReduced = false
}

Widget.prototype.switchWorkspaceClick = function(){
    this.deleteWidget(this.x,this.y)
}

Widget.prototype.init = function(){

}


Widget.prototype.saveToPc = function(){
}


Widget.prototype.setParams = function(paramsData){
    var that = this;
    angular.forEach(paramsData, function(value, key){
        that.params[key] = value;
    });
}


/**
 * Widget post it
 */
function WidgetPostIt (){
    Widget.call(this, "Post it", "#FFE100", "./partials/widgets/widget_postIt.html",  "post_it")
    this.params.texte = "";
}

WidgetPostIt.prototype = new Widget();

WidgetPostIt.prototype.init = function(){
    this.params.texte = this.params.texte;
}


WidgetPostIt.prototype.saveToPc = function(){
    this.TelechargementService.saveToPc(this.params.texte, "post_it.json");
}
