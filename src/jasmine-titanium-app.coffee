Ti.App.env = 'test'

Ti.include("/vendor/jasmine-titanium/jasmine/lib/jasmine.js")
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js")
Ti.include("/vendor/jasmine-titanium/config/runner-config.js")
Ti.include("/temp_runner_options.js")

JasmineTitaniumApp = {
    classname: runner_options?["classname"]
    verbose: runner_options?["verbose"]
    lib_dir: runner_config.lib_dir + "/"
    spec_dir: runner_config.spec_dir + "/"

    libs: []
    specs: []

    loadSpecs: (path)->
        dir = Ti.Filesystem.getFile("#{@spec_dir}#{path}")
        files = dir.getDirectoryListing()

        for spec in files
            if spec.match(/_spec.js$/)
                continue if @classname != "" && spec != @classname + "_spec.js"
                @libs.push(@lib_dir + path + spec.replace("_spec.js", ".js"))
                @specs.push(@spec_dir + path + spec)
            else
                @loadSpecs(spec + "/")
}
JasmineTitaniumApp.loadSpecs("")

Ti.include(lib) for lib in JasmineTitaniumApp.libs
Ti.include(spec) for spec in JasmineTitaniumApp.specs

jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose))
jasmine.getEnv().execute()
