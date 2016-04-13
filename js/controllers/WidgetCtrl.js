// Controleur principal
app.controller("WidgetCtrl", function ($scope, $mdDialog, WorkspacesService, TisseoApiService, AgendaCulturelApiService, VelibApiService, WeatherApiService) {


    $scope.AgendaCulturelApiService = AgendaCulturelApiService;
    $scope.TisseoApiService = TisseoApiService;
    $scope.WorkspacesService = WorkspacesService;
    $scope.VelibApiService = VelibApiService;
    $scope.WeatherApiService = WeatherApiService;

    $scope.showSwitchClick = function(ev,column,position){
        var currentWorkspace = WorkspacesService.currentWorkspace;
        var workspaces = WorkspacesService.workspaces;
        var position = position;
        var column = column;

        $mdDialog.show({
            controller: SwitchWorkspaceController,
            templateUrl: 'partials/switch_onglet.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false,
            locals : {
                currentWorkspace : currentWorkspace,
                workspaces : workspaces,
                column : column,
                position : position,
            },
            bindToController: true,
        })
        .then(function(answer) {

        }, function() {
            // Rien à faire
        });
    };

    function SwitchWorkspaceController($scope, $mdDialog, $sce, WorkspacesService, currentWorkspace, workspaces, column, position) {
        $scope.deletionIndex = null;
        $scope.isConfirmationVisible = false;
        $scope.confirmMessage = "";

        $scope.position = position;
        $scope.column = column;
        $scope.currentWorkspace = currentWorkspace;
        $scope.workspaces = workspaces;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.moveAnotherWorkspace = function(ev,index) {
            $scope.widget = $scope.currentWorkspace.widgets[$scope.column][$scope.position];
            WorkspacesService.deleteWidget($scope.column,$scope.position);
            WorkspacesService.addWidgetElsewhere(index,0,$scope.widget);
            $scope.hide();
        };
    }

    function init(){
        $scope.widget.init();
    }
    init();

});
