console.time("Loading plugins"); //start measuring

var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins({

  pattern: ['gulp-*', 'gulp.*', 'del'],
  rename: {
    'gulp-html-replace': 'htmlreplace',
    'gulp-file-include': 'fileinclude',
    'gulp-dart-sass': 'sass',
    'gulp-clean-css': 'cleancss',
    'gulp-js-import': 'jsImport'
  }
});

var imagemin = require('gulp-imagemin');
var   jshint = require('gulp-jshint');
const { css } = require('jquery');
var themepath= "wp-content/themes/yhunter-4/";

console.timeEnd("Loading plugins"); //end measuring

function lint() {
  return gulp.src('src/js/*.*')
    .pipe(plugins.jshint({esversion: 6}))
    .pipe(plugins.jshint.reporter('default'));
}

exports.lint = lint;

function jsFunc() {
    //plugins.del('build/'+themepath+'/js/*.*');

    return gulp.src('src/js/main.js')  
       .pipe(plugins.jsImport({hideConsole: true}))        
       .pipe(plugins.babel({
            presets: ['@babel/env']
        }))         
       .pipe(plugins.uglify())
       //.pipe(plugins.concat('main.js'))
       .pipe(gulp.dest('build/'+themepath+'/js'));
}

exports.js = jsFunc;

function jQueryFunc() {
  return gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('build/'+themepath+'/js/vendor'));
}

exports.jquery = jQueryFunc;

gulp.task('jslib', function() {
    return gulp.src('src/js/vendor/*.js')
       .pipe(gulp.dest('build/'+themepath+'/js/vendor'));
});

function mainFunc() {
    const outputPath = 'build/'+themepath+'/css';
    return gulp.src('src/css/main.scss')    
    .pipe(plugins.sass()) 
    .on('error', plugins.sass.logError)
    //.pipe(plugins.autoprefixer('last 2 version'))

    //.pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest(outputPath))
    //.pipe(plugins.copy("../", { prefix: 'full' }))
    //.pipe(plugins.rename({suffix: ".min"}))
    .pipe(plugins.notify({ message: 'Main SASS styles task complete' }));
}

exports.main = mainFunc;



const miniCss = gulp.series(mainFunc, cssMin);

gulp.task('cssMin', miniCss);

function cssMin() {
  return gulp.src('build/'+themepath+'/css/main.css')
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(plugins.cleancss()) //Minify external CSS
    .pipe(gulp.dest('build/'+themepath+'/css'));
}

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
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/'+themepath+'/img'))
    .pipe(plugins.notify({ message: 'Images task complete' }));
}

exports.images = imagesFunc;

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
    .pipe(plugins.notify({ message: 'Html task complete' }));

     

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
        .pipe(plugins.livereload());
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

const tools = gulp.series(inlineFunc, mainFunc, cssMin);
const template = gulp.series(htmlFunc, themeFunc);

exports.tools = tools;


function style() {
  return gulp.src(['./style.css'])
  .pipe(gulp.dest('build/'+themepath));
}

exports.style = style;


gulp.task('init',async function(){

  inlineFunc();
  miniCss();
  iconsFunc();
  svgSingle();
  ttfFunc();
  jsFunc();
  jQueryFunc();
  imagesFunc();  
  template();
  style();
  
  return console.log('Gulp init is running...');  
});



function watchFunc() {
    gulp.watch("src/css/**/*.scss", tools);
    gulp.watch("src/css/inline.scss", inlineFunc);
    gulp.watch("src/css/main.scss", cssMin);
    gulp.watch("src/svg/symbol/*.svg", iconsFunc);
    gulp.watch("src/svg/*.svg", svgSingle);
    gulp.watch("src/fonts/*.ttf", ttfFunc);
    gulp.watch("src/js/*.js", lint);
    gulp.watch("src/js/*.js", jsFunc);
    gulp.watch("src/img/*.+(jpg|jpeg|gif|png)", imagesFunc);
    gulp.watch("src/*.html", template);
    plugins.livereload.listen();
    //gulp.watch(['build/**']).on('change', plugins.livereload.changed);
}

exports.watch = watchFunc;
