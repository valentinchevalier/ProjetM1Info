app.controller("WorkspaceCtrl", function($scope){
    $scope.nom = "Les 4 Développeurs";
    $scope.isMenuVisible = false;
    $scope.buttonIcon = "fa-plus";
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
});
