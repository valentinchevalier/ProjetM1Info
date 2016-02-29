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


    $scope.onWorkspaceDrop = function (x, y, data) {
        switch (data.from){
            case "menu" :
                $scope.addNewWidget(x,y,data);
                break;
            case "workspace" :
                $scope.moveWidget(data.xFrom,data.yFrom,x,y);
                break;
        }
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

    $scope.moveWidget = function (xFrom,yFrom,xTo,yTo){
        $scope.emplacements[xFrom][yFrom].isEmpty = true;
        $scope.emplacements[xTo][yTo].isEmpty = false;
        $scope.emplacements[xTo][yTo].data = $scope.emplacements[xFrom][yFrom].data;
        $scope.emplacements[xFrom][yFrom].data = {};
    };


    // TODO À modifier pour recuperer le type du widget ajouté
    $scope.addNewWidget = function(x, y, data){
        // Ajout du widget dans les widgets
        $scope.emplacements[x][y].data = data.data;
        $scope.emplacements[x][y].isEmpty = false;
    }

    // TODO À modifier pour recuperer le type du widget ajouté
    $scope.removeWidget = function(x, y){
        // Ajout du widget dans les widgets
        $scope.emplacements[x][y].data = {};
        $scope.emplacements[x][y].isEmpty = true;
    }

});
