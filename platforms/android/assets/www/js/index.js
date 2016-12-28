(function () {
  "use strict";
  var prescriptionDb = null,
  dbLoaded;

  document.addEventListener('deviceready', onDeviceReady.bind(this), false);

  function onDeviceReady() {
    // Cordova の一時停止を処理し、イベントを再開します
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    new SQliteStorageService().done(function(service){
      self.storageService = service;
    }).fail(function(error){
        console.log(error);
        alart(error);
    });
//    initDb();
/*
    db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
    db.transaction(function(tr) {
      populateDB();
    });
*/
    //var db = window.openDatabase("Database", "1.0", "PrescriptionNote", 200000);
    //db.transaction(populateDB, errorCB, successCB);

  }


   
  function initDb() {
    window.sqlitePlugin //cordova sqlite plugin
      .openDatabase({
        name: 'prescription.db' ,//db file name,
        location: 'default'
      }, function success(db) {
        console.log('**** OpenDb Success!!! ****');
//        window.PrescriptionDb = db; //If debug build, handy to have accessible to window
          prescriptionDb = db;  //private reference available only within this closure
//        populateDB(db);  //function that seeds initial data if needed
          new SQliteStorageService(prescriptionDb).done(function(service){
            self.storageService = service;

        }).fail(function(error){
          console.log(error);
          alart(error);
        });

        //selectData(db);

      }, function error(e) {
        //uh oh - something odd happened...
      });
  }
  
  function onPause() {
    // TODO: このアプリケーションは中断されました。ここで、アプリケーションの状態を保存します。
  };

  function onResume() {
    // TODO: このアプリケーションが再アクティブ化されました。ここで、アプリケーションの状態を復元します。
  };



})();

var prescriptionNoteApp = angular.module('prescriptionNoteApp', ['onsen', 'ui.calender']);
prescriptionNoteApp.constant('constValue', {
  dbName: 'prescription.db',
  dbLocation: 'default'
});
prescriptionNoteApp.service('SQliteStorageService', ['$scorp', SQliteStorageService]);
