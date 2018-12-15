var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
//var uglify = require('gulp-uglify-es').default;
var uglify = require('gulp-uglify');
//var uglify = require('gulp-minify');
var concat = require('gulp-concat');
var umd = require('gulp-umd');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
//var babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-js-base64-inject');

const VER = '-0.1.0';
const LIB_NAME = 'kaia-face.js';
const SRC = './src/js/';
const SRCJS = [SRC+'helpers.js', SRC+'animationModule.js',
  SRC+'animationEffectModule.js', SRC+'main.js', SRC+'user_api.js',
  SRC+'expression.js', SRC+'expressionElement.js'];
const DIST = 'dist/';
const BUNDLE = 'bundle/';
const BASE64 = 'base64/';
//const IMG = 'img';
const JS = '*.js';

var SRC_JS = SRC + JS;
var DIST_JS = './' + DIST + JS;

gulp.task('default', ['minify']);

gulp.task('base64', ['concat', 'imagemin'], function() {
    return gulp.src(BUNDLE + LIB_NAME)
        .pipe(inject({
            basepath: BUNDLE + 'img/',
            pattern: /['"]\/uploads\/oomwoo\/face\/img\/([a-zA-Z0-9\-_.\\/]+)['"]/g
            //debug: true
        }))
        .pipe(gulp.dest(BASE64));
});

gulp.task('imagemin', ['clean'], () =>
	gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(BUNDLE + 'img'))
);

gulp.task('watch', function () {
    watch(SRC_JS, batch(function (events, done) {
        gulp.start('default', done);
    }));
});

gulp.task('clean', function () {
    return gulp.src([DIST, BUNDLE], {read: false})
      .pipe(clean())
});

gulp.task('umd', ['jshint-base64'], function() {
  return gulp.src(BASE64 + LIB_NAME)
//    .pipe(babel({ presets: ['es2015'] }))
    .pipe(plumber())
    .pipe(umd())
    .pipe(rename({
      suffix: VER,
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('jshint-src', ['clean'], function() {
  gulp.src(SRC_JS)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-bundle', ['concat'], function() {
  gulp.src(BUNDLE + LIB_NAME)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-base64', ['base64'], function() {
  gulp.src(BASE64 + LIB_NAME)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-dist', ['minify'], function() {
  gulp.src([DIST_JS, '!./' + DIST + '*.min.js'])
  .pipe(plumber())
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'));
});

gulp.task('minify', ['umd'], function() {
  return gulp.src([DIST_JS, '!' + DIST + '*.min.js'])
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += '.min';
   }))
  .pipe(gulp.dest(DIST))
});

gulp.task('changed', function() {
  return gulp.src(SRC_JS)
  .pipe(changed(DIST))
  .pipe(gulp.dest(DIST))
});

gulp.task('concat', ['clean'], function() {
  return gulp.src(SRCJS)
  .pipe(concat(LIB_NAME))
  .pipe(gulp.dest(BUNDLE))
});
