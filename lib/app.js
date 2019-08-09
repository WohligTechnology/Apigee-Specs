var program = require("commander")
var request = require("request")
var base64 = require("base-64")
var fs = require("fs")

program.parse(process.argv)
var text = program.args[0] + ":" + program.args[1]
var encodeText = base64.encode(text)
var url = program.args[2]
var apiDocName = program.args[3]
var apiDocDesc = program.args[4]
var fileData = fs.readFileSync("./specs.yaml")

var options = {
    method: "POST",
    url: url + "/jsonapi/apidoc/apidoc/spec",
    headers: {
        authorization: "Basic " + encodeText,
        "content-type": "application/octet-stream",
        "content-disposition": 'file; filename="specs.yaml"',
        accept: "application/vnd.api+json"
    },
    body: fileData
}

request(options, function(error, response, body) {
    if (error) {
        throw new Error(error)
    } else if (body) {
        var obj = JSON.parse(body)
        var fileId = obj.data.id
        if (obj) {
            var options = {
                method: "POST",
                url: url + "/jsonapi/apidoc/apidoc",
                headers: {
                    "content-type": "application/vnd.api+json",
                    authorization: "Basic " + encodeText,
                    accept: "application/vnd.api+json"
                },
                body:
                    '{\n  "data": {\n    "type": "apidoc--apidoc",\n    "attributes": {\n      "status": true,\n      "name": "' +
                    apiDocName +
                    '",\n      "description": {\n        "value": "' +
                    apiDocDesc +
                    '",\n        "format": "basic_html"\n      },\n      "spec_file_source": "file"\n     },\n     "relationships": {\n       "spec": {\n         "data": {\n           "type": "file--file",\n           "id": "' +
                    fileId +
                    '"\n         }\n       }\n     }\n   }\n}'
            }
            request(options, function(error, response, body) {
                if (error) throw new Error(error)
            })
        }
    }
})
