app.controller("TabsCtrl", function ($scope) {


    $scope.workspaces = [
        {
            title : "Onglet 1",
            nb_row : 3,
            nb_column : 2,
            column_width : 0,
            row_height : 0,
            emplacements : [],
        },
        {
            title : "Onglet 2",
            nb_row : 3,
            nb_column : 2,
            column_width : 0,
            row_height : 0,
            emplacements : [],
        },
    ];

    $scope.selectedWorkspace = $scope.workspaces[0];


    $scope.onWorkspaceDrop = function (x, y, data) {
        switch (data.from){
            case "menu" :
                $scope.addNewWidget(x,y,data.data);
                break;
            case "workspace" :
                $scope.moveWidget(data.xFrom,data.yFrom,x,y);
                break;
        }
    };

    $scope.initializeWorkspace = function(workspace) {
        for (var i = 0; i < workspace.nb_row; i++) {
            workspace.emplacements[i] = [];
            for (var j = 0; j < workspace.nb_column; j++) {
                var emplacement = {
                    x:i,
                    y:j,
                    data:{},
                    isEmpty:true,
                }
                workspace.emplacements[i].push(emplacement);
            }
        }
        workspace.column_width = (100/workspace.nb_column)-2;
        workspace.row_height = (100/workspace.nb_row)-2;
    };

    $scope.initializeWorkspaces = function(){
        for (i = 0; i < $scope.workspaces.length; i++){
            $scope.initializeWorkspace($scope.workspaces[i]);
        }
    }

    $scope.initializeWorkspaces();



    $scope.moveWidget = function (xFrom,yFrom,xTo,yTo){
        $scope.addNewWidget(xTo,yTo, $scope.selectedWorkspace.emplacements[xFrom][yFrom].data);
        $scope.removeWidget(xFrom, yFrom);
    };


    // TODO À modifier pour recuperer le type du widget ajouté
    $scope.addNewWidget = function(x, y, data){
        // Ajout du widget dans les widgets
        $scope.selectedWorkspace.emplacements[x][y].data = data;
        $scope.selectedWorkspace.emplacements[x][y].isEmpty = false;
    };


    $scope.removeWidget = function(x, y){
        // Ajout du widget dans les widgets
        $scope.selectedWorkspace.emplacements[x][y].data = {};
        $scope.selectedWorkspace.emplacements[x][y].isEmpty = true;
    };


    $scope.switchWorkspace = function(workspace){
        $scope.selectedWorkspace = workspace;
    }

    $scope.createWorkspace = function(){
        var workspace = $scope.addWorkspace($scope.newWorkspace.title, $scope.newWorkspace.nb_row, $scope.newWorkspace.nb_column);
        $scope.isWorkspaceCreatorVisible = false;
        $scope.newWorkspace = {
            title : "Onglet "+($scope.workspaces.length+1),
            nb_column : 2,
            nb_row : 3,
        };
        $scope.selectedWorkspace = workspace;
    }

    $scope.addWorkspace = function(title, nb_row, nb_column){
        var workspace = {
            title : title,
            nb_row : nb_row,
            nb_column : nb_column,
            column_width : 0,
            row_height : 0,
            emplacements : [],
        };
        $scope.initializeWorkspace(workspace);
        $scope.workspaces.push(workspace);
        return workspace;
    }

    $scope.isWorkspaceCreatorVisible = false;
    $scope.newWorkspace = {
        title : "Onglet "+($scope.workspaces.length+1),
        nb_column : 2,
        nb_row : 3,
    };

    $scope.showWorkspaceCreator = function(){
        $scope.isWorkspaceCreatorVisible = true;
    }
    $scope.hideWorkspaceCreator = function(event){
        if (event.target.className == 'workspace_creator_container'){
            $scope.isWorkspaceCreatorVisible = false;
        }
    }

    $scope.deleteWorkspace = function(index){
        var deleteWorkspace = $scope.workspaces.splice(index,1)[0];
        if ($scope.selectedWorkspace == deleteWorkspace){
            $scope.selectedWorkspace = $scope.workspaces[Math.max(index-1,0)];
        }
    }

});
