app.service("VelibApiService", function($http, $q, $filter){
    var that = this;

    that.key = "8afdd3d487fe29a96282c8c04bfd69b413eb21c8"

    that.preffix = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=8afdd3d487fe29a96282c8c04bfd69b413eb21c8";

    that.stations = null;

    that.searchPlace = function(s){

        var deferred = $q.defer();
        if (that.stations == null){

            var url = that.preffix;

            $http.get(url).success(function(data,status){
                that.stations = data;
                console.log(that.stations);
                var results = that.stations.filter( that.createFilterFor(s));
                deferred.resolve(results);
            }). error(function(data, status){
                deferred.reject("Aucune station ne correspond à votre recherche.");
            });
            return deferred.promise;
        } else {
            var results = that.stations.filter( that.createFilterFor(s));
            deferred.resolve(results)
            return deferred.promise;
        }
    }
    /**
     * Create filter function for a query string
     */
    that.createFilterFor = function(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(station) {
        return (angular.lowercase(station.name).indexOf(lowercaseQuery) != -1);
      };
    }


});
