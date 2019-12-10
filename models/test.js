const squel = require("squel");
const Client = require("mysql");
const config = require("./config");

const TestModel = function() {};

/**
 * @param {Object}   params
 * @param {fn}       callback(err, result);
 */
TestModel.prototype.list = function(params, callback) {
  const c = Client.createConnection(config.read_only);

  c.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    try {
      var sql = squel
        .select()
        .field("*")
        .from("mysql.db");

      sql = sql.where("`Host` like ?", "localhost");
    } catch (e) {
      console.log(params);
      if (e) {
        console.log(e);
        throw e;
      }
    }

    c.query(sql.toString(), function(error, result) {
      callback(error, result);
    });
  });
};

module.exports = TestModel;
