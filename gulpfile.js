var gulp = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var watch = require('gulp-watch');
var glob = require('glob');
var batch = require('gulp-batch');

gulp.task('default', function() {
  glob("./js/**/*.js", function(er, files) {
    console.log(files);
    return browserify({ entries: files })
      .bundle()
      .on('error', function(err) {
        console.log(err.toString());
        this.emit('end');
      })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./public/'));
  });
});

gulp.task('watch', function () {
    watch('./js/**/*.js', batch(function (events, done) {
      try {
        gulp.start('default', done);
      }
      catch(ex) {
        console.log(ex);
      }
    }));
});
