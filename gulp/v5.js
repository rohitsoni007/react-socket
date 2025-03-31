var del = require("del");

module.exports = function (gulp) {
  var paths = {
    scripts: {
      _clean: {
        src: ["bin/*.d.ts", "bin/*.jsx", "bin/*.js"],
      },
    },
  };

  function _clean() {
    return del(paths.scripts._clean.src);
  }

  var build = gulp.series(_clean);

  gulp.task("build", build);

  gulp.task("default", build);
};
