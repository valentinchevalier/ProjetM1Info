app.service("WeatherApiService", function($http, $q, $filter){
    var that = this;

    that.key = "c993d428ee536ce1df7adb3d5b7acf97"

    that.preffix = "https://api.openweathermap.org/data/2.5/weather?id=2972315&APPID=c993d428ee536ce1df7adb3d5b7acf97";

    var url = that.preffix;

    var deferred = $q.defer();

    $http.get(url).success(function(data,status){
        that.info = data;
        console.log(that.info);
        var results = that.info.filter( that.createFilterFor(s));
        deferred.resolve(results)
    }). error(function(data, status){
        deferred.reject("Une erreur est survenue.");
    });

    return deferred.promise;

    /**
     * Create filter function for a query string
     */
    that.createFilterFor = function(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(city) {
        console.log(angular.lowercase(city.name))
        console.log(lowercaseQuery)
        return (angular.lowercase(city.name).indexOf(lowercaseQuery) != -1);
      };
    }


});
