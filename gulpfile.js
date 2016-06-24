/**
 * Created by arjunMitraReddy on 6/23/2016.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var wiredep = require('wiredep').stream;


gulp.task('wire-dep', function () {
    console.log('Injecting Bower JS, CSS files and Application JS files');

    var bower = {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
    };

    var injectJsFiles = [
        'client/**/*.module.js',
        'client/' + '**/*.js'
    ];

    return gulp
        .src('client/index.html')
        .pipe(wiredep({
            bowerJson: bower.json,
            directory: bower.directory,
            ignorePath: bower.ignorePath
        }))
        .pipe($.inject(gulp.src(injectJsFiles)))
        .pipe($.inject(gulp.src('client/style.css')))
        .pipe(gulp.dest('client'));

});