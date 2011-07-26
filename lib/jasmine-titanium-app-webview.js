var js, libs_specs, script_tags, template, window, wv, _i, _j, _len, _len2, _ref;
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-app.js");
script_tags = [];
_ref = [JasmineTitaniumApp.libs, JasmineTitaniumApp.specs];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  libs_specs = _ref[_i];
  for (_j = 0, _len2 = libs_specs.length; _j < _len2; _j++) {
    js = libs_specs[_j];
    script_tags.push("<script type='text/javascript' src='" + js + "'></script>");
  }
}
wv = Ti.UI.createWebView();
template = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/vendor/jasmine-titanium/lib/spec_runner.html');
wv.html = template.read().text.replace(/%%libs_and_specs_tags%%/, script_tags.join("\n"));
window = Ti.UI.createWindow();
window.add(wv);
window.open();