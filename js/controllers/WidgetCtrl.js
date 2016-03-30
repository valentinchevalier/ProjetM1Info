// Controleur principal
app.controller("WidgetCtrl", function ($scope, WorkspacesService, TisseoApiService, AgendaCulturelApiService) {


    $scope.AgendaCulturelApiService = AgendaCulturelApiService;
    $scope.TisseoApiService = TisseoApiService;
    $scope.WorkspacesService = WorkspacesService;

});
