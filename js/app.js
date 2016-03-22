var app = angular.module('MonAppli', ['ngMaterial', 'ngRoute', 'ngDraggable', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});

Array.prototype.getUnique = function (property) {

    var u = {},
        a = [],
        existingElements = [];

    for (var i = 0, l = this.length; i < l; ++i) {
        var current = this[i];
        if (existingElements.indexOf(this[i][property]) == -1){
            a.push(this[i]);
            existingElements.push(this[i][property]);
        }
    }
    return a;
}
