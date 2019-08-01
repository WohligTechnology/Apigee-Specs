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
global.yellow = function(data) {
    console.log(chalk.yellow(data))
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
    .version("0.0.3")
    .option("-g, --generate [foldername]", "Generate Frontend Framework")
    .parse(process.argv)

if (program.generate) {
    console.log("Creating project at path : ", program.generate)
    var path = program.generate
    var gitignore = fs.readFileSync(__dirname + "/lib/.gitignore")
    var gitci = fs.readFileSync(__dirname + "/lib/.gitlab-ci.yml")
    var yamlFile = fs.readFileSync(__dirname + "/lib/specs.yaml")
    var chkexist = false
    async.waterfall(
        [
            function(callback) {
                fs.exists(path, function(isExist) {
                    if (isExist) {
                        chkexist = true
                        console.log(chalk.red(path + " folder already exist"))
                        callback()
                    } else {
                        fs.mkdirSync(path)
                        console.log(chalk.green(path + " folder created"))
                        callback()
                    }
                })
            },
            function(callback) {
                async.parallel(
                    {
                        specfile: function(callback) {
                            fs.writeFileSync(path + "/specs.yaml", yamlFile)
                            if (chkexist) {
                                console.log(
                                    chalk.yellow("specs.yaml file replaced")
                                )
                            } else {
                                console.log(
                                    chalk.green("specs.yaml file created")
                                )
                            }
                        },
                        gitifil: function(callback) {
                            fs.writeFileSync(path + "/.gitignore", gitignore)
                            if (chkexist) {
                                console.log(
                                    chalk.yellow("gitignore file replaced")
                                )
                            } else {
                                console.log(
                                    chalk.green(".gitignore file created")
                                )
                            }
                        },
                        gitlab: function(callback) {
                            fs.writeFileSync(path + "/.gitlab-ci.yml", gitci)
                            if (chkexist) {
                                console.log(
                                    chalk.yellow(".gitlab-ci.yml file replaced")
                                )
                            } else {
                                console.log(
                                    chalk.green("gitlab-ci.yml file created")
                                )
                            }
                        }
                    },
                    callback
                )
            }
        ],
        function(err, data) {
            if (err) {
                callback(err)
            } else {
                callback()
            }
        }
    )
}
