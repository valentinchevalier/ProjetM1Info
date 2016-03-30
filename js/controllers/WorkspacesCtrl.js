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
     * Supprime le ieme workspace
     * @param {number} index indice du workspace à supprimer
     */
    $scope.deleteWorkspaceClick = function(ev, index){
        var workspace = WorkspacesService.workspaces[index];

        if (!workspace.containsWidgets()){
            WorkspacesService.deleteWorkspace(index);
        } else {
            var confirm = $mdDialog.confirm()
            .title('Voulez vous vraiment supprimer le workspace ?')
                .textContent("Tous les widgets qu'il contient seront également supprimés !")
                .ariaLabel('Confirmation de supression')
                .targetEvent(ev)
                .openFrom($(ev.currentTarget))
                .ok('Supprimer')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                console.log("suppression du workspace "+index);
                WorkspacesService.deleteWorkspace(index);
            }, function () {
                // Rien à faire
            });
        }
    }

    $scope.editWorkspace = function(ev, index){
        var workspace = WorkspacesService.workspaces[index];

        $mdDialog.show({
            controller: DialogEditorController,
            templateUrl: 'partials/workspace_editor.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false,
            locals : {
                workspace : workspace,
            },
            bindToController: true,
        })
        .then(function(answer) {

        }, function() {
            // Rien à faire
        });
    }

    function DialogEditorController($scope, $mdDialog, $sce, workspace) {
        $scope.deletionIndex = null;
        $scope.isConfirmationVisible = false;
        $scope.confirmMessage = "";

        $scope.availableBgColors = [
            {
                name : "Gris (default)",
                hexValue : "#eeeeee"
            },
            {
                name : "Canard",
                hexValue : "#E0F2F1"
            },
            {
                name : "Cyan",
                hexValue : "#E0F7FA"
            },
            {
                name : "Indigo",
                hexValue : "#E8EAF6"
            }

        ]

        $scope.workspace = workspace;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.addColumnClick = function(){
            console.log("Ajout d'une colonne");
            $scope.workspace.addColumn();
        }
        $scope.removeColumnClick = function(ev, index){
            console.log("Suppression de la colonne "+index);
            if ($scope.workspace.isColumnEmpty(index)){
                $scope.workspace.removeColumn(index);
            } else {
                $scope.showConfirmDeletion( index);
            }
        }
        $scope.showConfirmDeletion = function(index){
            $scope.deletionIndex = index;
            $scope.isConfirmationVisible = true;
            $scope.confirmMessage = $sce.trustAsHtml("Voulez vous vraiment supprimer cette colonne ? <br>(tous les widgets qu'elles contient seront déplacés vers un colonne voisine)");
        }
        $scope.confirmDeletion = function(){
            $scope.workspace.removeColumn($scope.deletionIndex);
            $scope.deletionIndex = null;
            $scope.isConfirmationVisible = false;
            $scope.confirmMessage = "";
        }
        $scope.cancelDeletion = function(){
            $scope.deletionIndex = null;
            $scope.isConfirmationVisible = false;
            $scope.confirmMessage = "";
        }
        $scope.setBgColor = function(color){
            $scope.workspace.setBgColor(color.hexValue);
        }
    }

    /**
     * Affiche la fenetre de création d'onglet
     */
    $scope.createWorkspaceClick = function(ev){
        $mdDialog.show({
            controller: DialogCreatorController,
            templateUrl: 'partials/workspace_creator.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false,
        })
        .then(function(answer) {
            WorkspacesService.createNewWorkspace(answer.title, answer.nb_column);
        }, function() {
            // Rien à faire
        });
    }

    function DialogCreatorController($scope, $mdDialog) {
        $scope.data = {
            title : "Nouvel onglet",
            nb_column : 2,
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


    $scope.onWorkspaceDrop = function (column, position, data) {
        console.log(data);
        switch (data.from){
            case "menu" :
                WorkspacesService.addWidget(column,position,data.data);
                break;
            case "workspace" :
                WorkspacesService.moveWidget(data.columnFrom,data.positionFrom,column,position);
                break;
        }
    };

    $scope.getLastPosition = function(column){
        return WorkspacesService.currentWorkspace.widgets[column].length;
    }


});
