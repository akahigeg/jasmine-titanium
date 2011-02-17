Ti.App.env = 'test'
Ti.include("vendor/jasmine-titanium/lib/jasmine-1.0.1.js")
Ti.include("vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js")
Ti.include("vendor/jasmine-titanium/config/runner-config.js")
Ti.include("temp_runner_options.js")

classname = runner_options?["classname"]
verbose = runner_options?["verbose"]
lib_dir = runner_config.lib_dir + "/"
spec_dir = runner_config.spec_dir + "/"

specDir = Ti.Filesystem.getFile(spec_dir)
for spec in specDir.getDirectoryListing()
    continue if classname != "" && spec != classname + "_spec.js"
    if spec.match(/_spec.js$/)
        Ti.include(lib_dir + spec.replace("_spec.js", ".js"))
        Ti.include(spec_dir + spec)

SpecHelper = {
    expectEventResult: (ui, event, expectations...)->
        if typeof(event) == 'string'
            fired = {name:event, options:{}}
        else
            for name, options of event
                fired = {name:name, options:options}

        ui.addEventListener(fired.name, expectation) for expectation in expectations
        ui.addEventListener(fired.name, (e)-> e.source[fired.name + "_finished"] = true)
        ui.fireEvent(fired.name, fired.options)
        waitsFor(-> ui[fired.name + "_finished"])

}

jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(verbose))
jasmine.getEnv().execute()

alert('spec runner finished')
