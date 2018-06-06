var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

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
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  createWorkout: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  update: function(table, cols, condition, cb) {
    console.log(cols);
    console.log(condition);
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += Object.keys(cols) + "=" + `${Object.values(cols)}`;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  //   userWorkout: function(table, condition, cb) {
  //     var queryString = "SELECT FROM " + table;
  //     queryString += " W"
  //   }
  // },

  selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(
      err,
      result
    ) {
      if (err) throw err;
      cb(err, result);
    });
  },

  displayWorkout: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(
      err,
      result
    ) {
      if (err) throw err;
      cb(err, result);
    });
  },


  create: function(table, cols, cb) {
    var queryString = `INSERT INTO ${table} (${Object.keys(
      cols
    )}) VALUES (${printQuestionMarks(Object.keys(cols).length)});`;
    console.log(queryString);
    connection.query(queryString, Object.values(cols), function(err, result) {
      if (err) {
        throw err;
      }
      cb(null, result);
    });
  },

  selectHistory: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = `SELECT * FROM ${tableInput} WHERE ${colToSearch} = ${valOfCol};`
    console.log(queryString);
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(
      err,
      result
    ) {
      if (err) throw err;
      cb(err, result);
    });
  },


};
module.exports = orm;
