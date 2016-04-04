var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src('./md/*.md')
    .pipe(concat('concat.md'))
    .pipe(gulp.dest('./md_concat/'));
});

gulp.task('watch', function(){
  gulp.watch('./md/*.md', ['concat']);
});