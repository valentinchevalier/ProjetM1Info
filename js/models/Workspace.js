/**
 * Classe Workspace
 * @param {string} title     Titre du workspace
 * @param {number} nb_row    Nombre de lignes du workspace
 * @param {number} nb_column Nombre de colonnes du workspace
 */
function Workspace(title, nb_column){
    this.title = title;
    this.nb_column = nb_column;

    this.editing = false;
    this.beforeEditing = "test";


    this.widgets = [];

    for (var i = 0; i < this.nb_column; i++) {
        this.widgets[i] = [];
    }
    this.column_width = (100/this.nb_column);

}

Workspace.prototype.startEditing = function(){
    this.beforeEditing = this.title;
    this.editing = true;
}
Workspace.prototype.stopEditing = function(){
    if (this.title == ""){
        this.title = this.beforeEditing;
        this.beforeEditing = "";
    }
    this.editing = false;
}

/**
     * Deplace un widget dans le workspace
     * @param {number} xFrom coordonnée x d'origine
     * @param {number} yFrom coordonnée y d'origine
     * @param {number} xTo   coordonnée x de destination
     * @param {number} yTo   coordonnée y de destination
     */
Workspace.prototype.moveWidget = function (columnFrom,positionFrom,columnTo,positionTo){
    var widget = this.widgets[columnFrom][positionFrom]
    this.deleteWidget(columnFrom, positionFrom);
    this.addWidget(columnTo, positionTo, widget);
};

// TODO À modifier pour recuperer le type du widget ajouté
/**
 * Ajoute un widget dans le worksapce
 * @param {number} x    coordonnée x d'ajout
 * @param {number} y    coordonnée y d'ajout
 * @param {object} data données du widget
 */
Workspace.prototype.addNewWidget = function(column, position, data){
    // Ajout du widget dans les widgets

    var widget;
    if (data.type == "tisseo_prochains_passages"){
        widget = new WidgetTisseo();
    } else if (data.type == "post_it"){
        widget = new WidgetPostIt();
    } else {
        widget = new Widget(data.name, data.color, "./partials/widgets/widget_base.html");
    }
    this.widgets[column].splice(position, 0, widget);
};

Workspace.prototype.addWidget = function(column, position, widget){
    this.widgets[column].splice(position, 0, widget);
};

/**
 * Supprime un widget d'une position donnée
 * @param {number} x coordonnée x du widget
 * @param {number} y coordonnée y du widget
 */
Workspace.prototype.deleteWidget = function(column, position){
    this.widgets[column].splice(position, 1);
};

