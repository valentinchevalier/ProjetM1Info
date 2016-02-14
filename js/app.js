<<<<<<< HEAD
var app = angular.module('MonAppli', ['ngRoute', 'ngDraggable']);
=======
var app = angular.module('MonAppli', ['ngRoute']);
>>>>>>> test/master
app.config(function($routeProvider){
   $routeProvider
        .when('/', {templateUrl: 'partials/workspace.html', controller: 'WorkspaceCtrl'})
        .otherwise({redirectTo: '/'});
});
