var app = angular.module('MonAppli', ['ngMaterial', 'ngRoute', 'ngDraggable', 'ngMessages']);

app.config(function($routeProvider){
   $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
        .otherwise({redirectTo: '/'});
});

app
.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});


