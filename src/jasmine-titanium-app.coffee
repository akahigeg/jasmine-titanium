Ti.App.env = 'test'
Ti.include("/vendor/jasmine-titanium/lib/jasmine-1.0.1.js")
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js")
Ti.include("/vendor/jasmine-titanium/config/runner-config.js")
Ti.include("/temp_runner_options.js")

JasmineTitaniumApp = {
    classname: runner_options?["classname"]
    verbose: runner_options?["verbose"]
    lib_dir: runner_config.lib_dir + "/"
    spec_dir: runner_config.spec_dir + "/"

    loadSpecs: (path)->
        dir = Ti.Filesystem.getFile("#{@spec_dir}#{path}")
        for spec in dir.getDirectoryListing()
            continue if @classname != "" && spec != @classname + "_spec.js"
            if spec.match(/_spec.js$/)
                Ti.include(@lib_dir + path + spec.replace("_spec.js", ".js"))
                Ti.include(@spec_dir + path + spec)
            else
                @loadSpecs(spec + "/")
}
JasmineTitaniumApp.loadSpecs("")

jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose))
jasmine.getEnv().execute()
