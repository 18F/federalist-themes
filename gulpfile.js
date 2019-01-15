// gulpfile.js
//
// Get ready for some meta-programming! This contains all the gulp tasks to
// generate and test our various themes.
const {
  dest,
  parallel,
  series,
  src,
  watch,
} = gulp = require('gulp');
const filter = require('gulp-filter');
const del = require('del');


function copyUswdsAssets(theme) {
  return function copy() {
    // Copy assets from the uswds package
    // We're only looking for assets like fonts, images, and javascript files.
    uswdsDirs = ['fonts', 'img', 'js'].map(d => `node_modules/uswds/dist/${d}/**`);

    return src(uswdsDirs, { base: 'node_modules/uswds/dist' })
      .pipe(dest(`${theme}/assets/uswds`));
  };
}

function cleanUswdsAssets(theme) {
  return function clean() {
    return del(`${theme}/assets/uswds`);
  };
}

function copyCommonTemplates(theme) {
  const tasks = [
    () => src('common/_layouts/**').pipe(dest(`${theme}/_layouts/uswds`)),
    () => src('common/_includes/**').pipe(dest(`${theme}/_includes/uswds`)),
  ];

  return parallel.apply(gulp, tasks);
}

function cleanCommonTemplates(theme) {
  return function clean() {
    return del([
      `${theme}/_layouts/uswds`,
      `${theme}/_includes/uswds`,
    ]);
  };
}

function copyUswdsSass(theme) {
  return function copy() {
    return src('node_modules/uswds/dist/scss/**')
      .pipe(dest(`${theme}/_sass/_uswds`));
  };
}

function cleanUswdsSass(theme) {
  return function clean() {
    return del(`${theme}/_sass/_uswds`);
  };
}

// Compose the gulp tasks for each theme
const buildStandard = series(copyUswdsAssets('federalist-standard-theme'), copyUswdsSass('federalist-standard-theme'), copyCommonTemplates('federalist-standard-theme'));
const cleanStandard = series(cleanUswdsAssets('federalist-standard-theme'), cleanCommonTemplates('federalist-standard-theme'));

const build = parallel(buildStandard);
const clean = parallel(cleanStandard);

function watchCommonTemplates() {
  return watch(['common/**'], copyCommonTemplates('federalist-standard-theme'));
}

const all = series(build);

module.exports = {
  default: all,
  all,
  build,
  'build:standard': buildStandard,
  clean,
  'clean:standard': cleanStandard,
  watch: watchCommonTemplates,
};
