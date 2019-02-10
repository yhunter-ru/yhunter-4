console.time("Loading plugins"); //start measuring

var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins({

  pattern: ['gulp-*', 'gulp.*', 'del'],
  rename: {
    'gulp-html-replace': 'htmlreplace',
    'gulp-file-include': 'fileinclude',
    'gulp-sass': 'sass',
    'gulp-clean-css': 'cleancss'
  }



});


var   jshint = require('gulp-jshint');
var themepath= "wp-content/themes/yhunter4/";

console.timeEnd("Loading plugins"); //end measuring

function jsFunc() {
    plugins.del('build/'+themepath+'/js/*.*');

    return gulp.src('src/js/*.js')
       .pipe(plugins.jshint())
       .pipe(plugins.jshint.reporter('default'))
       .pipe(plugins.uglify())
       .pipe(plugins.concat('main.js'))
       .pipe(gulp.dest('build/'+themepath+'/js'));
}

exports.js = jsFunc;

gulp.task('jslib', function() {
    return gulp.src('src/js/vendor/*.js')
       .pipe(gulp.dest('build/'+themepath+'/js/vendor'));
});

function mainFunc() {
    return gulp.src('src/css/main.scss')    
    .pipe(plugins.sass()) 
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //.pipe(plugins.cleancss()) //Minify external CSS
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest('build/'+themepath+'/css'))
    .pipe(plugins.notify({ message: 'Main SASS styles task complete' }));
}

exports.main = mainFunc;

function inlineFunc() { 
    return gulp.src('src/css/inline.scss')       
    .pipe(plugins.sass())    
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.cleancss())
    .pipe(plugins.rename("_inline.html"))
    .pipe(gulp.dest('src'))
    .pipe(plugins.notify({ message: 'Inline SASS styles task complete' }));

   
}

exports.inline = inlineFunc;






function imagesFunc() {
  plugins.del('build/'+themepath+'/img/*.+(jpg|jpeg|gif|png)');
  return gulp.src('src/img/*.+(jpg|jpeg|gif|png)')
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/'+themepath+'/img'))
    .pipe(plugins.notify({ message: 'Images task complete' }));
}

exports.js = jsFunc;

function htmlFunc() {
    plugins.del('build/*.html');
    return gulp

    .src('src/*.html')

    .pipe(plugins.htmlreplace({theme: ''}, {keepUnassigned: true}))
    //.pipe(plugins.pagebuilder('src'))
    .pipe(plugins.fileinclude({
          prefix: '@@',
          basepath: '@file'
    }))
    .pipe(plugins.replace('@@hash', Math.random()))
    .pipe(plugins.replace('@@path/', themepath))
        
    .pipe(plugins.htmlreplace({theme: ''}, {keepUnassigned: true}))
        
    .pipe(gulp.dest('build/'))
    .pipe(plugins.notify({ message: 'Html task complete' }))

     

}


//gulp.task('html', htmlFunc(dn));

exports.html = htmlFunc;


function themeFunc () {
    plugins.del('build/'+themepath+'/*.php');
    return gulp
        .src('src/*.html')
        
        //.pipe(plugins.rigger())
        .pipe(plugins.htmlreplace({html: ''}, {keepUnassigned: true}))
        .pipe(plugins.replace('"wp-content', '"/wp-content'))
        .pipe(plugins.replace('@@hash', Math.random()))
        .pipe(plugins.replace('@@path/', themepath))
        .pipe(plugins.rename({
            
            extname: ".php"
          }))
        .pipe(gulp.dest('build/'+themepath))
        .pipe(plugins.notify({ message: 'Template task complete' }))
}

exports.theme = themeFunc;

// SVG sprite create

function iconsFunc() {
  return gulp.src('src/svg/symbol/*.svg')
    .pipe(plugins.svgmin())
    .pipe(plugins.svgstore({ fileName: 'symbol.html', inlineSvg: true}))
    .pipe(plugins.cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(plugins.rename({
            
            extname: ".html"
          }))
    .pipe(gulp.dest('src/'))
    
}

exports.icons = iconsFunc;


function svgSingle() {
    return gulp.src('src/svg/*.svg')
        .pipe(plugins.svgmin())
        .pipe(gulp.dest('build/'+themepath+'/img'));
};

exports.svgsingle = svgSingle;


    
function ttfFunc(){
  plugins.del('build/'+themepath+'/fonts/*.woff');
  return gulp.src(['src/fonts/*.ttf'])
    .pipe(plugins.ttf2woff())
    .pipe(gulp.dest('build/'+themepath+'/fonts'));
}

exports.ttf = ttfFunc;

const tools = gulp.series(inlineFunc, mainFunc);
const template = gulp.series(htmlFunc, themeFunc);

exports.tools = tools;

function watchFunc() {
    gulp.watch("src/css/**/*.scss", tools);
    gulp.watch("src/css/inline.scss", inlineFunc);
    gulp.watch("src/css/main.scss", mainFunc);
    gulp.watch("src/svg/symbol/*.svg", iconsFunc);
    gulp.watch("src/svg/*.svg", svgSingle);
    gulp.watch("src/fonts/*.ttf", ttfFunc);
    gulp.watch("src/js/*.js", jsFunc);
    gulp.watch("src/img/*.+(jpg|jpeg|gif|png)", imagesFunc);
    gulp.watch("src/*.html", template);
    plugins.livereload.listen();
    gulp.watch(['build/**']).on('change', plugins.livereload.changed);
}

exports.watch = watchFunc;


