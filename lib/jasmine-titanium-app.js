var SpecHelper, classname, lib_dir, spec, specDir, spec_dir, verbose, _i, _len, _ref;
var __slice = Array.prototype.slice;
Ti.App.env = 'test';
Ti.include("vendor/jasmine-titanium/lib/jasmine-1.0.1.js");
Ti.include("vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js");
Ti.include("vendor/jasmine-titanium/config/runner-config.js");
Ti.include("temp_runner_options.js");
classname = typeof runner_options != "undefined" && runner_options !== null ? runner_options["classname"] : void 0;
verbose = typeof runner_options != "undefined" && runner_options !== null ? runner_options["verbose"] : void 0;
lib_dir = runner_config.lib_dir + "/";
spec_dir = runner_config.spec_dir + "/";
specDir = Ti.Filesystem.getFile(spec_dir);
_ref = specDir.getDirectoryListing();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  spec = _ref[_i];
  if (classname !== "" && spec !== classname + "_spec.js") {
    continue;
  }
  if (spec.match(/_spec.js$/)) {
    Ti.include(lib_dir + spec.replace("_spec.js", ".js"));
    Ti.include(spec_dir + spec);
  }
}
SpecHelper = {
  expectEventResult: function() {
    var event, expectation, expectations, fired, name, options, ui, _i, _len;
    ui = arguments[0], event = arguments[1], expectations = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof event === 'string') {
      fired = {
        name: event,
        options: {}
      };
    } else {
      for (name in event) {
        options = event[name];
        fired = {
          name: name,
          options: options
        };
      }
    }
    for (_i = 0, _len = expectations.length; _i < _len; _i++) {
      expectation = expectations[_i];
      ui.addEventListener(fired.name, expectation);
    }
    ui.addEventListener(fired.name, function(e) {
      return e.source[fired.name + "_finished"] = true;
    });
    ui.fireEvent(fired.name, fired.options);
    return waitsFor(function() {
      return ui[fired.name + "_finished"];
    });
  }
};
jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(verbose));
jasmine.getEnv().execute();
alert('spec runner finished');