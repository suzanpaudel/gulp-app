const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

// dummy gulp task
gulp.task('message', async function () {
  return console.log('Gulp running');
});

//  copy files
gulp.task('copyhtml', function () {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

//  minify image
gulp.task('imagemin', function () {
  return gulp
    .src('src/img/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

//  minify javascript
gulp.task('minifyjs', function () {
  return gulp.src('src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'));
});

//  concat javascript
gulp.task('scripts', function () {
  return gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

//  compile sass
gulp.task('sass', function () {
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('compilesass', function () {
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});
gulp.task('serve', function () {
  browserSync.init({
    server: './dist',
  });

  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/img', gulp.series('imagemin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyhtml'));
});

gulp.task(
  'watch',
  gulp.series('scripts', 'imagemin', 'sass', 'copyhtml', 'serve')
);
