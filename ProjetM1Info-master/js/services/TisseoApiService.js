app.service("TisseoApiService", function($http, $q, $filter){
    var that = this;

    that.key = "3b24a7ce-9574-40b4-b87e-6205476c9890"

    that.preffix = "https://api.tisseo.fr/v1/";

    that.lines = [];
    that.areLinesInit = false;

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
            console.log(data);
            deferred.resolve(data.placesList.place)
        }). error(function(data, status){
            deferred.reject("Aucuns arrêt ne correspond");
        });
        return deferred.promise;
    }

    that.getStopsSchedules = function(stopId, lineId){
        var url = that.preffix + "stops_schedules.json";

        var deferred = $q.defer();
        $http.get(url, {
            params: {
                key: that.key,
                stopPointId : stopId,
                lineId : lineId
            }
        }).success(function(data,status){
            deferred.resolve(data.departures.departure)
        }). error(function(data, status){
            deferred.reject("Erreur");
        });
        return deferred.promise;
    }


    that.getLinesForStop = function(stopId){
        var url = that.preffix + "stop_points.json";

        var deferred = $q.defer();
        $http.get(url, {
            params: {
                key: that.key,
                stopAreaId : stopId,
                displayLines: 1
            }
        }).success(function(data,status){
            var stops = data.physicalStops.physicalStop;
            var linesName = [];
            var lines = [];
            angular.forEach(stops, function(stop) {
                angular.forEach(stop.destinations, function(destination){
                    angular.forEach(destination.line, function(line){

                        this.push(line);
                    }, this);
                }, this);
            }, lines);

            lines = lines.getUnique("id");

            deferred.resolve(lines);
        }). error(function(data, status){
            deferred.reject("Erreur");
        });
        return deferred.promise;
    }

    /*that.getAllLineInfo = function(){
        var url = that.preffix + "lines.json";
        var deferred = $q.defer();
        $http.get(url, {
            params: {
                key: that.key,
                network: "Tisséo",
            }
        }).success(function(data,status){
            that.linesInfo = data.lines.line;
            deferred.resolve();
        }). error(function(data, status){
            deferred.reject("Erreur");
        });
        return deferred.promise;
    }

    that.getAllLineInfo().then(function(){
        that.areLinesInit = true;
    })*/

    that.getLineColor = function(shortName){
        var ret;
        that.linesInfo.forEach(function(line){
           if (line.shortName == shortName){
               ret = line.bgXmlColor;
           }
        });
        return ret;
    }



});
