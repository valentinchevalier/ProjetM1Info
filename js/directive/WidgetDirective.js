app.directive("ngWidget", function(){
    return {
        restrict: 'E',
        templateUrl : "./partials/widgets/widget_container.html",
        scope : {
            widget: '=',
            x: '=',
            y: '=',
        },
        controller : "WidgetCtrl"
    }
})
