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
    app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../' + options.dir)));

  app.set('port', options.port);

  var server = app.listen(options.port, function () {
    console.log('Express server listening on port ' + server.address().port);
  });

  if (options.enableHTTPS) {
    var enableHTTPS = function (app) {

      var https = require('https'),
        agent2CertPem,
        agent2KeyPem;

      agent2KeyPem = '-----BEGIN RSA PRIVATE KEY-----' +
        'MIIBOgIBAAJBAMl2/Ba0XSm4ayi4C0rJ+tYtQu8O31VVXezkLJlf+6fVgdpVhYg5' +
        'QlihlPUoiM/wOsDWQ1ALnNhPlcLaQk+etQECAwEAAQJBAMT6Bf34+UHKY1ObpsbH' +
        '9u2jsVblFq1rWvs8GPMY6oertzvwm3DpuSUp7PTgOB1nLTLYtCERbQ4ovtN8tn3p' +
        'OHUCIQDzIEGsoCr5vlxXvy2zJwu+fxYuhTZWMVuo1397L0VyhwIhANQh+yzqUgaf' +
        'WRtSB4T2W7ADtJI35ET61jKBty3CqJY3AiAIwju7dVW3A5WeD6Qc1SZGKZvp9yCb' +
        'AFI2BfVwwaY11wIgXF3PeGcvACMyMWsuSv7aPXHfliswAbkWuzcwA4TW01ECIGWa' +
        'cgsDvVFxmfM5NPSuT/UDTa6R5BFISB5ea0N0AR3I' +
        '-----END RSA PRIVATE KEY-----';

      agent2CertPem = '-----BEGIN CERTIFICATE-----' +
        'MIIB7DCCAZYCCQC7gs0MDNn6MTANBgkqhkiG9w0BAQUFADB9MQswCQYDVQQGEwJV' +
        'UzELMAkGA1UECBMCQ0ExCzAJBgNVBAcTAlNGMQ8wDQYDVQQKEwZKb3llbnQxEDAO' +
        'BgNVBAsTB05vZGUuanMxDzANBgNVBAMTBmFnZW50MjEgMB4GCSqGSIb3DQEJARYR' +
        'cnlAdGlueWNsb3Vkcy5vcmcwHhcNMTEwMzE0MTgyOTEyWhcNMzgwNzI5MTgyOTEy' +
        'WjB9MQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExCzAJBgNVBAcTAlNGMQ8wDQYD' +
        'VQQKEwZKb3llbnQxEDAOBgNVBAsTB05vZGUuanMxDzANBgNVBAMTBmFnZW50MjEg' +
        'MB4GCSqGSIb3DQEJARYRcnlAdGlueWNsb3Vkcy5vcmcwXDANBgkqhkiG9w0BAQEF' +
        'AANLADBIAkEAyXb8FrRdKbhrKLgLSsn61i1C7w7fVVVd7OQsmV/7p9WB2lWFiDlC' +
        'WKGU9SiIz/A6wNZDUAuc2E+VwtpCT561AQIDAQABMA0GCSqGSIb3DQEBBQUAA0EA' +
        'C8HzpuNhFLCI3A5KkBS5zHAQax6TFUOhbpBCR0aTDbJ6F1liDTK1lmU/BjvPoj+9' +
        '1LHwrmh29rK8kBPEjmymCQ==' +
        '-----END CERTIFICATE-----';

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