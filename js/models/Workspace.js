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
                data:{},
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
    this.addNewWidget(xTo,yTo, this.emplacements[xFrom][yFrom].data);
    this.removeWidget(xFrom, yFrom);
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
    this.emplacements[x][y].data = data;
    this.emplacements[x][y].isEmpty = false;
};

/**
 * Supprime un widget d'une position donnée
 * @param {number} x coordonnée x du widget
 * @param {number} y coordonnée y du widget
 */
Workspace.prototype.removeWidget = function(x, y){
    // Ajout du widget dans les widgets
    this.emplacements[x][y].data = {};
    this.emplacements[x][y].isEmpty = true;
};
