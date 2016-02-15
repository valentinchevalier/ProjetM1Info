app.controller("WorkspaceCtrl", function($scope){
    var NB_ROW = 4;
    var NB_COLUMN = 3;
    $scope.column_width;
    $scope.row_height;

    $scope.nom = "Les 4 Développeurs";
    $scope.isMenuVisible = true;
    $scope.buttonIcon = "fa-plus";
    id = 1;

    // Widgets présent dans le workspace
    $scope.widgets = [];


    initWorkspace = function(){
        for (var i = 0; i < NB_ROW; i++){
            $scope.widgets[i] = [];
            for (var j = 0; j < NB_COLUMN; j++){
                var widget = {
                    x:i,
                    y:j,
                    data:{},
                    isEmpty:true,
                }
                $scope.widgets[i].push(widget);
            }
        }
        $scope.column_width = (100/NB_COLUMN)-2;
        $scope.row_height = (100/NB_ROW)-2;
    }
    initWorkspace();


    // Widgets disponible à l'ajout
    $scope.availableWidgets = [
        {
            title:"Widget 1",
        },
        {
            title:"Widget 2",
        },
        {
            title:"Widget 3",
        },
    ];

    $scope.options = {
      placeholder: "placeholder",
      connectWith: ".lists",
    };

    $scope.toggleMenu = function(){
        $scope.isMenuVisible = !$scope.isMenuVisible;
        if ($scope.isMenuVisible){
            $scope.buttonIcon = "fa-arrow-down";
        } else {
            $scope.buttonIcon = "fa-plus";
        }
    }

    $scope.onDropComplete=function(data,evt,x,y){
        console.log(data);
        console.log(x,y);
        // Ajout du widget dans les widgets
        $scope.widgets[x][y].data = data;
        $scope.widgets[x][y].isEmpty = false;
    }


    /*$scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        $scope.draggableObjects = $scope.availableWidgets;
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1)
            $scope.droppedObjects1.push(data);
        }
        $scope.onDragSuccess1=function(data,evt){
            console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        $scope.onDragSuccess2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects2.splice(index, 1);
            }
        }
        $scope.onDropComplete2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
        }
        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }*/

});
