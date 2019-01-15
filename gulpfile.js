// gulpfile.js
//
// Get ready for some meta-programming! This contains all the gulp tasks to
// generate and test our various themes.
const {
  dest,
  parallel,
  series,
  src,
} = gulp = require('gulp');
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
const buildDefault = series(copyUswdsAssets('default'), copyUswdsSass('default'), copyCommonTemplates('default'));
const cleanDefault = series(cleanUswdsAssets('default'), cleanCommonTemplates('default'));

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
