/*
 * Dabase Access module
 */
DataAccess = function(){
  var service = {};
  //var db = initialDB();

  this.createUSERSql = [
    'CREATE TABLE IF NOT EXISTS USER (',
    'userIid INTEGER primary key,',
    'name TEXT, ',
    'birthday TEXT,',
    'icon_color,',
    'icon_souece,',
    'updateDate TEXT);'
  ].join('');
  this.createPastHistorySql = [
    'CREATE TABLE IF NOT EXISTS PASTHIATORY (',
    'id INTEGER primary key, ',
    'userId INTEGER, ',
    'name TEXT,',
    'detail TEXT, ',
    'updateDate TEXT);'
  ].join('');
  this.createAllergySQL = [
    'CREATE TABLE IF NOT EXISTS ALLERGY (',
    'id INTEGER primary key, ',
    'userId INTEGER, ',
    'name TEXT, ',
    'detail TEXT, ',
    'updateDate TEXT);'
  ].join('');
  this.createNoteSQL = [
    'CREATE TABLE IF NOT EXISTS NOTE (',
    'noteId INTEGER primary key,', 
    'userId INTEGER, ',
    'prescriptionDate, ',
    'hospitalName TEXT, ',
    'diseaseName TEXT, ',
    'memo TEXT, ',
    'updateDate TEXT);'
  ].join('');
  this.createNoteDetailSQL =[
    'CREATE TABLE IF NOT EXISTS NotesDetail (',
    'detailId INTEGER primary key, ',
    'noteId INTEGER, ',
    'type TEXT, ',
    'detail BLOB, ',
    'updateDate TEXT);'
  ].join('');

  this.initUsers = [
    {name: 'InitialUser', color: '#FFF', birthday: '1975-07-10'}
  ];
/*
  this.$get = ['$window', '$scope', function($window, $scope){
    var dbService = {};

    dbService.initDb = function(){
      $window.sqlitePlugin.openDatabase({
        name: 'prescription.db'
      }, function success(db){
        populateDB(db);
        return db;
      });
    };

    return dbService;
  }];
*/
  /**
   * @param  {} name
   * @param  {} version
   * @param  {} b
   */
  function initialDB(){
    window.sqlitePlugin.openDatabase({
      name: 'prescription.db'
    }, function success(db){
      //window.prescriptionDB = db;
      return db;
    });
  }
  
  // Populate the database
  //
  /**
   * @param  {} tx
   */
  service.populateDB = function() {
    var defer = $.Deferred();

    //dbLoaded variable will be the promise - that way we can always safely query the db
//    dbLoaded = defer.promise;

    db.transaction(function(t) {
      t.executeSql(createUSERSql, []);
      t.executeSql(createPastHistorySql, []);
      t.executeSql(createAllergySQL, []);
      t.executeSql(createNoteSQL, []);
      t.executeSql(createNoteDetailSQL, []);

      t.executeSql(
          'INSERT OR IGNORE INTO USER (name, icon_color, birthday ) VALUES (?,?,?)',
          //params array is used to populate param placeholders (?) - and in the order in which they appear
          ['TestName','#FFF','1975-07-10']
      );
    }, function error(error) {
      console.log('Transaction ERROR: ' + error.message);
    //typically only hit this if there are issues with your SQL statements
    }, function success() {
      console.log('Populated database OK');
      
      t.executeSql('Select count(*) AS mycount from USERS;', [], function(rs){
        console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
      });
      defer.resolve(); //now it is ready to be queried against
    });
    return defer.promise();
  };

    // Transaction error callback
    //
  function errorCB(tx, err) {
      alert("Error processing SQL: " + err);
      

  }

    // Transaction success callback
    //
  function successCB() {
      alert("success!");
  }

  function selectData(db) {
      db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM USER', [], function(tx, rs) {
          console.log('Record count (expected to be 2): ' + JSON.stringify(rs.rows));
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
        });
      });
  }
};