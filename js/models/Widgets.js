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
    this.isReduced = false
}

Widget.prototype.reduce = function(){
    this.isReduced = true
    console.log("coucou");
}

Widget.prototype.restore = function(){
    this.isReduced = false
}

Widget.prototype.switchWorkspaceClick = function(){
    this.deleteWidget(this.x,this.y)
}


/**
 * Widget post it
 */
function WidgetPostIt (){
    Widget.call(this, "Post it", "#FFE100", "./partials/widgets/widget_postIt.html",null,  "post_it")
    this.texte = "";
}

WidgetPostIt.prototype = new Widget();
