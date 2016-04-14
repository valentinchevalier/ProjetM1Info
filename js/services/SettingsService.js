app.service('SettingsService', function ($mdSidenav, $mdDialog, WorkspacesService, UserService) {

    this.sidenavTemplateUrl = "./partials/sidenav_settings.html";

    this.isMenuVisible = false;

    this.isEnable = function(){
        return UserService.loginData.isLogged;
    }

    this.settingsBtnClick = function () {
        this.isMenuVisible = !this.isMenuVisible;
        $mdSidenav('left-menu').toggle();
    };

    this.saveCurrentStateClick = function(ev){
        var confirm = $mdDialog.confirm()
            .title('Êtes-vous sûr de vouloir sauvegarder l\'état courant ?')
            .textContent("Toute sauvegarde déjà éffectuée sera supprimée.")
            .ariaLabel('Confirmation de sauvegarde')
            .targetEvent(ev)
            .openFrom($(ev.currentTarget))
            .ok('Sauvegarder')
            .cancel('Annuler');

        $mdDialog.show(confirm).then(function () {
            $mdSidenav('left-menu').close();
            WorkspacesService.save();
        }, function () {

        });

    }

    this.loadPreviousStateClick = function(ev){
        var confirm = $mdDialog.confirm()
            .title('Êtes-vous sûr de vouloir charger un état précedent ?')
            .textContent("Toute modifications non sauvegardées seront perdues.")
            .ariaLabel('Confirmation de chargement')
            .targetEvent(ev)
            .openFrom($(ev.currentTarget))
            .ok('Charger')
            .cancel('Annuler');

        $mdDialog.show(confirm).then(function () {
            $mdSidenav('left-menu').close();
            WorkspacesService.reload();
        }, function () {

        });
    }

});
