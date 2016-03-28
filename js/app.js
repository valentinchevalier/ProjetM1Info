var app = angular.module('MonAppli', ['ngMaterial', 'ngSanitize', 'ngRoute', 'ngDraggable', 'ngMessages']);

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

app.config(function($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('cyan', {
            'default': '700',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('teal', {
            'default' : '500',
        });
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
