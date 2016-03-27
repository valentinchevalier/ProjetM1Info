app.service("TisseoApiService", function($http, $q){
    var that = this;

    that.key = "3b24a7ce-9574-40b4-b87e-6205476c9890"

    that.preffix = "https://api.tisseo.fr/v1/";

    that.searchPlace = function(s){

        var url = that.preffix + "places.json";

        var deferred = $q.defer();
        $http.get(url, {
            params: {
                key: that.key,
                term : s,
                displayOnlyStopAreas : 1
            }
        }).success(function(data,status){
            deferred.resolve(data.placesList.place)
        }). error(function(data, status){
            deferred.reject("Aucuns arrêt ne correspond");
        });
        return deferred.promise;
    }

    that.getProchainPassages = function(idArret){

        var url = that.preffix + "stops_schedules.json";

        var deferred = $q.defer();
        $http.get(url, {
            params: {
                key: that.key,
                stopPointId : idArret
            }
        }).success(function(data,status){
            deferred.resolve(data.departures.departure)
        }). error(function(data, status){
            deferred.reject("Erreur");
        });
        return deferred.promise;
    }


});
