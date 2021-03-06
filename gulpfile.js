'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    jscs = require('gulp-jscs'),
    testCommands = ['cd <%=file.path %>;npm install ../..;npm prune;npm install;npm run-script disc;npm test'];

gulp.task('smoke_test', function () {
    return gulp.src('examples/00hello/')
    .pipe(shell(testCommands));
});

gulp.task('example_tests', function () {
    return gulp.src('examples/*-*/')
    .pipe(shell(testCommands));
});

gulp.task('watch_document', ['build_document'], function () {
    return gulp.watch(['README.md', 'index.js', 'lib/*.js', 'extra/*.js'], ['build_document']);
});

gulp.task('build_document', shell.task('jsdoc -p README.md index.js lib/*.js extra/*.js -d documents'));

gulp.task('jscs', function () {
    gulp.src(['index.js', 'gulpfile.js', 'lib/*.js'])
    .pipe(jscs());
});
