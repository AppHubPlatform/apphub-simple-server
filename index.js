var express = require('express');
var app = express();

var GET_BUILD_TYPE = 'GET-BUILD';
var NO_BUILD_TYPE = 'NO-BUILD';

app.get('/projects/:projectUid/build', function (req, res) {
  var projectUid = req.params.projectUid;
  var appVersion = req.query.app_version

  // Change to true if there is a newer build available for this version
  // of the app.
  var buildIsAvailable = false;

  var resultData;
  if (buildIsAvailable) {
    resultData = {
      type: GET_BUILD_TYPE,
      project_uid: projectUid,

      // A consistent id for the build, such as the key or hash.
      // The AppHub client uses this id to determine whether the
      // most current build has changed.
      uid: '',

      // Name for the build.
      name: 'Build Name',

      // Description for the build.
      description: '',

      // URL of the zipped build. Does not necessarily have to be
      // an s3 url.
      s3_url: '',

      // Epoch time in milliseconds since 1970 when the build was
      // created. This is only used for metadata, not to determine
      // whether the build should be used.
      created: 0,

      // Native app versions for which the build is compatible.
      // The official AppHub client only uses the values of the object, not the keys.
      app_versions: {
        '1.0': '1.0',
      },
    };
  } else {
    resultData = {
      type: NO_BUILD_TYPE,
    };
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'success',
    data: resultData,
  }));

});

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Example app listening at port', port);
});
