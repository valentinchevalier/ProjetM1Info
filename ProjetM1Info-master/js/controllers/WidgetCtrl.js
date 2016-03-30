// Controleur principal
app.controller("WidgetCtrl", function ($scope, WorkspacesService, TisseoApiService, VelibApiService) {

    $scope.TisseoApiService = TisseoApiService;
    $scope.WorkspacesService = WorkspacesService;
    $scope.VelibApiService = VelibApiService;

});
