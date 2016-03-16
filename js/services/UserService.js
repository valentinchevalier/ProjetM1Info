app.service('UserService', function (SettingsService, $http) {
    var that = this;

    that.templateUrl = "partials/user_account.html";

    that.loginData = {
        isOnInscription : false,
        isOnConnexion : false,
        isOnConnexionErreur : false,
        isOnInscriptionErreur : false,

        isLogged : false,

        login : "",
        mdp : "",
        confirm_mdp : "",

        loggedUser: {
            username: "Les 4 développeurs",
        },
    };


    that.login = function () {
        console.log("connexion");
        that.loginData.isLogged = true;
        SettingsService.enable();
    };

    that.logout = function () {
        console.log("deconnexion");
        that.loginData.isLogged = false;
        SettingsService.disable();
    };

    that.onButtonClick = function () {

        if (that.loginData.isLogged) {
            that.logout();
        } else {
            that.loginData.isOnConnexion = true;
        }

    };


    that.onButtonInscriptionClick = function(){
        that.loginData.isOnInscription = true;
    }

    that.onButtonInscriptionClick2 = function($event){
        // Si le click est sur le container
        if ($event.target.className.indexOf('workspace_creator_container') != -1 ){
            // Masquage du Workspace Creator
            that.loginData.isOnInscription = false;
            that.loginData.isOnConnexion = false;

        }
    }

    that.inscriptionUtilisateur = function(){

        console.log("Inscription");
        $http.post("inscription.php?param1="+that.loginData.login+"&param2="+that.loginData.mdp+"&param3="+that.loginData.confirm_mdp+"")
            .then(function(response) {
                console.log("post inscription ok");
                if (response.data=="ok"){
                    // mdp identiques
                    that.loginData.isOnInscription=false;
                    that.loginData.isOnInscriptionErreur=false;
                    console.log("pas d'erreur");
                    that.login();
                    that.loginData.loggedUser.username=that.loginData.login;
                }
                else{
                    //mdp differents
                    that.loginData.isOnInscription=false;
                    that.loginData.isOnInscriptionErreur=true;
                    console.log("erreur mdp:"+that.loginData.mdp+" - "+that.loginData.confirm_mdp);
                }
            }, function(response) {
               console.log("erreur lors du post inscription");
         });

    }
    that.connexionUtilisateur = function(){
        console.log("Connexion");

            $http.post("connexion.php?param1="+that.loginData.login+"&param2="+that.loginData.mdp+"").then(function(response) {
                    console.log("post connexion ok");      //document.getElementById("info").innerHTML = "Ca marche !"
                    if (response.data=="ok"){
                       //identifiants corrects
                        console.log("id corrects");
                        that.login();
                        that.loginData.loggedUser.username=that.loginData.login;
                        //quitter connexion
                        that.loginData.isOnConnexion=false;
                        that.loginData.isOnConnexionErreur=false;
                    }
                    else {
                       //mauvais identifiants
                        console.log("mauvais id");
                        that.loginData.isOnConnexion=false;
                        that.loginData.isOnConnexionErreur=true;
                    }
                }, function(response) {
               console.log("erreur lors du post inscription");
         });
    }


    //that.login();
});
