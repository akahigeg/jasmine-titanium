var JasmineTitaniumApp;
Ti.App.env = 'test';
Ti.include("/vendor/jasmine-titanium/lib/jasmine-1.0.1.js");
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js");
Ti.include("/vendor/jasmine-titanium/config/runner-config.js");
Ti.include("/temp_runner_options.js");
JasmineTitaniumApp = {
  classname: typeof runner_options !== "undefined" && runner_options !== null ? runner_options["classname"] : void 0,
  verbose: typeof runner_options !== "undefined" && runner_options !== null ? runner_options["verbose"] : void 0,
  lib_dir: runner_config.lib_dir + "/",
  spec_dir: runner_config.spec_dir + "/",
  loadSpecs: function(path) {
    var dir, spec, _i, _len, _ref, _results;
    dir = Ti.Filesystem.getFile("" + this.spec_dir + path);
    _ref = dir.getDirectoryListing();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      spec = _ref[_i];
      if (this.classname !== "" && spec !== this.classname + "_spec.js") {
        continue;
      }
      _results.push(spec.match(/_spec.js$/) ? (Ti.include(this.lib_dir + path + spec.replace("_spec.js", ".js")), Ti.include(this.spec_dir + path + spec)) : this.loadSpecs(spec + "/"));
    }
    return _results;
  }
};
JasmineTitaniumApp.loadSpecs("");
jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose));
jasmine.getEnv().execute();