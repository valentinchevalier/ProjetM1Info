app.controller("WorkspacesCtrl", function ($scope, WorkspacesService, $mdDialog, $mdMedia) {

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
    $scope.showWorkspaceCreator = function(ev){
        //$scope.isWorkspaceCreatorVisible = true;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/workspace_creator.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            WorkspacesService.createNewWorkspace(answer.title, answer.nb_row, answer.nb_column);
        }, function() {

        });
    }

    function DialogController($scope, $mdDialog) {
        $scope.data = {
            title : "Nouvel onglet",
            nb_column : 2,
            nb_row : 3,
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

    /**
     * Fonction appelée lors d'un drop sur le workspace
     * @param {number} x    coordonnée x de la case droppée
     * @param {number} y    coordonnée y de la case droppée
     * @param {object} data données transmises lors du DragNDrop
     */
    $scope.onWorkspaceDrop = function (x, y, data) {
        console.log(data);
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
