const {series, src, dest} = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

const buidJS = () => src('./src/js/main.js').
pipe(babel()).
pipe(rename({
  basename: 'gravity',
  extname: '.js'
})).
pipe(dest('./dist/js'));

const buidCSS = () => src('./src/scss/gravity.scss').
pipe(sass()).
pipe(autoprefixer()).
pipe(dest('./dist/css'));

const compressJS = () => src(['./dist/js/*.js', '!./dist/js/*.min.js']).
pipe(uglify()).
pipe(rename({ 
  extname: '.min.js'
 })).
pipe(dest('./dist/js'));

const compressCSS = () => src(['./dist/css/*.css', '!./dist/css/*.min.css']).
pipe(cleanCSS()).
pipe(rename({ 
  extname: '.min.css'
 })).
pipe(dest('./dist/css'));

exports.default = series(buidJS, buidCSS, compressJS, compressCSS);
exports.buidJS = buidJS;
exports.buidCSS = buidCSS;
exports.compress = series(compressJS, compressCSS);