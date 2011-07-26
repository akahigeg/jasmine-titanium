var lib, spec, _i, _j, _len, _len2, _ref, _ref2;
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-app.js");
Ti.include("/vendor/jasmine-titanium/jasmine/lib/jasmine.js");
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js");
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