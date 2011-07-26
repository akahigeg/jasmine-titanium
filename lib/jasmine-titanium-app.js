var JasmineTitaniumApp;
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
        Ti.include(this.lib_dir + path + spec.replace("_spec.js", ".js"));
        Ti.include(this.spec_dir + path + spec);
      } else {
        this.loadSpecs(spec + "/");
      }
    }
    return _results;
  }
};
JasmineTitaniumApp.loadSpecs("");
jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose));
jasmine.getEnv().execute();