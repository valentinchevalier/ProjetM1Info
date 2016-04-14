app.service("TelechargementService", function($http, $q, $filter){

    this.saveToPc = function (data, filename) {

        console.log("coucou");

      if (!data) {
        console.error('No data');
        return;
      }

      if (!filename) {
        filename = 'download.json';
      }

      if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 2);
      }

      var blob = new Blob([data], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    };

});
