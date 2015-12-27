
// The basics
var express = require('express');
var fusion = require('fusion');
var path = require('path');

// Framework TODO: This probably shouldn't be global
global.live = Const.live;

// Better debug messages
require('debug-trace')({
  always: true,
});

var datefmt = require('dateformat');
datefmt.masks.sql = 'yyyy-mm-dd HH:MM:ss';

// Default 3rd party middleware
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

//var sessions = require('./request/sessions');

// The server
var http = require('http');

// Create the express.js app
var app = express();

// Port the server listens on locally
app.set('port', Const.port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

// HTTP request body parser
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb', parameterLimit: 5000 }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session parser
//sessions.configure(express,app);

var framework = {
  dirs: {
    apps: '/apps',
    includes: '/includes',
  },

  routes: {
    cron: Const.cronEnabled ? 'cron' : null,
    custom: 'custom',
  },

  // Web routers
  web: Const.webRoutes,

  // Variables that should persist across requests for the same session
  persistVars: {
  },

  // Sanity check to make sure globals aren't being leaked
  globalSizeLimit: 42,
}
for (var k in Const.framework) framework[k] = Const.framework[k];
fusion.configure(framework);

// URL routing
app.use(fusion.router('www'));

// Client-side scripts
// Framework TODO: This should probably not be available on the live server
app.use(express.static(path.join(__dirname, 'client')));

var server = http.createServer(app);

server.listen(app.get('port'),'localhost', function() {
  // The uncaughtException handler makes sure that an uncaught error cannot
  // bring down the server. The uncaughtException handler is added after the
  // server starts listening just in case that another process is already running
  process.addListener("uncaughtException", function (err) {
    console.error("Uncaught exception: " + err.message);
    console.error(err.stack);
  });

  // Pre-load all methods so that the user doesn't have to wait
  fusion.preload();

  console.log('Ready');
});

