var program = require("commander");
var request = require("request");
var base64 = require("base-64");
var fs = require("fs");

program.parse(process.argv);
var text = program.args[0] + ":" + program.args[1];
var encodeText = base64.encode(text);
var url = program.args[2];
var fileData = fs.readFileSync("./specs.yaml");

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
  // "77u/c3dhZ2dlcjogIjIuMCIKaW5mbzoKICB2ZXJzaW9uOiAxLjAuMAogIHRpdGxlOiBTd2FnZ2VyIFBldHN0b3JlCiAgbGljZW5zZToKICAgIG5hbWU6IE1JVApob3N0OiBwZXRzdG9yZS5zd2FnZ2VyLmlvCmJhc2VQYXRoOiAvdjEKc2NoZW1lczoKICAtIGh0dHAKY29uc3VtZXM6CiAgLSBhcHBsaWNhdGlvbi9qc29uCnByb2R1Y2VzOgogIC0gYXBwbGljYXRpb24vanNvbgpwYXRoczoKICAvcGV0czoKICAgIGdldDoKICAgICAgc3VtbWFyeTogTGlzdCBhbGwgcGV0cwogICAgICBvcGVyYXRpb25JZDogbGlzdFBldHMKICAgICAgdGFnczoKICAgICAgICAtIHBldHMKICAgICAgcGFyYW1ldGVyczoKICAgICAgICAtIG5hbWU6IGxpbWl0CiAgICAgICAgICBpbjogcXVlcnkKICAgICAgICAgIGRlc2NyaXB0aW9uOiBIb3cgbWFueSBpdGVtcyB0byByZXR1cm4gYXQgb25lIHRpbWUgKG1heCAxMDApCiAgICAgICAgICByZXF1aXJlZDogZmFsc2UKICAgICAgICAgIHR5cGU6IGludGVnZXIKICAgICAgICAgIGZvcm1hdDogaW50MzIKICAgICAgcmVzcG9uc2VzOgogICAgICAgICIyMDAiOgogICAgICAgICAgZGVzY3JpcHRpb246IEEgcGFnZWQgYXJyYXkgb2YgcGV0cwogICAgICAgICAgaGVhZGVyczoKICAgICAgICAgICAgeC1uZXh0OgogICAgICAgICAgICAgIHR5cGU6IHN0cmluZwogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBBIGxpbmsgdG8gdGhlIG5leHQgcGFnZSBvZiByZXNwb25zZXMKICAgICAgICAgIHNjaGVtYToKICAgICAgICAgICAgJHJlZjogIiMvZGVmaW5pdGlvbnMvUGV0cyIKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgZGVzY3JpcHRpb246IHVuZXhwZWN0ZWQgZXJyb3IKICAgICAgICAgIHNjaGVtYToKICAgICAgICAgICAgJHJlZjogIiMvZGVmaW5pdGlvbnMvRXJyb3IiCiAgICBwb3N0OgogICAgICBzdW1tYXJ5OiBDcmVhdGUgYSBwZXQKICAgICAgb3BlcmF0aW9uSWQ6IGNyZWF0ZVBldHMKICAgICAgdGFnczoKICAgICAgICAtIHBldHMKICAgICAgcmVzcG9uc2VzOgogICAgICAgICIyMDEiOgogICAgICAgICAgZGVzY3JpcHRpb246IE51bGwgcmVzcG9uc2UKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgZGVzY3JpcHRpb246IHVuZXhwZWN0ZWQgZXJyb3IKICAgICAgICAgIHNjaGVtYToKICAgICAgICAgICAgJHJlZjogIiMvZGVmaW5pdGlvbnMvRXJyb3IiCiAgL3BldHMve3BldElkfToKICAgIGdldDoKICAgICAgc3VtbWFyeTogSW5mbyBmb3IgYSBzcGVjaWZpYyBwZXQKICAgICAgb3BlcmF0aW9uSWQ6IHNob3dQZXRCeUlkCiAgICAgIHRhZ3M6CiAgICAgICAgLSBwZXRzCiAgICAgIHBhcmFtZXRlcnM6CiAgICAgICAgLSBuYW1lOiBwZXRJZAogICAgICAgICAgaW46IHBhdGgKICAgICAgICAgIHJlcXVpcmVkOiB0cnVlCiAgICAgICAgICBkZXNjcmlwdGlvbjogVGhlIGlkIG9mIHRoZSBwZXQgdG8gcmV0cmlldmUKICAgICAgICAgIHR5cGU6IHN0cmluZwogICAgICByZXNwb25zZXM6CiAgICAgICAgIjIwMCI6CiAgICAgICAgICBkZXNjcmlwdGlvbjogRXhwZWN0ZWQgcmVzcG9uc2UgdG8gYSB2YWxpZCByZXF1ZXN0CiAgICAgICAgICBzY2hlbWE6CiAgICAgICAgICAgICRyZWY6ICIjL2RlZmluaXRpb25zL1BldHMiCiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgIGRlc2NyaXB0aW9uOiB1bmV4cGVjdGVkIGVycm9yCiAgICAgICAgICBzY2hlbWE6CiAgICAgICAgICAgICRyZWY6ICIjL2RlZmluaXRpb25zL0Vycm9yIgpkZWZpbml0aW9uczoKICBQZXQ6CiAgICB0eXBlOiAib2JqZWN0IgogICAgcmVxdWlyZWQ6CiAgICAgIC0gaWQKICAgICAgLSBuYW1lCiAgICBwcm9wZXJ0aWVzOgogICAgICBpZDoKICAgICAgICB0eXBlOiBpbnRlZ2VyCiAgICAgICAgZm9ybWF0OiBpbnQ2NAogICAgICBuYW1lOgogICAgICAgIHR5cGU6IHN0cmluZwogICAgICB0YWc6CiAgICAgICAgdHlwZTogc3RyaW5nCiAgUGV0czoKICAgIHR5cGU6IGFycmF5CiAgICBpdGVtczoKICAgICAgJHJlZjogIiMvZGVmaW5pdGlvbnMvUGV0IgogIEVycm9yOgogICAgdHlwZTogIm9iamVjdCIKICAgIHJlcXVpcmVkOgogICAgICAtIGNvZGUKICAgICAgLSBtZXNzYWdlCiAgICBwcm9wZXJ0aWVzOgogICAgICBjb2RlOgogICAgICAgIHR5cGU6IGludGVnZXIKICAgICAgICBmb3JtYXQ6IGludDMyCiAgICAgIG1lc3NhZ2U6CiAgICAgICAgdHlwZTogc3RyaW5nCg=="
};

request(options, function(error, response, body) {
  if (error) {
    throw new Error(error);
  } else if (body) {
    console.log(body);
    var obj = JSON.parse(body);
    var fileId = obj.data.id;
    console.log(obj.data.id);
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
          '{\n  "data": {\n    "type": "apidoc--apidoc",\n    "attributes": {\n      "status": true,\n      "name": "File Test",\n      "description": {\n        "value": "<p>Lorem ipsum...</p>",\n        "format": "basic_html"\n      },\n      "spec_file_source": "file"\n     },\n     "relationships": {\n       "spec": {\n         "data": {\n           "type": "file--file",\n           "id": "' +
          fileId +
          '"\n         }\n       }\n     }\n   }\n}'
      };
      request(options, function(error, response, body) {
          console.log(error)
        if (error) throw new Error(error);
      });
    }
  }
});
