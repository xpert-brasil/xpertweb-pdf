"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const header = require("gulp-header");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));

// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
  "/*!\n",
  " * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2013-" + new Date().getFullYear() + " <%= pkg.author %>\n",
  " * Licensed under <%= pkg.license %>\n",
  " */\n",
  "\n",
].join("");

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: "./node_modules",
      })
    )
    .on("error", sass.logError)
    .pipe(
      header(banner, {
        pkg: pkg,
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"));
}

// Define complex tasks
const build = gulp.series(gulp.parallel(css));

// Export tasks
exports.css = css;
exports.build = build;
exports.default = build;
