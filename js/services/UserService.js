app.service('UserService', function () {
    var that = this;

    that.templateUrl = "partials/user_account.html";

    that.loginData = {
        isLogged : false,
        loggedUser: {
            username: "Les 4 développeurs",
        },
    };

    that.login = function () {
        console.log("connexion");
        that.loginData.isLogged = true;
    };

    that.logout = function () {
        console.log("deconnexion");
        that.loginData.isLogged = false;
    };

    that.onButtonClick = function () {
        if (that.loginData.isLogged) {
            that.logout();
        } else {
            that.login();
        }
    };
});
