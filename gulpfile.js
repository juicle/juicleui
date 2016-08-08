var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-minify-css'),//css压缩
	imagemin = require('gulp-imagemin'), //图片压缩
	pngcrush = require('imagemin-pngcrush'),
	jshint = require('gulp-jshint'), //js检测
	uglify = require('gulp-uglify'), //js压缩
	concat = require('gulp-concat'), //文件合并
	rename = require('gulp-rename'), //文件更名
	htmlmin = require('gulp-htmlmin'), //html压缩
	notify = require('gulp-notify'); //提示信息

// 合并、压缩、重命名css
gulp.task('less', function() {
	gulp.src('src/assets/css/ju.less')
		//.pipe(sourcemaps.init())
		.pipe(less())
		//.pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
	    //.pipe(concat('main.css'))
	    //.pipe(rename({ suffix: '.min' }))
	    .pipe(notify({
		    message: 'css task ok'
	    }));
});

// 压缩html
gulp.task('html', function() {
	return gulp.src('./dist/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(notify({
			message: 'html task ok'
		}));
});

// 压缩图片
gulp.task('img', function() {
	return gulp.src('src/assets/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngcrush()]
		}))
		.pipe(gulp.dest('./dist/images/'))
		.pipe(notify({
			message: 'img task ok'
		}));
});

// 检查js
gulp.task('lint', function() {
	return gulp.src('src/assets/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(notify({
			message: 'lint task ok'
		}));
});

// 合并、压缩js文件
gulp.task('js', function() {
	return gulp.src('src/assets/js/*.js')
		.pipe(concat('ju.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({
			message: 'js task ok'
		}));
});

// 默认任务
gulp.task('default', function() {
	gulp.run('img', 'less', 'lint', 'js', 'html');

	// 监听html文件变化
	gulp.watch('dist/*.html', function() {
		gulp.run('html');
	});

	// Watch .css files
	gulp.watch('src/assets/css/*.css', ['css']);

	// Watch .js files
	gulp.watch('src/assets/js/*.js', ['lint', 'js']);

	// Watch image files
	gulp.watch('src/assets/images/*', ['img']);
});