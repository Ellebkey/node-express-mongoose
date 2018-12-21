const _ = require('lodash');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const defaultAssets = require('./config/assets/default');

const index = 'index.js';
const allJS = _.union(
  defaultAssets.server.gulpConfig,
  defaultAssets.server.allJS,
  defaultAssets.server.controllers,
  defaultAssets.server.models,
  defaultAssets.server.routes
);

gulp.task('nodemon', () => {
  nodemon({
    script: index,
    watch: allJS
  });
});

gulp.task('browser-sync', ['nodemon'], () => ({
}));

gulp.task('js', () => {
  gulp.src('server/**/**/*.js')
    .pipe(browserSync.reload({ stream: true }))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch('server/**/**/*.js', ['js', browserSync.reload]);
});
