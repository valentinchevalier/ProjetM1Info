var app = angular.module('MonAppli', ['ngRoute', 'ngDraggable']);

app.config(function($routeProvider){
   $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
        .otherwise({redirectTo: '/'});
});



