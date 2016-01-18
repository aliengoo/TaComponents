"use strict";

import gulp from "gulp";

var lp = require("gulp-load-plugins")({
  lazy: true
});

import browserify from "browserify";
import watchify from "watchify";
import babelify from "babelify";

import path from 'path';
import source from 'vinyl-source-stream';
import exorcist from 'exorcist';

import {WindowsToaster} from 'node-notifier';

let notifier = new WindowsToaster({
  withFallback: true
});

var mapfile = path.join(__dirname, 'wwwroot/js', 'bundle.js.map');

gulp.task('vendor:fonts', () => {
  const src = [
    'node_modules/bootstrap/fonts/*',
    'node_modules/font-awesome/fonts/*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest('wwwroot/fonts'));
});

gulp.task('vendor:css', ['vendor:fonts'], () => {
  var src = [
    'node_modules/animate.css/animate.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/react-select/dist/react-select.css'
  ];

  return gulp.src(src)
    .pipe(lp.concat('vendor.css'))
    .pipe(gulp.dest("wwwroot/css"));
});

gulp.task('build:css', () => {

  // pipe the target file to the
  const mainFile = ["src/app.scss"];
  var imports = [
    "!" + mainFile[0],
    'src/**/*.scss'
  ];

  return gulp.src(mainFile)
    .pipe(lp.inject(gulp.src(imports, {read: false}), {
      relative: true,
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function (filePath) {
        return '@import "' + filePath + '";';
      }
    }))
    .pipe(lp.sass())
    .pipe(lp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest("wwwroot/css"))
    .pipe(lp.livereload());
});

gulp.task("build:js", function (done) {
  var args = watchify.args;
  args.extensions = ['.js'];
  args.debug = true;

  watchify(browserify(path.join("./src", "main.js"), args), args)
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.error(err.message);
      console.error(err.stack);
      notifier.notify({
        title: "build:js",
        message: err.message,
        icon: path.join(__dirname,'.things/icons/browserify.png')
      });
      done();
    })
    .pipe(exorcist(mapfile))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./wwwroot/js"))
    .pipe(lp.livereload()).on('end', () => {
    notifier.notify({
      title: "build:js",
      message: "Browserify finished",
      icon: path.join(__dirname,'.things/icons/browserify.png')
    });
    done();
  });
});

var watcher = () => {
  lp.livereload({
    start: true
  });
  gulp.watch(['src/**/*.js'], ["build:js"]);
  gulp.watch('src/**/*.scss', ["build:css"]);
};

gulp.task('default', ['vendor:css', 'build:css', 'build:js'], watcher);

gulp.task("build:js:watch", ["build:js"], watcher);
