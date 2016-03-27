// Controleur principal
app.controller("WidgetCtrl", function ($scope, WorkspacesService, TisseoApiService) {


    $scope.TisseoApiService = TisseoApiService;
    $scope.WorkspacesService = WorkspacesService;

});
