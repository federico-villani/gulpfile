// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


'use strict';
  
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
 
gulp.src('./scss/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./css'));

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
	gulp.src(['./src/styles/*.css'])
	  .pipe(concat('styles.css'))
	  .pipe(autoprefix('last 2 versions'))
	  .pipe(minifyCSS())
	  .pipe(gulp.dest('./build/styles/'));
});

 // JS concat, strip debugging and minify
 gulp.task('scripts', function() {
   gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
     .pipe(concat('script.js'))
     .pipe(stripDebug())
     .pipe(uglify())
     .pipe(gulp.dest('./build/scripts/'));
 });