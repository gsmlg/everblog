module.exports = {
  serverport: 8080,

  styles: {
    src: 'app/stylesheets/**/*.less',
    dest: 'build/css'
  },

  scripts: {
    src: 'app/javascripts/**/*.js',
    dest: 'build/js'
  },

  dist: {
    root: 'build'
  },

  browserify: {
    entries: ['./app/javascripts/app.js'],
    bundleName: 'app.js',
    sourceMap: true
  }
};
