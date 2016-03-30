app.service('UserService', function (SettingsService, $http, $mdDialog, $q) {
    var that = this;

    that.templateUrl = "./partials/user_account.html";

    that.loginData = {
        isLogged : false,

        login : "",
        mdp : "",
        confirm_mdp : "",

        loggedUser: {
            username: "Les 4 développeurs",
        },
    };

    that.login = function (user) {
        that.loginData.loggedUser = user;
        that.loginData.isLogged = true;
        SettingsService.enable();
    };
    that.login(null);

    that.logout = function () {
        console.log("deconnexion");
        that.loginData.isLogged = false;
        SettingsService.disable();
    };

    that.onDeconnexionClick = function () {
        that.logout();
    };

    that.onConnexionClick = function (ev){

        $mdDialog.show({
            controller: ConnexionController,
            templateUrl: 'partials/dialog_connexion.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false,
        });
    };


    that.onInscriptionClick = function(ev){

        $mdDialog.show({
            controller: InscriptionController,
            templateUrl: 'partials/dialog_inscription.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
        });
    }

    function ConnexionController($scope, $mdDialog, UserService) {
        $scope.data = {
            login : "",
            password : "",
            message : ""
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.hasErrorMessage = function(){
            return $scope.data.message.length > 0;
        }

        $scope.connect = function() {
            UserService.loginAction($scope.data.login, $scope.data.password).then(function(user){
                $scope.data.message = "";
                UserService.login(user);
                $mdDialog.hide();
            }, function(message){
                $scope.data.message = message;
            });
        };
    }

    function InscriptionController($scope, $mdDialog, UserService) {
        $scope.data = {
            login : "",
            password : "",
            confirm_password : "",
            message : ""
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.hasErrorMessage = function(){
            return $scope.data.message.length > 0;
        }

        $scope.submit = function() {
            if ($scope.data.password != $scope.data.confirm_password){
                $scope.data.message = "Les 2 mot de passe sont différents."
            } else {
                UserService.inscriptionAction($scope.data.login, $scope.data.password).then(function(user){
                    $scope.data.message = "";
                    UserService.login(user);
                    $mdDialog.hide();
                }, function(message){
                    $scope.data.message = message;
                });
            }
        };
    }



    that.inscriptionAction = function(login, password){
        var deferred = $q.defer();

        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/inscription.php", {
            login : login,
            password : password,
        }).then(function(response) {
            console.log(response);
            if (response.data.status == 1){
                deferred.resolve(response.data.user);
            } else {
                deferred.reject(response.data.message);
            }
        }, function(response) {
            deferred.reject("Erreur de connexion au serveur");
        });

        return deferred.promise;
    }

    that.loginAction = function(login, password){
        var deferred = $q.defer();

        $http.post("http://purplemultimedia.com/private/ProjetM1Info/server/connexion.php", {
            login : login,
            password : password
        }).then(function(response) {
            console.log(response);
            if (response.data.status == 1){
                deferred.resolve(response.data.user);
            } else {
                deferred.reject(response.data.message);
            }
        }, function(response) {
            deferred.reject("Erreur de connexion au serveur");
        });

        return deferred.promise;
    }


    //that.login();
});
