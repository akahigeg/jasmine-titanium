var JasmineTitaniumApp, lib, spec, _i, _j, _len, _len2, _ref, _ref2;
Ti.App.env = 'test';
Ti.include("/vendor/jasmine-titanium/jasmine/lib/jasmine.js");
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js");
Ti.include("/vendor/jasmine-titanium/config/runner-config.js");
Ti.include("/temp_runner_options.js");
JasmineTitaniumApp = {
  classname: typeof runner_options !== "undefined" && runner_options !== null ? runner_options["classname"] : void 0,
  verbose: typeof runner_options !== "undefined" && runner_options !== null ? runner_options["verbose"] : void 0,
  lib_dir: runner_config.lib_dir + "/",
  spec_dir: runner_config.spec_dir + "/",
  libs: [],
  specs: [],
  loadSpecs: function(path) {
    var dir, files, spec, _i, _len, _results;
    dir = Ti.Filesystem.getFile("" + this.spec_dir + path);
    files = dir.getDirectoryListing();
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      spec = files[_i];
      if (spec.match(/_spec.js$/)) {
        if (this.classname !== "" && spec !== this.classname + "_spec.js") {
          continue;
        }
        this.libs.push(this.lib_dir + path + spec.replace("_spec.js", ".js"));
        this.specs.push(this.spec_dir + path + spec);
      } else {
        this.loadSpecs(spec + "/");
      }
    }
    return _results;
  }
};
JasmineTitaniumApp.loadSpecs("");
_ref = JasmineTitaniumApp.libs;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  lib = _ref[_i];
  Ti.include(lib);
}
_ref2 = JasmineTitaniumApp.specs;
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  spec = _ref2[_j];
  Ti.include(spec);
}
jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose));
jasmine.getEnv().execute();