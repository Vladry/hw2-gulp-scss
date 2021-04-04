// видео по созданию gulpfile.js   https://www.youtube.com/watch?v=stFOy0Noahg
const
    gulp = require('gulp'), //  create a gulpfile:   https://gulpjs.com/docs/en/getting-started/quick-start
    sass = require('gulp-sass'),
    scss = require('gulp-scss'), // !его нет в списке спецификации для работы с gulp-sourcemaps
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'), //plugin to minify CSS: https://www.npmjs.com/package/gulp-clean-css
    clean = require('gulp-clean'), // удаляет указанные папки и файлы
    uglify = require('gulp-uglify'),  // укорачивает человеко-читаемые имена функциий, переменных и т.д:  https://www.npmjs.com/package/gulp-uglify
    jsMinify = require('gulp-js-minify'), // убирает все пробелы из кода
    soursemaps = require('gulp-sourcemaps'), // https://www.npmjs.com/package/gulp-sourcemaps
    autoprefixer = require('gulp-autoprefixer'), //  https://www.npmjs.com/package/gulp-autoprefixer
    browserSync = require('browser-sync').create(); // https://webref.ru/dev/gulp-for-beginners/live-reloading-with-browser-sync
    sass.compiler = require('node-sass');

const project_folder = 'dist';
const source_folder = 'src';

const path = {
    html: './index.html',
    build: {
        value: `./${project_folder}/`,
        img: `./${project_folder}/img/`,
        fonts: `./${project_folder}/fonts/`
    },
    src: {
        value: `./${source_folder}/`,
        img: `./${source_folder}/img/**/*`,
        fonts: `./${source_folder}/fonts/**/*`,
        scss: `./${source_folder}/scss/`,
        js:  `./${source_folder}/js/**/*`

    }
};

const cleanAll = () => (
    gulp.src(`${path.build.value}**/*`)
        .pipe(clean())
);

const buildCSS = () => (
    gulp.src(`${path.src.scss}main.scss`)
        .pipe(soursemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({cascade: false}))
        // .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(soursemaps.write('.'))
        .pipe(gulp.dest(path.build.value))
        .pipe(browserSync.stream({stream:true}))
);

const buildJS = () => (
    gulp.src(path.src.js)
        .pipe(concat('scripts.min.js'))
        .pipe(jsMinify())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.value))
        .pipe(browserSync.stream({stream: true}))
);

const buildIMG = () => (
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
);

const buildFonts = () => (
    gulp.src(path.src.fonts)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.fonts))
);

gulp.task('clean', cleanAll);
gulp.task('buildCSS', buildCSS);
gulp.task('buildJS', buildJS);
gulp.task('buildIMG', buildIMG);
gulp.task('buildFonts', buildFonts);

const build = gulp.series(cleanAll, gulp.parallel(buildJS, buildCSS, buildIMG, buildFonts));
gulp.task('default', build);


const dev =()=> {
    //  https://webref.ru/dev/gulp-for-beginners/live-reloading-with-browser-sync
        browserSync.init({     // запуск сервера
            server: {
                baseDir: './'
            },
        });
    gulp.watch(`${path.src.scss}**/*`, buildCSS).on('change', browserSync.reload);
    gulp.watch(path.src.js, buildJS).on('change', browserSync.reload);
    gulp.watch(path.html).on('change', browserSync.reload);
};
gulp.task('dev', dev);
