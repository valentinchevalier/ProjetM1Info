app.service('WorkspacesService', function ($mdDialog, $q, $http, UserService) {

    var that = this;

    // Tableau contenant les workspaces
    that.workspaces = [
        new Workspace("Onglet 1", 2),
    ];

    // Workspace courant
    that.currentWorkspace = that.workspaces[0];


    that.addWidget = function(column, position, data) {
        that.currentWorkspace.addNewWidget(column, position, data);
    }

    that.moveWidget = function(xFrom, yFrom, xTo, yTo){
        that.currentWorkspace.moveWidget(xFrom, yFrom, xTo, yTo);
    }

    that.deleteWidget = function(x, y){
        that.currentWorkspace.deleteWidget(x, y);
    }


    /**
     * Change le workspace courant
     * @param {Workspace} workspace nouveau workspace courant
     */
    that.switchWorkspace = function(workspace){
        that.currentWorkspace = workspace;
    }

    /**
     * Change le workspace courant
     * @param {number} index indice du nouveau workspace courant
     */
    that.switchWorkspaceByIndex = function(index){
        that.currentWorkspace = that.workspaces[index];
    }

    /**
     * Crée un nouveau workspace
     */
    that.createNewWorkspace = function(title, nb_column){
        var workspace = new Workspace(title, nb_column);
        that.workspaces.push(workspace);
        that.currentWorkspace = workspace;
    }


    /**
     * Supprime le ieme workspace
     * @param {number} index indice du workspace à supprimer
     */
    that.deleteWorkspace = function(index){
        console.log("suppression workspace")
        // Suppression du workspace
        var deleteWorkspace = that.workspaces.splice(index,1)[0];
        // Si le workspace courant est supprimé, mise à jour du workspace courant
        if (that.currentWorkspace == deleteWorkspace){
            that.currentWorkspace = that.workspaces[Math.max(index-1,0)];
        }
    }

    that.addWidgetElsewhere = function(index,column,widget){
        that.workspaces[index].addWidgetWithoutPosition(column,widget);
    }


    that.save = function(){
        console.log("Sauvegarde");
        var user = UserService.loginData.loggedUser;
        that.isMessageVisible = true;
        that.message =  "Sauvegarde en cours ... ";

        var deferred = $q.defer();
        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/dataSave.php", {
            userId : user.id,
            workspaces : that.workspaces
        }).then(function(response) {
            that.isMessageVisible = true;
            that.message =  "Sauvegarde réussie"
        }, function(response) {
            that.isMessageVisible = true;
            that.message =  "Impossible de se connecter au serveur"
        });
    }

    that.reload = function(){
        console.log("Chargement");

        var user = UserService.loginData.loggedUser;

        that.isMessageVisible = true;
        that.message =  "Chargement en cours ... "

        var deferred = $q.defer();
        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/dataLoad.php", {
            userId : user.id,
        }).then(function(response) {
            console.log(response);
            that.reloadData(response.data);
            that.isMessageVisible = true;
            that.message =  "Chargement réussie"
        }, function(response) {
            that.isMessageVisible = true;
            that.message =  "Impossible de se connecter au serveur"
        });
    }

    that.reloadData = function(workspaces){
        that.workspaces = [];
        angular.forEach(workspaces, function(workspaceData) {
            console.log(workspaceData);
            workspace = new Workspace(workspaceData.title, workspaceData.nb_column);

            workspace.initWidgets(workspaceData.widgets);

            that.workspaces[workspaceData.position] = workspace;

        });
    }

});
