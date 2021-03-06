var connection = require("../config/connection.js");

function printQuestionMarks(num){
    var arr = [];

    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();  
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  

//Create methods that will execute the necessary mysql commands
// selectAll() insertOne() updateOne()
//export the ORM object in module.exports
var orm = {
    selectAll: function(table, cb){
        var queryString = "SELECT * FROM " + table + ";"
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            } 
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb){
        var queryString = "INSERT INTO "+table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });    
    }
};

module.exports = orm;

//var orm = {
//    selectWhere: function(tableInput, colToSearch, valOfCol) {
//      var queryString = "SELECT * FROM ?? WHERE ?? = ?";
//      connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
//        if (err) throw err;
//        console.log(result);
//      });
//    },
//    selectAndOrder: function(whatToSelect, table, orderCol) {
//      var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
//      console.log(queryString);
//      connection.query(queryString, [whatToSelect, table, orderCol], function(err, result) {
 //       if (err) throw err;
 //       console.log(result);
 //     });
//    },
//    findWhoHasMost: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
//      var queryString =
//        "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";
//  
//      connection.query(
//        queryString,
//        [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol],
//        function(err, result) {
//          if (err) throw err;
//          console.log(result);
//        }
//      );
//    }
//  };
  

  