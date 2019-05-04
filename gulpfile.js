const gulp = require('gulp')
const pug = require('gulp-pug')
const styleInject = require('gulp-style-inject')
const cleanCSS = require('gulp-clean-css')
const htmlImg64 = require('gulp-html-img64')
const browserSync = require('browser-sync')

const css = (done) => {
  gulp
    .src('./css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('tmp'))
  console.log('css')
  done()
}

const html = (done) => {
  gulp
    .src('./index.pug')
    .pipe(pug())
    .pipe(htmlImg64())
    .pipe(styleInject())
    .pipe(gulp.dest('dist'))
  console.log('html')
  done()
}

const assets = (done) => {
  gulp.src('./icon/*.png').pipe(gulp.dest('./dist/icon')),
  gulp.src('./icon/*.ico').pipe(gulp.dest('./dist'))
  console.log('assets')
  done()
}

const html_css = gulp.series(css, html)

const start_browersync = (done) => {
  browserSync.init({
    server: { baseDir: "./dist" }
  })
  done()
}

const reload = (done) => {
  browserSync.reload()
  done()
}


const end = (done) => {
  console.log('end')
  done()
}

gulp.task('default', gulp.series(
  gulp.parallel(html_css, assets), end))


gulp.task('dev', gulp.series(
  'default',
  start_browersync,
  gulp.parallel(
    () => gulp.watch('./index.pug', gulp.series(html_css, reload)),
    () => gulp.watch('./css/*.css', gulp.series(html_css, reload)),
    () => gulp.watch('./icon/*.*', gulp.series(assets, reload)),
  ),
  end
))
