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
    .version("0.0.3")
    .option("-g, --generate [path]", "Generate Frontend Framework")
    .parse(process.argv)

if (program.generate) {
    console.log("Creating project at path : ", program.generate)
    var path = program.generate
    var gitignore = fs.readFileSync(__dirname + "/lib/.gitignore")
    var gitci = fs.readFileSync(__dirname + "/lib/.gitlab-ci.yml")
    var yamlFile = fs.readFileSync(__dirname + "/lib/specs.yaml")

    async.waterfall(
        [
            function(callback) {
                fs.exists(path + "/apigeefromspecs", function(isExist) {
                    if (isExist) {
                        console.log("apigeefromspecs folder already exist")
                        callback()
                    } else {
                        fs.mkdirSync(path + "/apigeefromspecs")
                        console.log("apigeefromspecs folder created")
                        callback()
                    }
                })
            },
            function(callback) {
                async.parallel(
                    {
                        specfile: function(callback) {
                            fs.writeFileSync(
                                path + "/apigeefromspecs/specs.yaml",
                                yamlFile
                            )
                            console.log("specs.yaml file created")
                        },
                        gitifil: function(callback) {
                            fs.writeFileSync(
                                path + "/apigeefromspecs/.gitignore",
                                gitignore
                            )
                            console.log("gitignore file created")
                        },
                        gitlab: function(callback) {
                            fs.writeFileSync(
                                path + "/apigeefromspecs/.gitlab-ci.yml",
                                gitci
                            )
                            console.log("gitlab-ci.yml file created")
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
