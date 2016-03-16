app.service('SettingsService', function () {
    var that = this;

    that.templateUrl = "./partials/settings.html";

    that.settingsData = {
        isEnable : false,
        isMenuVisible : false,
    };

    that.enable = function(){
        that.settingsData.isEnable = true;
    }
    that.disable = function(){
        that.settingsData.isEnable = false;
        that.settingsData.isMenuVisible = false;
    }

    that.settingsBtnClick = function () {
        that.settingsData.isMenuVisible = !that.settingsData.isMenuVisible;
    };
});
