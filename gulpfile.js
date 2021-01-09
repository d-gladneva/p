const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

const cssFiles = [
  /** Глобальные */
  './src/static/css/global.css',
  /** Основные блоки */
  './src/static/css/header.css',
  './src/static/css/main.css',
  './src/static/css/footer.css',
  /** Компоненты */
  './src/static/css/counter.css',
  './src/static/css/navigation.css',
  './src/static/css/cart.css',
  './src/static/css/slider.css',
  './src/static/css/products.css',
  /** Модули */
  './src/static/css/modal.css',
  './src/static/css/order.css',
  './src/static/css/tooltip.css',
  './src/static/css/up_button.css'
];

const jsFiles = [
  /** Глобальные */
  './src/constants.js',
  /** Сторы */
  './src/stores/BannerStore.js',
  './src/stores/CartStore.js',
  './src/stores/CategoryStore.js',
  './src/stores/ProductStore.js',
  './src/stores/index.js',
  /** Контролеры */
  './src/controllers/productController.js',
  './src/controllers/modalController.js',
  './src/controllers/tooltipController.js',
  './src/controllers/sliderController.js',
  './src/controllers/cartController.js',
  './src/controllers/upButtonController.js',
  './src/controllers/navigationScrollController.js',
  './src/controllers/burgerMenuController.js'
];

const imageFiles = ['./src/static/images/**/*'];

const iconFiles = ['./src/static/icons/*'];

const modelFiles = ['./src/models/*', '!./src/models/*.js'];

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(
      autoprefixer({
        browsers: ['>0.1%'],
        cascade: false
      })
    )
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(gulp.dest('./public/static/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat('bundle.js'))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(
      uglify({
        toplevel: true
      })
    )
    .pipe(gulp.dest('./public/controllers'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src(imageFiles)
    .pipe(gulp.dest('./public/static/images'))
    .pipe(browserSync.stream());
}

function icons() {
  return gulp
    .src(iconFiles)
    .pipe(gulp.dest('./public/static/icons'))
    .pipe(browserSync.stream());
}

function models() {
  return gulp
    .src(modelFiles)
    .pipe(gulp.dest('./public/models/'))
    .pipe(browserSync.stream());
}

function clean() {
  return del(['public/*']);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    ui: {
      port: 5080
    },
    port: 5000
  });
  gulp.watch('./src/static/css/**/*css', styles);
  gulp.watch('./src/controllers/**/*js', scripts);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);

gulp.task(
  'build',
  gulp.series(clean, gulp.parallel(styles, scripts, images, icons, models))
);
gulp.task('dev', gulp.series('build', 'watch'));
