Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-app.js")

script_tags = []
for libs_specs in [JasmineTitaniumApp.libs, JasmineTitaniumApp.specs]
    for js in libs_specs
        script_tags.push("<script type='text/javascript' src='#{js}'></script>")

wv = Ti.UI.createWebView()
template = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/vendor/jasmine-titanium/lib/spec_runner.html')
wv.html = template.read().text.replace(/%%libs_and_specs_tags%%/, script_tags.join("\n"))

window = Ti.UI.createWindow()
window.add(wv)
window.open()
