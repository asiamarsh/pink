const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require("gulp-plumber");
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('less', () => gulp.src('src/style/main.less')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
  .pipe(sourcemaps.write())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('src/style/css'))
  .pipe(browserSync.reload({ stream: true }))
);

gulp.task('browser-sync', () => browserSync({
  server: {
    baseDir: 'src/'
  },
}));

gulp.task('watch', ['browser-sync', 'less'], () => {
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/style/**/*.less', ['less']);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', () => del.sync('dist'));
  
gulp.task('build', ['clean', 'less'], () => {
  const buildHtml = gulp.src('src/*.html').pipe(gulp.dest('dist'));

  const buildCss = gulp.src('src/css/main.min.css').pipe(gulp.dest('dist/css'));

  const buildFonts = gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  const buildImg = gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));

  const buildJs = gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['watch']);
