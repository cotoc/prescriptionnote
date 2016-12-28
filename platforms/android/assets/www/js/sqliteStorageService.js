SQliteStorageService = function () {
	var service = {};

	var db = window.sqlitePlugin //cordova sqlite plugin
      .openDatabase({
        name: 'prescription.db' ,//db file name,
        location: 'default'
      }, function success(db) {
      }, function error(e) {
      });

	var createUSERSql = [
    'CREATE TABLE IF NOT EXISTS USER (',
    'userIid INTEGER primary key,',
    'name TEXT, ',
    'birthday TEXT,',
    'icon_color,',
    'icon_souece,',
    'updateDate TEXT);'
  ].join(''),
  createPastHistorySql = [
    'CREATE TABLE IF NOT EXISTS PASTHIATORY (',
    'id INTEGER primary key, ',
    'userId INTEGER, ',
    'name TEXT,',
    'detail TEXT, ',
    'updateDate TEXT);'
  ].join(''),
  createAllergySQL = [
    'CREATE TABLE IF NOT EXISTS ALLERGY (',
    'id INTEGER primary key, ',
    'userId INTEGER, ',
    'name TEXT, ',
    'detail TEXT, ',
    'updateDate TEXT);'
  ].join(''),
  createNoteSQL = [
    'CREATE TABLE IF NOT EXISTS NOTE (',
    'noteId INTEGER primary key,', 
    'userId INTEGER, ',
    'prescriptionDate, ',
    'hospitalName TEXT, ',
    'diseaseName TEXT, ',
    'memo TEXT, ',
    'updateDate TEXT);'
  ].join(''),
	createNoteDetailSQL =[
    'CREATE TABLE IF NOT EXISTS NotesDetail (',
    'detailId INTEGER primary key, ',
    'noteId INTEGER, ',
    'type TEXT, ',
    'detail BLOB, ',
    'updateDate TEXT);'
  ].join('');

	service.initialize = function(db){

		console.log('*** service.initialize Start! ***');

		var deferred = $.Deferred();

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
		return deferred.promise();
	}

	service.loadUsers = function(){

	}

	return service.initialize(db);
}