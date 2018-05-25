var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });
var role = "./resources/views/manage/role/";
var roleIndex = role + "index.blade.php";
var roleJs = ["./public/angularjs/role/**/*.js"];
gulp.task("inject", function() {
  console.log("wire up the js ");
  return gulp
    .src(roleIndex)
    .pipe(
      $.inject(gulp.src(roleJs), {
        addRootSlash: false,
        //ignorePath : 'src/main/webapp',
        transform: function(filePath, file, i, length) {
          var newPath = filePath.replace("public", "");
          return '<script src="' + newPath + '"></script>';
          // return '<script rel="stylesheet" href="${pageContext.request.contextPath}/' + newPath + '"/>';
        }
      })
    )
    .pipe(gulp.dest(role));
});