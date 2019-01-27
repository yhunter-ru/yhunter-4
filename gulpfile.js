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
var themepath= "wp-content/themes/test/";

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


gulp.task('jslib', function() {
    return gulp.src('src/js/vendor/*.js')
       .pipe(gulp.dest('build/'+themepath+'/js/vendor'));
});

function mainFunc() {
    return  plugins.sass('src/css/main.scss')
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //.pipe(plugins.cleancss()) //Minify external CSS
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest('build/'+themepath+'/css'))
    .pipe(plugins.notify({ message: 'Main SASS styles task complete' }));
}

gulp.task('main', mainFunc);

function inlineFunc() {    

    return  plugins.sass('src/css/inline.scss')
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.cleancss())
    .pipe(plugins.rename("_inline.html"))
    .pipe(gulp.dest('src'))
    .pipe(plugins.notify({ message: 'Inline SASS styles task complete' }));
   
}

gulp.task('inline', inlineFunc);

function toolsFunc() {
  mainFunc();
  inlineFunc();
}

gulp.task('tools', toolsFunc);


function imagesFunc() {
  plugins.del('build/'+themepath+'/img/*.+(jpg|jpeg|gif|png)');
  return gulp.src('src/img/*.+(jpg|jpeg|gif|png)')
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/'+themepath+'/img'))
    .pipe(plugins.notify({ message: 'Images task complete' }));
}

function htmlFunc() {
    plugins.del('build/*.html');
    gulp.src('src/*.html')

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

gulp.task('html', htmlFunc);


function themeFunc () {
    plugins.del('build/'+themepath+'/*.php');
    gulp.src('src/*.html')
        
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


function svgSingle() {
    return gulp.src('src/svg/*.svg')
        .pipe(plugins.svgmin())
        .pipe(gulp.dest('build/'+themepath+'/img'));
};




    
function ttfFunc(){
  plugins.del('build/'+themepath+'/fonts/*.woff');
  gulp.src(['src/fonts/*.ttf'])
    .pipe(plugins.ttf2woff())
    .pipe(gulp.dest('build/'+themepath+'/fonts'));
}





gulp.task('watch', function watch() {



  gulp.watch('src/css/**/*.scss', function() {
    mainFunc();
    inlineFunc();
  } );

  gulp.watch('src/css/*.scss', function () {
    toolsFunc();
  });

  gulp.watch('src/svg/symbol/*.svg', function() {
    iconsFunc();
  });

  gulp.watch('src/svg/*.svg', function() {
    singSingle();
  });

  gulp.watch('src/fonts/*.ttf', function() {
    ttfFunc();
  });

  // Наблюдение .js файлами
  gulp.watch('src/js/*.js', function() {
    jsFunc();
  });

  // Наблюдение файлами изображений
  gulp.watch('src/img/*.+(jpg|jpeg|gif|png)',function() {
    imagesFunc();
  });

  gulp.watch('src/*.html', function() {
    htmlFunc();
    themeFunc();
  });

    // Создание LiveReload сервера
  plugins.livereload.listen();

  // Наблюдайте за всеми файлами в dist/, перезагружайтесь при изменениях
  gulp.watch(['build/**']).on('change', plugins.livereload.changed);

});
