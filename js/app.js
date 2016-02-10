var app = angular.module('MonAppli', ['ngRoute']);
app.config(function($routeProvider){
   $routeProvider
        .when('/', {templateUrl: 'partials/workspace.html', controller: 'WorkspaceCtrl'})
        .otherwise({redirectTo: '/'});
});
