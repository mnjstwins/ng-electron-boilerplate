'use strict';

var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var runSequence = gulpHelpers.framework('run-sequence');
var usemin = require('gulp-usemin');
var less = require('gulp-less');
var electron = require('electron-prebuilt');
var childProcess = require('child_process');

var path = {
  sourceFolder: ['src/**/*.js'],
  outputFolder: 'dist/',
  indexFile: './src/index.html',
  mainFile: './src/main.js',
  manifestFile: './package.json',
  less: ['src/**/*.less']
};

var babelCompilerOptions = {
  optional: 'runtime'
};

taskMaker.defineTask('clean', {taskName: 'clean', src: path.outputFolder});
taskMaker.defineTask('babel', {taskName: 'babel', src: path.sourceFolder,
  dest: path.outputFolder, ngAnnotate: true, compilerOptions: babelCompilerOptions});
taskMaker.defineTask('less', {taskName: 'less', src: path.less, dest: path.outputFolder});
taskMaker.defineTask('copy', {taskName: 'copyMain', src: path.mainFile,
dest: path.outputFolder});
taskMaker.defineTask('copy', {taskName: 'copyManifest', src: path.manifestFile,
dest: path.outputFolder});

gulp.task('usemin', function(callback) {
  return gulp.src(path.indexFile)
    .pipe(usemin({
      less: [less(), 'concat'],
    }))
    .pipe(gulp.dest(path.outputFolder));
});

gulp.task('baseCompile', function(callback) {
	return runSequence('babel', 'usemin', 'less', callback);
});

gulp.task('electronCompile', function(callback) {
	return runSequence('baseCompile', 'copyMain', 'copyManifest', callback);
});

gulp.task('launch', function(callback) {
  childProcess.spawn(electron, ['./dist/'], {
      stdio: 'inherit'
  });
});

gulp.task('run', function(callback) {
  return runSequence('clean', 'electronCompile', 'launch', callback);
});

gulp.task('default', ['run']);
