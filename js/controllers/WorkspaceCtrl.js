app.controller("WorkspaceCtrl", function($scope){

    var NB_ROW = 5;
    var NB_COLUMN = 4;
    $scope.column_width;
    $scope.row_height;

    $scope.isMenuVisible = true;
    $scope.buttonIcon = "fa-plus";

    // Widgets présent dans le workspace
    $scope.emplacements = [];

     // Widgets disponibles à l'ajout
    $scope.availableWidgets = [
        {
            title:"Tisseo",
        },
        {
            title:"Météo",
        },
        {
            title:"Événements culturels",
        },
    ];


    setBtnIcon = function(){
        if ($scope.isMenuVisible){
            $scope.buttonIcon = "fa-arrow-down";
        } else {
            $scope.buttonIcon = "fa-plus";
        }
    }

    initializeWorkspace = function(){
        for (var i = 0; i < NB_ROW; i++){
            $scope.emplacements[i] = [];
            for (var j = 0; j < NB_COLUMN; j++){
                var emplacement = {
                    x:i,
                    y:j,
                    data:{},
                    isEmpty:true,
                }
                $scope.emplacements[i].push(emplacement);
            }
        }
        $scope.column_width = (100/NB_COLUMN)-2;
        $scope.row_height = (100/NB_ROW)-2;
    }


    initialize = function(){
        initializeWorkspace();
        setBtnIcon();
    }

    initialize();


    $scope.toggleMenu = function(){
        $scope.isMenuVisible = !$scope.isMenuVisible;
        setBtnIcon();
    }


    $scope.dragging = function(){
        $scope.isMenuVisible = false;
        $scope.buttonIcon = "fa-trash";
    }

    $scope.unDragging = function(){
        $scope.isMenuVisible = true;
        setBtnIcon();
    }

    $scope.onDrop = function(data,evt,x,y){
        // Ajout du widget dans les widgets
        $scope.emplacements[x][y].data = data;
        $scope.emplacements[x][y].isEmpty = false;
    }
});
