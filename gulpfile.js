var gulp = require('gulp');
var browser = require('browser-sync').create();
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');


const paths = {
	main: ['stylus/main.styl'],
	app: ['stylus/application.styl'],
	html: ['**/*.html'],
	stylus: ['stylus/**/*.styl'],
	js: ['js/**/*.js'],
	css: ['css/'],
};

gulp.task('main', function() {
	gulp.src( paths.main )
		.pipe(plumber())
		.pipe(stylus())
		.pipe(autoprefixer({cascade: false }))
		// .pipe(gulp.dest(paths.css[0]))
		.pipe(cleanCss({keepBreaks: true}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(paths.css[0]))
		.pipe(browser.stream());
});

gulp.task('stylus', ['main'], function() {
	gulp.src( paths.app )
		.pipe(plumber())
		.pipe(stylus())
		.pipe(autoprefixer({cascade: false }))
		// .pipe(gulp.dest(paths.css[0]))
		.pipe(cleanCss({keepBreaks: true}))
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest(paths.css[0]))
		.pipe(browser.stream());
});

gulp.task('serve', ['stylus'], function(){

	browser.init({server: '.', open: false, port: 4000, notify: false});

	gulp.watch( paths.stylus, ['stylus'] );
	gulp.watch([paths.html, paths.js]).on('change', browser.reload);
});

gulp.task('default', ['serve']);