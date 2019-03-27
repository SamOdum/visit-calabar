const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const simpleVars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const presetEnv = require('postcss-preset-env');
const sourcemaps = require('gulp-sourcemaps');
const prettyHtml = require('gulp-pretty-html');



const styleSrc = 'app/assets/styles/style.sass';
const styleDest = './app/build/styles/';
const styleWatch = 'app/assets/styles/**/*.sass';


const htmlWatch = './app/index.html';


const jsSrc = 'app/assets/js/script.js';
const jsDest = './app/build/js/';
const jsWatch = 'app/assets/js/**/*.js';


const reload = browserSync.reload;
  


/**CSS tasks compilation ========================== */
function style(done) {
  gulp.src(styleSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(styleDest))
    .pipe(browserSync.stream());
  done();
}
gulp.task('style', style);


function htmlAction(done) {
  gulp.watch(htmlWatch, reload);
  done();
}
gulp.task('htmlAction', htmlAction);


/**JS tasks compilation =========================== */
function jsAction(done) {
  gulp.src(jsSrc)
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.stream());
  done();
}
gulp.task('jsAction', jsAction);


/**Default task =================================== */
let doTheseTasks = ['style', 'jsAction'];
gulp.task('default', gulp.parallel(style, jsAction));



/**Browser sync =================================== */
function browserssync(done) {
  browserSync.init({
    server:{
      baseDir:'./app'
    }
  });
  done();
}
gulp.task('browserssync', browserssync);

/**Watch function & task ========================== */
function watchFiles(done) {
  gulp.watch(styleWatch, style);
  gulp.watch(jsWatch, gulp.series(jsAction,reload));
  gulp.watch(htmlWatch, gulp.series(reload));
  done();
}
gulp.task('watch',gulp.series(watchFiles, browserssync));