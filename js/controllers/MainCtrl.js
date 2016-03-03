// Controleur principal
app.controller("MainCtrl", function ($scope, $rootScope, UserService, SettingsService) {

    // Variables d'état
    $scope.isMenuVisible = false;
    $scope.isDragging = false;
    $scope.buttonIcon = "fa-plus";

    $scope.currentDraggingWidget = {};

    // Recopie des Services dans le $scope pour y accéder dans la vue
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
            $scope.buttonIcon = "fa-arrow-down";
        } else {
            $scope.buttonIcon = "fa-plus";
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
        $scope.isMenuVisible = false;
        $scope.currentDraggingWidget = currentDraggingWidget;
        $scope.buttonIcon = "fa-trash";
    };

    $scope.dragging = function(){
        console.log("dragging");
    }

    $scope.stopDragging = function () {
        $scope.isDragging = false;
        $scope.isMenuVisible = true;
        $scope.currentDraggingWidget.deletion = false;
        $scope.setBtnIcon();
    };

    // Surcharge sur le draggable:move généré par le drag
    // Permet
    $rootScope.$on("draggable:move", function() {
        // Si le bouton du menu est survolé
        if ($('.menu_btn.drag-enter').length!=0){
            // Activation de la suppression (widget trnasparent)
            $scope.currentDraggingWidget.deletion = true;
            $scope.$apply();
        } else {
            // Désactivation de la suppression
            $scope.currentDraggingWidget.deletion = false;
            $scope.$apply();
        }
    });


    /**
     * Fonction appelé lors du drop sur la corbeille
     * @param {object} data Données reçu par le drop
     */
    $scope.onDeleteDrop = function (data) {
        switch (data.from){
            case "menu" :
                // Rien
                break;
            case "workspace" :
                $scope.removeWidget(data.xFrom,data.yFrom);
                break;
        }
    };


    initialize();

});
