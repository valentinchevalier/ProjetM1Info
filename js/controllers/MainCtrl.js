// Controleur principal
app.controller("MainCtrl", function ($scope, $rootScope, UserService, SettingsService, WorkspacesService) {

    // Variables d'état
    $scope.isMenuVisible = true;;
    $scope.isDragging = false;
    $scope.buttonIcon = "add";

    $scope.currentDraggingWidget = {};

    // Recopie des Services dans le $scope pour y accéder dans la vue
    $scope.UserService = UserService;
    $scope.SettingsService = SettingsService;
    $scope.WorkspacesService = WorkspacesService;



    // Widgets disponibles à l'ajout
    $scope.availableWidgets = [
        {
            name: "Tisseo",
            type: "tisseo_prochains_passages",
            color: "#0C226B",
            img_url: "img/Tisseo_logo.png",
            deletion: false,
        },
        /*{
            name: "Post It",
            type: "post_it",
            color: "#FFE100",
            deletion: false,
        },*/
        {
            name: "Météo",
            type: "weather_toulouse",
            color: "#FFFFFF",
            img_url: "img/weather_logo.png",
            deletion: false,
        },
        {
            name: "Agenda Culturel",
            type: "agenda_culturel",
            color: "#d07bb9",
            img_url: "img/logo_so_toulouse.png",
            deletion: false,
        },
        {
            name: "VélôToulouse",
            type: "velo_toulouse",
            color: "#B50F1B",
            img_url: "img/toulouse-velotoulouse-logo.png",
            deletion: false,
        },
    ];


    /**
     * fonction d'initialisation du controleur
     */
    initialize = function () {
        $scope.setBtnIcon();
    };

    /**
     * Défini l'icone du bouton selon l'état du menu
     */
    $scope.setBtnIcon = function() {
        if ($scope.isMenuVisible) {
            $scope.buttonIcon = "arrow_downward";
        } else {
            $scope.buttonIcon = "add";
        }
    };

    /**
     * Toggle l'affichage du menu
     */
    $scope.toggleMenu = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
        $scope.setBtnIcon();
    };


    $scope.startDragging = function (currentDraggingWidget) {
        $scope.isDragging = true;
        $scope.wasMenuVisible = $scope.isMenuVisible;
        $scope.isMenuVisible = false;
        $scope.currentDraggingWidget = currentDraggingWidget;
        $scope.buttonIcon = "delete";
    };

    $scope.dragging = function(){
        console.log("dragging");
    }

    $scope.stopDragging = function () {
        $scope.isDragging = false;
        $scope.isMenuVisible = $scope.wasMenuVisible;
        $scope.currentDraggingWidget.deletion = false;
        $scope.setBtnIcon();
    };

    // Surcharge sur le draggable:move généré par le drag
    // Permet
    $rootScope.$on("draggable:move", function() {
        // Si le bouton du menu est survolé
        if ($('.floating-btn.drag-enter').length!=0){
            // Activation de la suppression (widget transparent)
            $scope.currentDraggingWidget.deletion = true;
            $scope.$apply();
        } else {
            // Désactivation de la suppression
            $scope.currentDraggingWidget.deletion = false;
            $scope.$apply();
        }
    });


    /**
     * Fonction appelée lors du drop sur la corbeille
     * @param {object} data Données reçues par le drop
     */
    $scope.onDeleteDrop = function (data) {
        switch (data.from){
            case "menu" :
                // Rien
                break;
            case "workspace" :
                WorkspacesService.deleteWidget(data.columnFrom,data.positionFrom);
                break;
        }
    };


    initialize();

});
