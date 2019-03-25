const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');


//Copying from app to build
function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
    'app/**/*.css',
    'app/**/*.js'
  ])
  .pipe(rename({prefix: 'proBuild.'}))
  .pipe(gulp.dest('build'));
}

//Testing gulp
function main(done) {
  console.log('Congratulation, your test passed!');
  done();
}
gulp.task('default', main);

//Html task
function html(done) {
  console.log('Assume something is really cooking here.');
  done();
}
gulp.task('html', html);

//Css task
function styles(done) {
  gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport(), simpleVars(),nested(),autoprefixer()]))
    .pipe(gulp.dest('./app/temp/styles '));
  done();
}
gulp.task('styles', styles);

//Watch file changes
function watchFiles(done) {
  watch('./app/index.html', gulp.series(html));
  watch('./app/assets/styles/**/*.css', gulp.series(styles));
  done();
}
gulp.task('watch', watchFiles);
 

 

//Browser sync function
function serve() {
    return browserSync.init({
      server: 'build',
      open: false,
      port: 3000
    });
  }


gulp.task('buildAndServe', gulp.series(copy, serve));













// gulp.task('html', function(done){
//     console.log('Imagine somethin fun happening to my html task');
//     done();
// });

// gulp.task('watch', function(done) {
//     watch('./app/index.html', function() {
//         gulp.series('html');
//     });
//     done();
// });

// function html(done) {
//     console.log('Imagine I\'ve solved it!');
//     done();
// }

// function functionOne(done){
//     console.log("Hurray, I succesfully created a gulp task!");
//     done();
// }

// function functionTwo(done){
//     console.log("Testing out the 2nd function!");
//     done();
// }

// function watch_files(done) {
//     watch('./app/index.html', function() {
//         gulp.parallel('html');
//     });
//     done();
// }

// gulp.task('html', html);
// gulp.task('functionOne', functionOne);
// gulp.task('functionTwo', functionTwo);
// gulp.task('watch_files', watch_files);

// gulp.task('watch', gulp.parallel(functionOne, functionTwo, watch_files));

gulp.task('default', function(){
    console.log("Hurray, I succesfully created a gulp task!");
}); //comments
