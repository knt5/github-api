'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.searchRepositoriesGET = function searchRepositoriesGET (req, res, next) {
  Default.searchRepositoriesGET(req.swagger.params, res, next);
};
