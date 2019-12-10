/*
 * libraries
 */
const async = require("async");
const TestModel = require("../models/test");
const moment = require("moment");

/*
 * class declaration
 */

function Test() {}

/*
 * routing
 */

var test = new Test();

module.exports.route = function(app) {
  app.get("/v1/test", test.getTest);
};

/* controller functions */

/**
 * GET test
 */
Test.prototype.getTest = function(req, res, next) {
  const model = new TestModel();
  model.list({}, function(error, result) {
    if (!error) {
      res.send(200, { success: true, data: result });
    } else {
      res.send(error.code, error);
    }
  });
};
