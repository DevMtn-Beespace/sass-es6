var gulp = require('gulp');
var concat = require('gulp-concat'); // to put everything in one file
var sass = require('gulp-sass'); // compiles sass
var babel = require('gulp-babel'); // es6 to es5 compiling
var plumber = require('gulp-plumber'); // gives error messages for debugging

var paths = {
  scssSource: './demonstration/styles/**/*.scss', // wildcards
  scssDest: './demonstration/compiled/styles',
  jsSource: './demonstration/js/**/*.js', // wildcards
  jsDest: './demonstration/compiled/js'
};

gulp.task('styles', function() {
  return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError)) // .pipe is like next, it's just the next thing to run
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('frontjs', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest(paths.jsDest));
});

gulp.task('watch', function()  {
  gulp.watch(paths.jsSource, ['frontjs']);
  gulp.watch(paths.scssSource, ['styles']);
});

gulp.task('default', ['watch', 'frontjs', 'styles']); // just type gulp in terminal and it will run all these tasks.
