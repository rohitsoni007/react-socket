var del = require("del");

module.exports = function (gulp) {
  var paths = {
    scripts: {
      _clean: {
        src: ["bin/*.ts","bin/*.d.ts", "bin/*.tsx","bin/*.jsx", "bin/*.js", "bin/*.map"],
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
