const gulp = require('gulp')
const pug = require('gulp-pug')
const styleInject = require('gulp-style-inject')
const cleanCSS = require('gulp-clean-css')
const htmlImg64 = require('gulp-html-img64')

gulp.task('index', ['cleanCSS'], () =>
  gulp
    .src('./index.pug')
    .pipe(pug())
    .pipe(styleInject())
    .pipe(htmlImg64())
    .pipe(gulp.dest('dist'))
)

gulp.task('cleanCSS', () =>
  gulp
    .src('./css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('tmp'))
)

gulp.task('icons', () => {
  gulp.src('./icon/*.jpeg').pipe(gulp.dest('./dist/icon'))
  gulp.src('./icon/*.ico').pipe(gulp.dest('./dist'))
})

gulp.task('default', ['index', 'cleanCSS', 'icons'])

gulp.task('watch', () => {
  gulp.watch('./index.pug', ['index'])
  gulp.watch('./css/*.css', ['index', 'cleanCSS'])
})
