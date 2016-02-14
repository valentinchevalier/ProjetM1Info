app.controller("WorkspaceCtrl", function($scope){
    $scope.nom = "Les 4 Développeurs";
    $scope.isMenuVisible = true;
    $scope.buttonIcon = "fa-plus";
    id = 1;

    // Widgets présent dans le workspace
    $scope.widgets = [];

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

    $scope.toggleMenu = function(){
        $scope.isMenuVisible = !$scope.isMenuVisible;
        if ($scope.isMenuVisible){
            $scope.buttonIcon = "fa-arrow-down";
        } else {
            $scope.buttonIcon = "fa-plus";
        }
    }

    $scope.onDropComplete=function(data,evt){
        // Ajout du widget dans les widgets
        $scope.widgets.push({
            'widgetName' : data.title,
            'id':id++,
        });
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
