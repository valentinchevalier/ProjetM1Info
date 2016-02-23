app.controller("WorkspaceCtrl", function ($scope, $rootScope, UserService, SettingsService) {

    var NB_ROW = 3;
    var NB_COLUMN = 2;
    $scope.column_width = 0;
    $scope.row_height = 0;

    $scope.isMenuVisible = true;
    $scope.isDragging = false;
    $scope.buttonIcon = "fa-plus";

    $scope.UserService = UserService;
    $scope.SettingsService = SettingsService;


    // Widgets présent dans le workspace
    $scope.emplacements = [];

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

    var initializeWorkspace = function() {
        for (var i = 0; i < NB_ROW; i++) {
            $scope.emplacements[i] = [];
            for (var j = 0; j < NB_COLUMN; j++) {
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
    };


    initialize = function () {
        initializeWorkspace();
        setBtnIcon();
    };

    initialize();


    $scope.toggleMenu = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
        setBtnIcon();
    };


    $scope.startDragging = function (index) {
        $scope.isDragging = true;
        $scope.isMenuVisible = false;
        $scope.currentDraggingIndex = index;
        $scope.buttonIcon = "fa-trash";
    };
    $scope.deletion = true;
    $rootScope.$on("draggable:move", function() {
        console.log("coucou");
        if ($('.menu_btn.drag-enter').length!=0){
            $scope.availableWidgets[$scope.currentDraggingIndex].deletion = true;
            $scope.$apply();
        } else {
            $scope.availableWidgets[$scope.currentDraggingIndex].deletion = false;
            $scope.$apply();
        }
    });

    $scope.dragging = function(){
        console.log("dragging");
    }

    $scope.stopDragging = function () {
        $scope.isDragging = false;
        $scope.isMenuVisible = true;
        $scope.availableWidgets[$scope.currentDraggingIndex].deletion = false;
        //$scope.currentDraggingIndex = null;
        setBtnIcon();
    };

    $scope.onDrop = function (data,evt,x,y) {
        // Ajout du widget dans les widgets
        $scope.emplacements[x][y].data = data;
        $scope.emplacements[x][y].isEmpty = false;
    };

    $scope.onDeleteDrop = function (data,evt) {
        console.log("delete");
    };

});
