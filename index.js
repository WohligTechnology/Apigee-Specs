#!/usr/bin/env node

//all dependencies
var _ = require("lodash")
var program = require("commander")
var chalk = require("chalk")
var async = require("async")
var fs = require("fs")
var downloadGit = require("download-github-repo")

//colored console
global.blue = function(data) {
    console.log(chalk.blue(data))
}
global.red = function(data) {
    console.log(chalk.red(data))
}
global.green = function(data) {
    console.log(chalk.green(data))
}
global.log = function(data) {
    console.log(data)
}

program
    .version("0.0.17")
    .option("-n, --new [foldername]", "Generate New  Framework")
    .option("-g, --generate [foldername]", "Generate Frontend Framework")
    .parse(process.argv)

if (program.generate) {
    console.log("generate apigee.....")
}
