/**
 * Classe Workspace
 * @param {string} title     Titre du workspace
 * @param {number} nb_row    Nombre de lignes du workspace
 * @param {number} nb_column Nombre de colonnes du workspace
 */
function Workspace(title, nb_row, nb_column){
    this.title = title;
    this.nb_row = nb_row;
    this.nb_column = nb_column;

    this.emplacements = [];

    for (var i = 0; i < this.nb_row; i++) {
        this.emplacements[i] = [];
        for (var j = 0; j < this.nb_column; j++) {
            var emplacement = {
                x:i,
                y:j,
                widget:null,
                isEmpty:true,
            }
            this.emplacements[i].push(emplacement);
        }
    }

    this.column_width = (100/this.nb_column)-2;
    this.row_height = (100/this.nb_row)-2;

}

/**
     * Deplace un widget dans le workspace
     * @param {number} xFrom coordonnée x d'origine
     * @param {number} yFrom coordonnée y d'origine
     * @param {number} xTo   coordonnée x de destination
     * @param {number} yTo   coordonnée y de destination
     */
Workspace.prototype.moveWidget = function (xFrom,yFrom,xTo,yTo){
    this.addWidget(xTo, yTo, this.emplacements[xFrom][yFrom].widget);
    this.deleteWidget(xFrom, yFrom);
};


// TODO À modifier pour recuperer le type du widget ajouté
/**
 * Ajoute un widget dans le worksapce
 * @param {number} x    coordonnée x d'ajout
 * @param {number} y    coordonnée y d'ajout
 * @param {object} data données du widget
 */
Workspace.prototype.addNewWidget = function(x, y, data){
    // Ajout du widget dans les widgets

    if (data.type == "tisseo_prochains_passages"){
        this.emplacements[x][y].widget = new WidgetTisseo();
    } else {
        if (data.type == "post_it"){
            this.emplacements[x][y].widget = new WidgetPostIt();
        }else{
            this.emplacements[x][y].widget = new Widget(data.name, data.color, "/partials/widgets/widget_base.html");
        }
    }
    this.emplacements[x][y].isEmpty = false;
};

Workspace.prototype.addWidget = function(x, y, widget){
    this.emplacements[x][y].widget =  widget;
    this.emplacements[x][y].isEmpty = false;
};

/**
 * Supprime un widget d'une position donnée
 * @param {number} x coordonnée x du widget
 * @param {number} y coordonnée y du widget
 */
Workspace.prototype.deleteWidget = function(x, y){
    // Ajout du widget dans les widgets
    this.emplacements[x][y].widget = {};
    this.emplacements[x][y].isEmpty = true;
    this.emplacements[x][y].isReduced = false;
};

/**
 * Réduit un widget d'une position donnée
 * @param {number} x coordonnée x du widget
 * @param {number} y coordonnée y du widget
 */
Workspace.prototype.reduceWidget = function(x, y){
    // Réduit le widget dans les widgets
    this.emplacements[x][y].isReduced = true;
};

/**
 * Restaure un widget d'une position donnée
 * @param {number} x coordonnée x du widget
 * @param {number} y coordonnée y du widget
 */
Workspace.prototype.restoreWidget = function(x, y){
    // Restaure le widget dans les widgets
    this.emplacements[x][y].isReduced = false;
};
