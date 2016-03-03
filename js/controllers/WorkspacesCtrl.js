app.controller("WorkspacesCtrl", function ($scope) {

    // Tableau contenant les workspaces
    $scope.workspaces = [
        new Workspace("Onglet 1", 3, 2),
    ];

    // Workspace courant
    $scope.currentWorkspace = $scope.workspaces[0];


    // Informations du Workspace Créator
    $scope.workspaceCreator = {
        title : "Nouvel onglet",
        nb_column : 2,
        nb_row : 3,
    };


    $scope.isWorkspaceCreatorVisible = false;


    /**
     * Fonction appelée lors d'un drop sur le workspace
     * @param {number} x    coordonnée x de la case droppée
     * @param {number} y    coordonnée y de la case droppée
     * @param {object} data données transmises lors du DragNDrop
     */
    $scope.onWorkspaceDrop = function (x, y, data) {
        switch (data.from){
            case "menu" :
                $scope.currentWorkspace.addNewWidget(x,y,data.data);
                break;
            case "workspace" :
                $scope.currentWorkspace.moveWidget(data.xFrom,data.yFrom,x,y);
                break;
        }
    };

    /**
     * Change le workspace courant
     * @param {Workspace} workspace nouveau workspace courant
     */
    $scope.switchWorkspace = function(workspace){
        $scope.currentWorkspace = workspace;
    }

    /**
     * Crée un nouveau workspace
     */
    $scope.createNewWorkspace = function(){
        var workspace = new Workspace($scope.workspaceCreator.title, $scope.workspaceCreator.nb_row, $scope.workspaceCreator.nb_column);
        $scope.workspaces.push(workspace);
        $scope.currentWorkspace = workspace;

        $scope.isWorkspaceCreatorVisible = false;
    }

    /**
     * Supprime le ieme workspace
     * @param {number} index indice du workspace à supprimer
     */
    $scope.deleteWorkspace = function(index){
        // Suppression du workspace du tableau
        var deleteWorkspace = $scope.workspaces.splice(index,1)[0];
        // Si le workspace courant est supprimé, mise à jour du workspace courant
        if ($scope.currentWorkspace == deleteWorkspace){
            $scope.currentWorkspace = $scope.workspaces[Math.max(index-1,0)];
        }
    }

    /**
     * Affiche la fenetre de création d'onglet
     */
    $scope.showWorkspaceCreator = function(){
        $scope.isWorkspaceCreatorVisible = true;
    }
    /**
     * Masque la fenetre de création d'onglet
     */
    $scope.hideWorkspaceCreator = function(){
        $scope.isWorkspaceCreatorVisible = false;
    }

    /**
     * Handler de click sur le Workspace Creator
     * @param {object} $event Event de click
     */
    $scope.onWorkspaceCreatorClick = function($event){
        // Si le click est sur le container
        if ($event.target.className == 'workspace_creator_container'){
            // Masquage du Workspace Creator
            $scope.hideWorkspaceCreator();
        }
    }


});
