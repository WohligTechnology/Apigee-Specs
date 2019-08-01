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
    .option("-g, --generate [path]", "Generate Frontend Framework")
    .parse(process.argv)

if (program.generate) {
    console.log(program.generate)
    var gitignore = fs.readFileSync(__dirname + "/lib/.gitignore")
    var gitci = fs.readFileSync(__dirname + "/lib/.gitlab-ci.yml")
    var yamlFile = fs.readFileSync(__dirname + "/lib/.specs.yaml")
    var fileName = apiName + "/" + apiName + "Api.js"
    // fs.exists("./test", function(isExist) {
    //     if (isExist) {
    //         fs.exists("./test/" + apiName, function(isExist) {
    //             if (isExist) {
    //                 console.log(
    //                     "Test cases for " + apiName + " api already exists"
    //                 )
    //             } else {
    //                 fs.mkdirSync("./test/" + apiName)
    //                 api = _.replace(api, new RegExp("New", "g"), apiName)
    //                 var write = fs.writeFileSync("test/" + fileName, api)
    //                 var appenddata =
    //                     '\nrequire("./' +
    //                     apiName +
    //                     "/" +
    //                     apiName +
    //                     "Api.js" +
    //                     '")'
    //                 fs.appendFileSync("test/test.js", appenddata)
    //                 console.log("Test cases for " + apiName + " generated")
    //             }
    //         })
    //     } else {
    //         fs.mkdirSync("./test")
    //         fs.mkdirSync("./test/" + apiName)
    //         api = _.replace(api, new RegExp("New", "g"), apiName)
    //         var write = fs.writeFileSync("test/" + fileName, api)
    //         var write = fs.writeFileSync("test/test.js", test)
    //         var appenddata =
    //             'require("./' + apiName + "/" + apiName + "Api.js" + '")'
    //         fs.appendFileSync("test/test.js", appenddata)
    //         console.log("Test cases for " + apiName + " generated")
    //     }
    // })
}
