app.controller("WorkspacesCtrl", function ($scope, WorkspacesService) {

    $scope.WorkspacesService = WorkspacesService;

    // Informations du Workspace Créator
    $scope.workspaceCreator = {
        title : "Nouvel onglet",
        nb_column : 2,
        nb_row : 3,
    };

    $scope.isWorkspaceCreatorVisible = false;

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


    /**
     * Crée un nouveau workspace
     */
    $scope.createNewWorkspace = function(){
        WorkspacesService.createNewWorkspace(
            $scope.workspaceCreator.title,
            $scope.workspaceCreator.nb_row,
            $scope.workspaceCreator.nb_column);

        $scope.isWorkspaceCreatorVisible = false;
    }

    /**
     * Fonction appelée lors d'un drop sur le workspace
     * @param {number} x    coordonnée x de la case droppée
     * @param {number} y    coordonnée y de la case droppée
     * @param {object} data données transmises lors du DragNDrop
     */
    $scope.onWorkspaceDrop = function (x, y, data) {
        switch (data.from){
            case "menu" :
                WorkspacesService.addWidget(x,y,data.data);
                break;
            case "workspace" :
                WorkspacesService.moveWidget(data.xFrom,data.yFrom,x,y);
                break;
        }
    };


});
