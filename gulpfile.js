var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

gulp.task('concat', function() {
  return gulp.src('./md/*.md')
    .pipe(concat('concat.md'))
    .pipe(gulp.dest('./md_concat/'));
});

gulp.task('sass', function() {
  return sass('./scss/index.scss', { style: 'expanded' })
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch('./md/*.md', ['concat']);
  gulp.watch('./scss/*.scss', ['sass']);
});