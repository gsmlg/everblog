var broccoli = require('broccoli');
var Watcher = require('broccoli/lib/watcher');
var middleware = require('broccoli/lib/middleware');
var tinylr = require('tiny-lr');
var options = {
  host: 'localhost',
  port: 8080,
  liveReloadPort: 35279
};

var Config = function Config(app) {

  var tree = broccoli.loadBrocfile();

  var builder = new broccoli.Builder(tree);

  var watcher = new Watcher(builder, {verbose: true});

  app.use(middleware(watcher));

  // We register these so the 'exit' handler removing temp dirs is called
  function cleanupAndExit() {
    builder.cleanup().catch(function(err) {
      console.error('Cleanup error:');
      console.error(err && err.stack ? err.stack : err);
    }).finally(function() {
      process.exit(1);
    });
  }

  process.on('SIGINT', cleanupAndExit);
  process.on('SIGTERM', cleanupAndExit);

  var livereloadServer = new tinylr.Server();
  livereloadServer.listen(options.liveReloadPort, function (err) {
    if(err) {
      throw err;
    }
    console.log('Live reload server listen on %s', options.liveReloadPort);
  });

  var liveReload = function() {
    // Chrome LiveReload doesn't seem to care about the specific files as long
    // as we pass something.
    livereloadServer.changed({body: {files: ['livereload_dummy']}});
  };

  watcher.on('change', function(results) {
    console.log('Built - ' + Math.round(results.totalTime / 1e6) + ' ms @ ' + new Date().toString());
    liveReload();
  });

  watcher.on('error', function(err) {
    console.log('Built with error:');
    // Should also show file and line/col if present; see cli.js
    if (err.file) {
      console.log('File: ' + err.file);
    }
    console.log(err.stack);
    console.log('');
    liveReload();
  });

};

Config.PORT = options.port;

module.exports = Config;
