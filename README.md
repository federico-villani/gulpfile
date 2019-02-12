# 👹 Gulpfile

#### ⚠️ legacy code 🤷

A simple gulpfile with some utils, ready to be shared across different projects

## How to install gulp.js and how to use it
please refer to gulp installation

[Gulp Installation Guide](https://gulpjs.com/docs/en/getting-started/quick-start)

## What you get
In this gulpfile you'll find 
- SASS ( with autoprefixer, sourcemaps, media query combination and optimization, minification and concatenation in DEV and PROD version)
- image optimization
- js hint
- js minification and concatenation
- BrowserSync
  
```tsx
  // include gulp
  var gulp = require('gulp');
  
  // include plug-ins
  // SASS and SASS Utils
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefix = require('gulp-autoprefixer');
  var minifyCSS = require('gulp-minify-css');
  var concat = require('gulp-concat');
  var stripDebug = require('gulp-strip-debug');
  var uglify = require('gulp-uglify');
  var combineMq = require('gulp-combine-mq');
  // Image optimization
  var imagemin = require('gulp-imagemin');
  var imageop = require('gulp-image-optimization');
  // Utils
  var print = require('gulp-print');
  var count = require('gulp-count');
  var browserSync = require('browser-sync').create();
  
  'use strict';
  // browserSync task
  gulp.task('browser-sync', function() {
      browserSync.init({
          proxy: "localhost:8888/"
      });
  });
  
  
  gulp.task('images', function(cb) {
      gulp.src(['./images/**/*.png','./images/**/*.jpg','./images/**/*.gif','./images/**/*.jpeg']).pipe(imageop({
          optimizationLevel: 10,
          progressive: true,
          interlaced: true
      })).pipe(gulp.dest('./images-opt')).on('end', cb).on('error', cb);
  });
  
  gulp.task('sass', function () {
      gulp.src('./scss/**/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefix('last 10 versions'))
          .pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('./css'))
  });
  
  
  gulp.task('combineMq', function () {
      return gulp.src('./css/style.css')
          .pipe(combineMq({
              beautify: false
          }))
          .pipe(minifyCSS())
          .pipe(gulp.dest('./css/'));
  });
  
  
  gulp.task('minifyCSS', function() {
      return gulp.src('./css/style.css')
          .pipe(combineMq({
              beautify: false
          }))
          .pipe(minifyCSS())
          .pipe(gulp.dest('./css/prod/'))
  });
  
  gulp.task('sass:watch', function () {
      gulp.watch('./scss/**/*.scss', ['sass']);
  });
  
  gulp.task('sass:watch:minify', function () {
      gulp.watch('./css/style.css', ['minifyCSS']);
  });
  
  gulp.task('compressJs', function() {
      return gulp.src('./js/**/*.js')
      // .pipe(concat('main.min.js'))
          .pipe(uglify({
              mangle:false
          }))
          .pipe(gulp.dest('./js/prod/'));
  });
  
  gulp.task('createProdJS', function () {
      var paths = [
          //List below all the js you want to include in the prod version
          'js/vendor/jquery.min.js',
          'js/main.js'
      ];
      console.log('Following files and dirs will be included (Total %s): ', paths.length);
      return gulp.src(paths, {base: './js'})
          .pipe(count('## assets selected'))
          .pipe(print())
          .pipe(concat('main.min.js'))
          .pipe(uglify({
              mangle:false
          }))
          .pipe(gulp.dest('./js/minified/'));
  
  });
  
  gulp.task('createProdCSS', function () {
      var paths = [
          //List below all the css you want to include in the prod version
          // 'bootstrap/dist/css/bootstrap-theme.css',
          // 'bootstrap/dist/css/bootstrap.css',
          // 'css/style.css'
      ];
      // console.log('Following files and dirs will be included (Total %s): ', paths.length);
      return gulp.src(paths, {base: './css'})
          // .pipe(count('## assets selected'))
          // .pipe(print())
          .pipe(concat('style.min.css'))
          .pipe(minifyCSS())
          .pipe(gulp.dest('./css/'));
  
  });
  
  gulp.task('scripts:watch:compress', function () {
      gulp.watch('./js/main.js', ['compressJs']);
  });
  
  
  // JS concat, strip debugging and minify
  gulp.task('processJs', function() {
      return gulp.src('./js/**/*.js')
          .pipe(concat('main.min.js'))
          .pipe(uglify({
              mangle:false
          }))
          .pipe(gulp.dest('./js/min/'));
  });
  
  gulp.task('default', [
          'sass',
          'minifyCSS',
          'compressJs',
          'sass:watch',
          'scripts:watch',
          'scripts:watch:compress',
          'sass:watch:minify'
      ]
  );
  // decomment the line below to activate gulp extension in chrome inspector
  // module.exports = gulp;

```

