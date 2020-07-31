const gulp = require("gulp");
const {
    src,
    series,
    parallel,
    dest,
    watch
} = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const htmlmin = require('gulp-htmlmin');
const browserSync = require("browser-sync").create();

function minifyHtml() {
    return src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
}

function imgTask() {
    return src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
}

function style () {
    return src("src/assets/scss/**/*.scss")
        .pipe(sass())
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

function check () {
    browserSync.init({
        server: {
            baseDir:"src"
        }
    });
    // Folders to watch
    gulp.watch("src/assets/scss/**/*.scss");
    gulp.watch("src/*.html").on("change", browserSync.reload);
    // gulp.watch("src/*.html").on("change",minifyHtml);
    gulp.watch("src/assets/js/**/*.js").on("change", browserSync.reload);
}

// function defaultTask (cb) {
//     console.log("Hello");
//     cb();
// }

exports.minifyHtml = minifyHtml;
exports.imgTask = imgTask;
exports.check = check;
// exports.default = parallel(task1, task2);
// Create a gulp watch task;
// Watches for changes & streams to browsers.
// Create gulp build task.
// Optim. all changes (min) (concat), ... 