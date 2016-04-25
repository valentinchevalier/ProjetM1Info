app.service('WorkspacesService', function ($mdDialog, $q, $http, UserService) {

    var that = this;

    that.saveOrLoadLoading = false;

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

        that.loading = true;
        that.failed = false;
        that.message =  "Sauvegarde en cours ... ";

        var deferred = $q.defer();
        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/dataSave.php", {
            userId : user.id,
            workspaces : that.workspaces
        }).then(function(response) {
            that.message =  "Sauvegarde réussie";
            that.loading = false;
            that.failed = false;
        }, function(response) {
            that.failed = true;
            that.loading = false;
            that.message =  "Impossible de se connecter au serveur"
        });
    }

    that.unFail = function(){
        that.loading = false;
        that.failed = false;
    }

    that.reload = function(){

        var user = UserService.loginData.loggedUser;

        that.isMessageVisible = true;
        that.saveOrLoadLoading = true;
        that.message =  "Chargement en cours ... "

        var deferred = $q.defer();
        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/dataLoad.php", {
            userId : user.id,
        }).then(function(response) {
            console.log(response);
            that.reloadData(response.data);
            that.message =  "Chargement réussi";
            that.loading = false;
            that.failed = false;
        }, function(response) {
            that.failed = true;
            that.loading = false;
            that.message =  "Impossible de se connecter au serveur"
        });
    }

    that.reloadData = function(workspaces){
        var that = this;
        that.workspaces = [];
        angular.forEach(workspaces, function(workspaceData) {
            console.log(workspaceData);
            workspace = new Workspace(workspaceData.title, workspaceData.nb_column);

            workspace.initWidgets(workspaceData.widgets);

            that.workspaces[workspaceData.position] = workspace;

        });
        that.currentWorkspace = that.workspaces[0];
    }

});
