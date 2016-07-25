'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');

var jsPath = './js/**/*.js'
var jsMainPath = './js/index.js'
var scssPath = './style/**/*.scss'

gulp.task('eslint', function() {
  return gulp
    .src(jsPath)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', function() {
  return gulp
    .src(jsMainPath)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./static'));
})

gulp.task('sass', function() {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
  return gulp
    .src(scssPath)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./static'))
});

gulp.task('watch', function() {
  return gulp
    .watch(scssPath, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['js', 'sass']);
