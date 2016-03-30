// Controleur principal
app.controller("MainCtrl", function ($scope, $rootScope, UserService, SettingsService, WorkspacesService, TisseoApiService, VelibApiService) {

    // Variables d'état
    $scope.isMenuVisible = true;
    $scope.isDragging = false;
    $scope.buttonIcon = "add";

    $scope.currentDraggingWidget = {};

    // Recopie des Services dans le $scope pour y accéder dans la vue
    $scope.UserService = UserService;
    $scope.SettingsService = SettingsService;
    $scope.TisseoApiService = TisseoApiService;
    $scope.VelibApiService = VelibApiService;

    $scope.searchArret = function(){
        var term = $scope.stop.label;
        console.log(term);
        if (term.length < 3)
            $scope.places = [];
        else {
            TisseoApiService.searchPlace(term).then(function(places){
                console.log(places);
                $scope.places = places;
            }, function(msg){
                alert(msg);
            })
        }
    }


    // Widgets disponibles à l'ajout
    $scope.availableWidgets = [
        {
            name: "Tisseo",
            type: "tisseo_prochains_passages",
            color: "#0C226B",
            img_url: "img/Tisseo_logo.png",
            deletion: false,
        },
        {
            name: "Post It",
            type: "post_it",
            color: "#FFE100",
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
        {
            name: "Vélib toulouse",
            type: "velib",
            color: "green",
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
                WorkspacesService.deleteWidget(data.columnFrom,data.positionFrom);
                break;
        }
    };


    initialize();

});
