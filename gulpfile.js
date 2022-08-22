const del = require('del')
const { series, src, dest, parallel } = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const merge2 = require('merge2')

const project = ts.createProject('tsconfig.json', {
  declaration: true
})

function compile () {
  const compilation = project.src()
    .pipe(sourcemaps.init())
    .pipe(project())

  const destination = dest(project.options.outDir ?? 'dist')

  return merge2([
    compilation.js
      .pipe(sourcemaps.write('.'))
      .pipe(destination),
    compilation.dts
      .pipe(destination)
  ])
}

function copy () {
  return src('src/**/*.yml')
    .pipe(dest('dist'))
}

const build = parallel(compile, copy)

function clean () {
  return del([
    'dist/**',
    '!dist/.gitignore'
  ])
}

module.exports = {
  default: series(clean, build),
  build,
  clean
}
