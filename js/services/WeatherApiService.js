app.service("WeatherApiService", function($http, $q, $filter){
    var that = this;

    that.key = "c993d428ee536ce1df7adb3d5b7acf97"

    that.preffix = "http://api.openweathermap.org/data/2.5/weather?id=2972315&APPID=c993d428ee536ce1df7adb3d5b7acf97";

    that.info = null;

    var url = that.preffix;

    var deferred = $q.defer();

    $http.get(url).success(function(data,status){
        that.info = data;
        console.log(that.info);
        deferred.resolve(that.info)
    }). error(function(data, status){
        deferred.reject("Une erreur est survenue.");
    });

    that.findImage = function(){
        var lienImage = "../../img/";
        lienImage = lienImage+that.info.weather[0].icon;
        console.log("C'est");
        console.log(that.info.weather[0].icon);
        lienImage = lienImage+".png";

        return lienImage;
    }

});
