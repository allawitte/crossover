'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat');

var lib = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'vendor/md5.js'
];

gulp.task('css', function(){
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./client'))
});

gulp.task('js', function () {
    gulp.src(lib)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./client'));

    gulp.src(['client/js/index.js', 'client/js/**/*.js', 'client/directives/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./client'));
});

gulp.task('css', function(){
    gulp.src(['client/css/*.css', 'client/directives/**/*.css'])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./client/css'))
});
gulp.task('watch', function () {
    gulp.watch([
        './client/js/*.js', './client/js/controllers/*.js', 'client/directives/**/*.js'
    ],['js']);

    gulp.watch([
        './client/css/style.js', './client/directives/**/*.css'
    ]);
});

gulp.task('default', ['js', 'css']);
/**
 * Created by HP on 1/8/2018.
 */
