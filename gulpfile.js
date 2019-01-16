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
const transform = require('gulp-transform');
const del = require('del');

const THEMES = [
  'federalist-standard-theme',
];


function copyUswdsAssets(theme) {
  return function copy() {
    // Copy assets from the uswds package
    // We're only looking for assets like fonts, images, and javascript files.
    uswdsDirs = ['css', 'fonts', 'img', 'js'].map(d => `node_modules/uswds/dist/${d}/**`);

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

function copyTemplateShims(theme) {
  // Copy "shim" templates that just pass through to uswds/ templates. This
  // allows us to easily override the templates in the theme without having to
  // worry about how the build system copies files.
  //
  // We copy each layout and template making sure **not** to overwrite any
  // existing files. Instead of copying the template as is, we replace the
  // content with the shim content.
  layoutsRegexp = RegExp('^_layouts/');
  includesRegexp = RegExp('^_includes/');

  return function copy() {
    return src('common/**/*')
      .pipe(transform('utf8', (contents, file) => {
        if (layoutsRegexp.test(file.relative)) {
          // Strip the _layouts/ prefix and .html extension to get the name of the layout.
          const layout = file.relative.replace(layoutsRegexp, '').replace(/\.html$/i, '');
          return '---\n' +
                 '# Shim template acts as a "no-op" to the default uswds template.\n' +
                 `layout: uswds/${layout}\n` +
                 '---\n' +
                 '{{- content -}}\n';
        }

        if (includesRegexp.test(file.relative)) {
          // Strip the _includes/ prefix to get the name of the include.
          const include = file.relative.replace(includesRegexp, '');
          return '{%- comment -%}\n' +
                 'Shim template acts as a "no-op" to the default uswds template.\n' +
                 '{%- endcomment -%}\n' +
                 `{%- include uswds/${include} -%}\n`;
        }

        return contents;
      }))
      .pipe(dest(`${theme}`, { overwrite: false }));
  };
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

function watchCommonTemplates() {
  const task = parallel.apply(null, THEMES.map(theme => copyCommonTemplates(theme)));
  return watch(['common/**'], { ignoreInitial: false }, task);
}


// Compose the gulp tasks for each theme
const themeTasks = THEMES.reduce((tasks, theme) => Object.assign(tasks, {
  [theme]: {
    build: series(copyUswdsAssets(theme), copyUswdsSass(theme), copyCommonTemplates(theme), copyTemplateShims(theme)),
    clean: series(cleanUswdsAssets(theme), cleanCommonTemplates(theme)),
  }
}), {});

// Compose top-level tasks
const build = parallel.apply(null, Object.entries(themeTasks).map(([theme, tasks]) => tasks.build));
const clean = parallel.apply(null, Object.entries(themeTasks).map(([theme, tasks]) => tasks.clean));

const all = series(build);

const globalTasks = {
  default: build,
  all,
  build,
  clean,
  watch: watchCommonTemplates,
};

// Export intermediate theme tasks e.g. build:standard, clean:standard
const exportedTasks = Object.entries(themeTasks).reduce((exportedTasks, [theme, tasks]) => {
  // Strip theme prefix/suffix to get a short-name for the task e.g. "standard"
  const themeShortName = theme.replace(/federalist-(.*)-theme/, '$1');

  return Object.assign(exportedTasks, {
    [`build:${themeShortName}`]: tasks.build,
    [`clean:${themeShortName}`]: tasks.clean,
  });
}, globalTasks);

module.exports = exportedTasks;
