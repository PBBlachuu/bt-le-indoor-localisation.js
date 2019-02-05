const gulp = require('gulp');
const concat = require('gulp-concat');
const watchify = require('watchify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify')
const log = require('gulplog');
const terser = require('gulp-terser')

const customOpts = {
    entries: ['./client/src/index.js'],
    debug: true
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

function bundle() {
    return b.bundle()
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('bundle.js'))
        //.pipe(streamify(terser()))
        .pipe(gulp.dest('./client/static/js'));
}