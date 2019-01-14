// gulpfile.js
//
// Get ready for some meta-programming! This contains all the gulp tasks to
// generate and test our various themes.
const {
  dest,
  parallel,
  series,
  src,
} = require('gulp');
const filter = require('gulp-filter');
const del = require('del');

const themes = [
  'default',
];

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
  return function copy() {
    return src('common/_layouts/**')
      .pipe(dest(`${theme}/_layouts`));
  }
}

// Compose the gulp tasks for each theme
const buildDefault = series(copyUswdsAssets('default'), copyCommonTemplates('default'));
const cleanDefault = series(cleanUswdsAssets('default'));

const build = parallel(buildDefault);
const clean = parallel(cleanDefault);

const all = series(build);

module.exports = {
  default: all,
  all,
  build,
  'build:default': buildDefault,
  clean,
  'clean:default': cleanDefault,
};
