var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var babelify = require('babelify');
var stringify = require('stringify');
var ngAnnotatify = require('browserify-ngannotate');
var watchify = require('watchify');
var path = require('path');
var source = require('vinyl-source-stream');
var exorcist   = require('exorcist');
var WindowsToaster = require('node-notifier').WindowsToaster;
var notifier = new WindowsToaster({
  withFallback: true
});

var mapfile = path.join(__dirname, 'wwwroot/js', 'app.js.map');

gulp.task('vendor:fonts', function() {
  var src = [
    'node_modules/bootstrap/fonts/*',
    'node_modules/font-awesome/fonts/*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest('wwwroot/fonts'));
});


gulp.task('vendor:css', ['vendor:fonts'], function () {
  var src = [
    'node_modules/animate.css/animate.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/angular-toastr/dist/angular-toastr.css',
    'node_modules/select2/dist/css/select2.css',
    'node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css'
  ];

  return gulp.src(src)
    .pipe(lp.concat('vendor.css'))
    .pipe(gulp.dest("wwwroot/css"));
});

gulp.task('build:css', function () {

  // pipe the target file to the
  var mainFile = ["client/app.scss"];
  var imports = [
    "!" + mainFile[0],
    'client/**/*.scss'
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

  watchify(browserify(path.join("./client", "App.js"), args), args)
    .transform(stringify([".html"]))
    .transform(babelify)
    .transform(ngAnnotatify)
    .bundle()
    .on('error', function(err){
      console.error(err.message);
      notifier.notify({
        title: "angular-browserify build:css",
        message: err.message,
        icon: path.join(__dirname,'.things/icons/browserify.png')
      });
      done();
    })
    .pipe(exorcist(mapfile))
    .pipe(source("app.js"))
    .pipe(gulp.dest("./wwwroot/js"))
    .pipe(lp.livereload()).on('end', function(){
    notifier.notify({
      title: "angular-browserify build:css",
      message: "Browserify finished",
      icon: path.join(__dirname,'.things/icons/browserify.png')
    });
    done();
  });
});

gulp.task('default', ['vendor:css', 'build:css', 'build:js'], function () {
  lp.livereload({
    start: true
  });
  gulp.watch(['client/**/*.js', 'client/**/*.html'], ["build:js"]);
  gulp.watch('client/**/*.scss', ["build:css"]);
});

