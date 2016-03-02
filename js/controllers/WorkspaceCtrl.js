app.controller("WorkspaceCtrl", function ($scope, $rootScope, UserService, SettingsService) {


    $scope.isMenuVisible = true;
    $scope.isDragging = false;
    $scope.buttonIcon = "fa-plus";

    $scope.UserService = UserService;
    $scope.SettingsService = SettingsService;


     // Widgets disponibles à l'ajout
    $scope.availableWidgets = [
        {
            name: "Tisseo",
            color: "#0C226B",
            img_url: "img/Tisseo_logo.png",
            deletion: false,
        },
        {
            name: "Météo",
            color: "#33cc99",
            img_url: null,
            deletion: false,
        },
        {
            name: "Agenda Culturel",
            color: "#cc3366",
            img_url: null,
            deletion: false,
        },
    ];


    var setBtnIcon = function() {
        if ($scope.isMenuVisible) {
            $scope.buttonIcon = "fa-arrow-down";
        } else {
            $scope.buttonIcon = "fa-plus";
        }
    };



    initialize = function () {
        setBtnIcon();
    };
    initialize();


    $scope.toggleMenu = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
        setBtnIcon();
    };


    $scope.startDragging = function (currentDraggingWidget) {
        $scope.isDragging = true;
        $scope.isMenuVisible = false;
        $scope.currentDraggingWidget = currentDraggingWidget;
        $scope.buttonIcon = "fa-trash";
    };
    $scope.deletion = true;

    $rootScope.$on("draggable:move", function() {
        if ($('.menu_btn.drag-enter').length!=0){
            $scope.currentDraggingWidget.deletion = true;
            $scope.$apply();
        } else {
            $scope.currentDraggingWidget.deletion = false;
            $scope.$apply();
        }
    });

    $scope.dragging = function(){
        console.log("dragging");
    }

    $scope.stopDragging = function () {
        $scope.isDragging = false;
        $scope.isMenuVisible = true;
        $scope.currentDraggingWidget.deletion = false;
        //$scope.currentDraggingIndex = null;
        setBtnIcon();
    };


    $scope.onDeleteDrop = function (data,evt) {
        switch (data.from){
            case "menu" :
                // Rien
                break;
            case "workspace" :
                $scope.removeWidget(data.xFrom,data.yFrom);
                break;
        }
    };


});
