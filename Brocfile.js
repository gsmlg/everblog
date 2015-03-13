var compileES6 = require('broccoli-babel-transpiler');
var compileLess = require('broccoli-less-single');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');

// create tree for files in the app folder
var app = 'app/javascripts';
app = pickFiles(app, {
  srcDir: '/',
  destDir: 'app' // move under appkit namespace
});

// create tree for files in the styles folder
var styles = 'app/stylesheets';
styles = pickFiles(styles, {
  srcDir: '/',
  destDir: 'app' // move under appkit namespace
});

// create tree for vendor folder (no filters needed here)
var vendor = 'vendor';

// Transpile ES6 modules and concatenate them,
// recursively including modules referenced by import statements.
var app = compileES6(app, {
  //filenameRelative: '(filename)',
  sourceRoot: 'app',
  modules: 'amd',
  moduleIds: true,
  moduleRoot: 'app'
});

// include app, styles and vendor trees
var sourceTrees = [app, styles, vendor];

// Add bower dependencies
// findBowerTrees uses heuristics to pick the lib directory and/or main files,
// and returns an array of trees for each bower package found.
sourceTrees = sourceTrees.concat(findBowerTrees());

// merge array into tree
var appAndDependencies = mergeTrees(sourceTrees, { overwrite: true });


var appJs = appAndDependencies;
// console.log(require('util').inspect(appJs, {depth: null, colors: true}));

// compile less
var appCss = compileLess(
  appAndDependencies,
  'app/app.less',
  'assets/app.css',
  {
    sourceMap: {sourceMapFileInline: true}
  }
  );

// create tree for public folder (no filters needed here)
var publicFiles = 'public';

// merge js, css and public file trees, and export them
module.exports = mergeTrees([appJs, appCss, publicFiles]);
