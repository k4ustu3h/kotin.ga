let babel = require("gulp-babel");
let browserify = require("browserify");
let cssnano = require("cssnano");
let del = require("del");
let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let postcss = require("gulp-postcss");
let source = require("vinyl-source-stream");
let uglify = require("gulp-uglify");
let zip = require("gulp-zip");
const compress = () =>
  gulp
    .src("dist/*")
    .pipe(zip("package.zip"))
    .pipe(gulp.dest("dist"));
const pre_js = () =>
  gulp
    .src([
      "src/assets/js/head.js",
      "src/assets/js/index.js",
      "src/assets/js/manage.js"
    ])
    .pipe(
      babel({
        plugins: ["@babel/transform-runtime"],
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulp.dest("comp"));
const m_html = () =>
  gulp
    .src([
      "src/404.html",
      "src/index.html",
      "src/manage.html",
      "src/offline.html"
    ])
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest("dist"));
const m_css = () => {
  const plugins = [cssnano()];
  return gulp
    .src("src/assets/css/*")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/assets/css/"));
};
const m_js = () =>
  gulp
    .src(["comp/head.js", "comp/index.js", "comp/manage.js"])
    .pipe(
      uglify({
        compress: {
          unused: false
        }
      })
    )
    .pipe(gulp.dest("dist/assets/js/"));
const copy_extras = () =>
  gulp
    .src(
      ["src/assets/images*", "src/assets/js/darkmode.js", "src/manifest.json"],
      {
        base: "src"
      }
    )
    .pipe(gulp.dest("dist"));
const clean = () => del(["./comp"]);
const bundleindex = () =>
  browserify(["dist/assets/js/index.js"])
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist/assets/js"));
const bundlemanage = () =>
  browserify(["dist/assets/js/manage.js"])
    .bundle()
    .pipe(source("manage.js"))
    .pipe(gulp.dest("dist/assets/js"));
gulp.task("html", m_html);
gulp.task("css", m_css);
gulp.task("js", m_js);
gulp.task("pre_js", pre_js);
gulp.task("clean", clean);
gulp.task("copy_extras", copy_extras);
gulp.task("compress", compress);
gulp.task("bundleindex", bundleindex);
gulp.task("bundlemanage", bundlemanage);
gulp.task(
  "build",
  gulp.series(
    "html",
    "css",
    "pre_js",
    "js",
    "bundleindex",
    "bundlemanage",
    "copy_extras",
    "clean"
  )
);
gulp.task("packit", gulp.series("build", "compress"));
