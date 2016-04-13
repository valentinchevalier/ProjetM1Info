app.service("WeatherApiService", function($http, $q, $filter){
    var that = this;

    that.key = "c993d428ee536ce1df7adb3d5b7acf97"

    that.preffix = "http://api.openweathermap.org/data/2.5/weather";


    var url = that.preffix;


    that.getWeather = function(){
        var deferred = $q.defer();
        $http.get(url, {
            params : {
                'id' : 2972315,
                'APPID' : that.key
            }
        }).success(function(data,status){
            that.info = data;
            deferred.resolve(that.info);
        }). error(function(data, status){
            deferred.reject("Une erreur est survenue.");
        });

        return deferred.promise;
    }


});
