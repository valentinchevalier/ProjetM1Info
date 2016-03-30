app.service("VelibApiService", function($http, $q, $filter){
    var that = this;

    that.key = "8afdd3d487fe29a96282c8c04bfd69b413eb21c8"

    that.preffix = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=8afdd3d487fe29a96282c8c04bfd69b413eb21c8";

    that.searchPlace = function(s){

        var url = that.preffix;

        var deferred = $q.defer();
        $http.get(url).success(function(data,status){
            deferred.resolve(data);

        }). error(function(data, status){
            deferred.reject("Aucunne station ne correspond");
        });
        //console.log(data);
        return deferred.promise;

    }


});
