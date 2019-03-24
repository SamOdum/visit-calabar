const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

//Copying from app to build
function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
    'app/**/*.css',
    'app/**/*.js'
  ])
  .pipe(gulp.dest('build'));
}


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