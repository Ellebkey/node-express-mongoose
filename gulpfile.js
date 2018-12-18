const _ = require('lodash');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const defaultAssets = require('./config/assets/default');

const allJS = _.union(defaultAssets.server.gulpConfig, defaultAssets.server.allJS, defaultAssets.server.controllers, defaultAssets.server.models, defaultAssets.server.routes);

gulp.task('nodemon', () => {
  return nodemon({
    script: 'index.js',
    watch: allJS
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
});

gulp.task('js', () => {
  return gulp.src('server/**/**/*.js')
  .pipe(browserSync.reload({ stream: true }));
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch('server/**/**/*.js',   ['js', browserSync.reload]);
});
