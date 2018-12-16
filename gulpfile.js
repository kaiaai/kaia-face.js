const gulp = require('gulp');
const jshint = require('gulp-jshint');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
//const uglify = require('gulp-uglify-es').default;
const uglify = require('gulp-uglify');
//const uglify = require('gulp-minify');
const concat = require('gulp-concat');
const umd = require('gulp-umd');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
//const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-js-base64-inject');

const LIB_NAME = 'kaia-face.js';
const UMD_EXPORTS = 'Face';
const UMD_NAMESPACE = UMD_EXPORTS;
const SRC_DIR = 'src/';
const SRC_JS_DIR = SRC_DIR + 'js/';
const IMG_DIR = 'img/';
const SRC_JS = [SRC_JS_DIR + 'helpers.js', SRC_JS_DIR + 'animationModule.js',
  SRC_JS_DIR + 'animationEffectModule.js', SRC_JS_DIR + 'main.js',
  SRC_JS_DIR + 'user_api.js', SRC_JS_DIR + 'expression.js',
  SRC_JS_DIR + 'expressionElement.js'];
const DIST_DIR = 'dist/';
const BUNDLE_DIR = 'bundle/';
const BASE64_DIR = 'base64/';

gulp.task('default', ['minify']);

gulp.task('base64', ['concat', 'imagemin'], () => {
  gulp.src(BUNDLE_DIR + LIB_NAME)
  .pipe(inject({
    basepath: BUNDLE_DIR + 'img/',
    pattern: /['"]\/uploads\/oomwoo\/face\/img\/([a-zA-Z0-9\-_.\\/]+)['"]/g
    //pattern: /['"]([a-zA-Z0-9\-_\\/]+.png)['"]/g
    //debug: true
  }))
  .pipe(gulp.dest(BASE64_DIR));
});

gulp.task('imagemin', ['clean'], () =>
  gulp.src(SRC_DIR + IMG_DIR + '**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(BUNDLE_DIR + IMG_DIR))
);

gulp.task('watch', () => {
  watch(SRC_JS, batch((events, done) => {
    gulp.start('default', done);
  }));
});

gulp.task('clean', () => {
  gulp.src([DIST_DIR, BUNDLE_DIR, BASE64_DIR], {read: false})
  .pipe(clean())
});

gulp.task('umd', [], () => {
//gulp.task('umd', ['jshint-base64'], () => {
  gulp.src(BASE64_DIR + LIB_NAME)
//    .pipe(babel({ presets: ['es2015'] }))
  .pipe(plumber())
  .pipe(umd({
    namespace: () => UMD_NAMESPACE,
    exports: () => UMD_EXPORTS,
  }))
  .pipe(gulp.dest(DIST_DIR));
});

gulp.task('jshint-src', ['clean'], () => {
  gulp.src(SRC_JS)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-bundle', ['concat'], () => {
  gulp.src(BUNDLE_DIR + LIB_NAME)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-base64', ['base64'], () => {
  gulp.src(BASE64_DIR + LIB_NAME)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

gulp.task('jshint-umd', ['umd'], () => {
  gulp.src(DIST_DIR + LIB_NAME)
  .pipe(plumber())
//  .pipe(babel({ presets: ['es2015'] }))
  .pipe(jshint({ esversion: 6 })) // { esversion: 6 }
  .pipe(jshint.reporter('default'));
});

//gulp.task('minify', ['umd'], () => {
gulp.task('minify', [], () => {
  gulp.src(DIST_DIR + LIB_NAME)
  .pipe(uglify())
  .pipe(rename((path) => {
    path.basename += '.min';
  }))
  .pipe(gulp.dest(DIST_DIR))
});

gulp.task('changed', () => {
  gulp.src(SRC_JS)
  .pipe(changed(DIST_DIR))
  .pipe(gulp.dest(DIST_DIR))
});

gulp.task('concat', ['clean'], () => {
  gulp.src(SRC_JS)
  .pipe(concat(LIB_NAME))
  .pipe(gulp.dest(BUNDLE_DIR))
});
