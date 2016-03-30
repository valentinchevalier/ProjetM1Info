//https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse&q=halle+AND+date_debut+%3E+2016%2F03%2F29&sort=-date_debut
app.service("AgendaCulturelApiService", function($http, $q, $filter){
    var that = this;

    that.preffix = "https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse";

    that.sort = "-date_debut";


    that.getEvenements = function(query){
        var url = that.preffix;
        var date = $filter('date')(new Date(), "yyyy/MM/dd");
        var vraieQuery += " AND date_debut >" + date;
        var deferred = $q.defer();
        $http.get(url, {
            params: {
                q: vraieQuery,
                sort : -date_debut
            }
        }).success(function(data,status){
            console.log(data);
            deferred.resolve(data)
        }). error(function(data, status){
            deferred.reject("Erreur");
        });
        return deferred.promise;
    }


});