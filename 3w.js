#!/usr/bin/env node

/**
 * 3d v0.0.1
 * Copyright (c) 2014 Mehran Hatami
 * Available via the MIT license.
 * license found at https://github.com/mehranhatami/3w/raw/master/LICENSE
 */
'use strict';

var options = {
  enableHTTPS: false,
  port: 9000,
  dir: 'app'
};
if (require.main === module) {
  /*
   * Each arg has a default value and the order doesn't matter
   * node www.js 'src' --8080 --https
   * --3000 'src'
   * --https
   */
  process.argv.slice(2)
    .forEach(function (val, index) {
      if (val === '--https') options.enableHTTPS = true;
      else if (val.slice(0, 2) === '--') {
        val = val.slice(2);
        if (!isNaN(val)) options.port = +val;
      } else options.dir = val;
    });
}

module.export = (function () {
  var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    error = require('./error'),
    app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../' + options.dir)));

  error(app);

  app.set('port', options.port);

  var server = app.listen(options.port, function () {
    console.log('Express server listening on port ' + server.address().port);
  });

  if (options.enableHTTPS) {
    var enableHTTPS = function (app) {

      var https = require('https'),
        fs = require('fs'),
        agent2CertPem,
        agent2KeyPem;

      agent2KeyPem = fs.readFileSync(__dirname + '/keys/agent2-key.pem');
      agent2CertPem = fs.readFileSync(__dirname + '/keys/agent2-cert.pem');

      // Create an HTTPS service identical to the HTTP service.
      https.createServer({
          key: agent2KeyPem,
          cert: agent2CertPem
        }, app)
        .listen(443);
    };

    enableHTTPS(app);
  }

  return app;
}());