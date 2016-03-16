/**
 * Widget de base
 * @param {string} name        Nom du widget
 * @param {string} color       Couleur de fond du widget
 * @param {url}    templateUrl Url du template du widget
 */
function Widget (name, color, templateUrl) {
    this.name = name;
    this.color = color;
    this.imgUrl = "";
    this.templateUrl = templateUrl;
}


/**
 * Widget Tisséo - Prochains passages
 */
function WidgetTisseo () {
    Widget.call(this, "Tisseo - Prochain passages", "#0C226B", "/partials/widgets/widget_tisseo.html")
    this.searchPlaces = [];

    this.searchValue = "";

    this.arret = {};
    this.passages = [];
}

function WidgetPostIt (){
    Widget.call(this, "Bloc notes", "#FFE100", "/partials/widgets/widget_postIt.html")
    this.texte = "";
}

WidgetTisseo.prototype.getPassages = function(tisseoApi){
    console.log(this.arret);
    var that = this;

    if (this.arret.id){
        tisseoApi.getProchainPassages(this.arret.id).then(function(data){
            console.log(data);
            that.passages = data;
        }, function(msg){
            alert(msg);
        })
    }
}
